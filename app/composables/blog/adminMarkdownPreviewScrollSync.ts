export interface AdminMarkdownEditorExpose {
  getScrollElement: () => HTMLElement | null
}

export interface AdminMdcPreviewExpose {
  getScrollElement: () => HTMLElement | null
  getArticleElement: () => HTMLElement | null
  getHeadingElement: (id: string) => HTMLElement | null
}

interface ParsedHeading {
  id: string
  text: string
  depth: number
  line: number
}

interface MeasuredSection {
  id: string
  text: string
  depth: number
  line: number
  editorTop: number
  previewTop: number
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

const slugifyHeading = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/<\/?[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/&[a-z0-9#]+;/gi, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const stripHeadingDecorators = (value: string): string => {
  return value
    .replace(/\s*\{#([A-Za-z0-9\-_:.]+)\}\s*$/, '')
    .replace(/\s*\{id=["']([^"']+)["']\}\s*$/, '')
    .replace(/\s+id=["']([^"']+)["']\s*$/, '')
    .trim()
}

const extractExplicitHeadingId = (value: string): string | null => {
  const hashIdMatch = value.match(/\{#([A-Za-z0-9\-_:.]+)\}\s*$/)
  if (hashIdMatch?.[1]) return hashIdMatch[1]

  const attrIdMatch = value.match(/\{id=["']([^"']+)["']\}\s*$/)
  if (attrIdMatch?.[1]) return attrIdMatch[1]

  const rawIdAttrMatch = value.match(/\sid=["']([^"']+)["']\s*$/)
  if (rawIdAttrMatch?.[1]) return rawIdAttrMatch[1]

  return null
}

const parseMarkdownHeadings = (markdown: string): ParsedHeading[] => {
  const lines = markdown.split(/\r?\n/)
  const headings: ParsedHeading[] = []
  const usedIds = new Map<string, number>()

  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*$/)
    if (!match) return

    const depth = match[1]?.length
    const rawText = match[2]?.trim()
    const explicitId = extractExplicitHeadingId(rawText ?? '')
    const cleanedText = stripHeadingDecorators(rawText ?? '')

    if (!cleanedText) return

    let id = explicitId || slugifyHeading(cleanedText)
    if (!id) return

    const seen = usedIds.get(id) ?? 0
    usedIds.set(id, seen + 1)

    if (seen > 0) {
      id = `${id}-${seen + 1}`
    }

    headings.push({
      id,
      text: cleanedText,
      depth: depth ?? 1,
      line: index + 1
    })
  })

  return headings
}

const getScrollableDistance = (el: HTMLElement): number => {
  return Math.max(el.scrollHeight - el.clientHeight, 0)
}

const getRelativeOffsetTop = (child: HTMLElement, ancestor: HTMLElement): number => {
  const childRect = child.getBoundingClientRect()
  const ancestorRect = ancestor.getBoundingClientRect()
  return childRect.top - ancestorRect.top + ancestor.scrollTop
}

const getScrollRatioTarget = (source: HTMLElement, target: HTMLElement): number => {
  const sourceScrollable = getScrollableDistance(source)
  const targetScrollable = getScrollableDistance(target)

  if (sourceScrollable <= 0 || targetScrollable <= 0) return 0

  const progress = clamp(source.scrollTop / sourceScrollable, 0, 1)
  return progress * targetScrollable
}

const mapScrollTopBySections = (
  sourceScrollTop: number,
  sourceScrollable: number,
  targetScrollable: number,
  sections: MeasuredSection[],
  from: 'editorTop' | 'previewTop',
  to: 'editorTop' | 'previewTop'
): number => {
  if (!sections.length) return 0

  if (sections.length === 1) {
    const first = sections[0]
    if(!first) return 0

    const sourceRemaining = Math.max(sourceScrollable - first[from], 1)
    const targetRemaining = Math.max(targetScrollable - first[to], 0)
    const progress = clamp((sourceScrollTop - first[from]) / sourceRemaining, 0, 1)
    return clamp(first[to] + targetRemaining * progress, 0, targetScrollable)
  }

  const first = sections[0]
  if(!first) return 0

  if (sourceScrollTop <= first[from]) {
    const sourceRange = Math.max(first[from], 1)
    const targetRange = Math.max(first[to], 0)
    const progress = clamp(sourceScrollTop / sourceRange, 0, 1)
    return clamp(targetRange * progress, 0, targetScrollable)
  }

  for (let index = 0; index < sections.length - 1; index += 1) {
    const current = sections[index]
    const next = sections[index + 1]

    if(!next || !current) continue

    if (sourceScrollTop >= current[from] && sourceScrollTop < next[from]) {
      const sourceRange = Math.max(next[from] - current[from], 1)
      const targetRange = next[to] - current[to]
      const progress = clamp((sourceScrollTop - current[from]) / sourceRange, 0, 1)

      return clamp(current[to] + targetRange * progress, 0, targetScrollable)
    }
  }

  const last = sections[sections.length - 1]
  if(!last) return 0

  const sourceRemaining = Math.max(sourceScrollable - last[from], 1)
  const targetRemaining = Math.max(targetScrollable - last[to], 0)
  const progress = clamp((sourceScrollTop - last[from]) / sourceRemaining, 0, 1)

  return clamp(last[to] + targetRemaining * progress, 0, targetScrollable)
}

const blendTargets = (
  mappedTarget: number,
  ratioTarget: number,
  targetScrollable: number,
  mappedWeight: number,
  ratioWeight: number
): number => {
  const totalWeight = mappedWeight + ratioWeight
  if (totalWeight <= 0) return clamp(mappedTarget, 0, targetScrollable)

  const blended = ((mappedTarget * mappedWeight) + (ratioTarget * ratioWeight)) / totalWeight
  return clamp(blended, 0, targetScrollable)
}

export const useAdminMarkdownPreviewScrollSync = (
  content: Ref<string | undefined>,
  editorRef: Ref<AdminMarkdownEditorExpose | null>,
  previewRef: Ref<AdminMdcPreviewExpose | null>,
  enabled: Ref<boolean>
) => {
  const sections = ref<MeasuredSection[]>([])
  const isBound = ref(false)

  let editorCleanup: (() => void) | null = null
  let previewCleanup: (() => void) | null = null
  let resizeObserver: ResizeObserver | null = null
  let syncingFrom: 'editor' | 'preview' | null = null
  let releaseTimer: number | null = null

  const EDITOR_TO_PREVIEW_MAPPED_WEIGHT = 0.55
  const EDITOR_TO_PREVIEW_RATIO_WEIGHT = 0.45
  const PREVIEW_TO_EDITOR_MAPPED_WEIGHT = 0.7
  const PREVIEW_TO_EDITOR_RATIO_WEIGHT = 0.3

  const EDITOR_TO_PREVIEW_ADVANCE = 1.02
  const PREVIEW_TO_EDITOR_SLOWDOWN = 0.985

  const clearListeners = (): void => {
    editorCleanup?.()
    previewCleanup?.()
    editorCleanup = null
    previewCleanup = null
    isBound.value = false
  }

  const clearObserver = (): void => {
    resizeObserver?.disconnect()
    resizeObserver = null
  }

  const clearReleaseTimer = (): void => {
    if (releaseTimer !== null) {
      window.clearTimeout(releaseTimer)
      releaseTimer = null
    }
  }

  const releaseSyncLockSoon = (): void => {
    clearReleaseTimer()
    releaseTimer = window.setTimeout(() => {
      syncingFrom = null
    }, 20)
  }

  const measureSections = async (): Promise<void> => {
    await nextTick()
    await new Promise(resolve => requestAnimationFrame(() => resolve(true)))

    const editorScrollEl = editorRef.value?.getScrollElement() ?? null
    const previewScrollEl = previewRef.value?.getScrollElement() ?? null

    if (!editorScrollEl || !previewScrollEl) {
      sections.value = []
      return
    }

    const headings = parseMarkdownHeadings(content.value ?? '')
    const editorScrollable = getScrollableDistance(editorScrollEl)
    const totalLines = Math.max((content.value ?? '').split(/\r?\n/).length, 1)

    const measured: MeasuredSection[] = []

    for (const heading of headings) {
      const previewHeadingEl = previewRef.value?.getHeadingElement(heading.id) ?? null
      if (!previewHeadingEl) continue

      const editorLineProgress = clamp((heading.line - 1) / Math.max(totalLines - 1, 1), 0, 1)
      const editorTop = editorLineProgress * editorScrollable
      const previewTop = getRelativeOffsetTop(previewHeadingEl, previewScrollEl)

      measured.push({
        ...heading,
        editorTop,
        previewTop
      })
    }

    sections.value = measured
  }

  const syncEditorToPreview = (): void => {
    const editorScrollEl = editorRef.value?.getScrollElement() ?? null
    const previewScrollEl = previewRef.value?.getScrollElement() ?? null

    if (!editorScrollEl || !previewScrollEl) return

    const targetScrollable = getScrollableDistance(previewScrollEl)
    const ratioTarget = getScrollRatioTarget(editorScrollEl, previewScrollEl)

    if (!sections.value.length) {
      previewScrollEl.scrollTop = clamp(
        ratioTarget * EDITOR_TO_PREVIEW_ADVANCE,
        0,
        targetScrollable
      )
      return
    }

    const mappedTarget = mapScrollTopBySections(
      editorScrollEl.scrollTop,
      getScrollableDistance(editorScrollEl),
      targetScrollable,
      sections.value,
      'editorTop',
      'previewTop'
    )

    const blendedTarget = blendTargets(
      mappedTarget,
      ratioTarget,
      targetScrollable,
      EDITOR_TO_PREVIEW_MAPPED_WEIGHT,
      EDITOR_TO_PREVIEW_RATIO_WEIGHT
    )

    previewScrollEl.scrollTop = clamp(
      blendedTarget * EDITOR_TO_PREVIEW_ADVANCE,
      0,
      targetScrollable
    )
  }

  const syncPreviewToEditor = (): void => {
    const editorScrollEl = editorRef.value?.getScrollElement() ?? null
    const previewScrollEl = previewRef.value?.getScrollElement() ?? null

    if (!editorScrollEl || !previewScrollEl) return

    const targetScrollable = getScrollableDistance(editorScrollEl)
    const ratioTarget = getScrollRatioTarget(previewScrollEl, editorScrollEl)

    if (!sections.value.length) {
      editorScrollEl.scrollTop = clamp(
        ratioTarget * PREVIEW_TO_EDITOR_SLOWDOWN,
        0,
        targetScrollable
      )
      return
    }

    const mappedTarget = mapScrollTopBySections(
      previewScrollEl.scrollTop,
      getScrollableDistance(previewScrollEl),
      targetScrollable,
      sections.value,
      'previewTop',
      'editorTop'
    )

    const blendedTarget = blendTargets(
      mappedTarget,
      ratioTarget,
      targetScrollable,
      PREVIEW_TO_EDITOR_MAPPED_WEIGHT,
      PREVIEW_TO_EDITOR_RATIO_WEIGHT
    )

    editorScrollEl.scrollTop = clamp(
      blendedTarget * PREVIEW_TO_EDITOR_SLOWDOWN,
      0,
      targetScrollable
    )
  }

  const bindListeners = (): void => {
    clearListeners()

    const editorScrollEl = editorRef.value?.getScrollElement() ?? null
    const previewScrollEl = previewRef.value?.getScrollElement() ?? null

    if (!editorScrollEl || !previewScrollEl) {
      console.log('[scroll-sync] missing scroll elements', {
        editorScrollEl,
        previewScrollEl
      })
      return
    }

    const onEditorScroll = (): void => {
      if (!enabled.value) return
      if (syncingFrom === 'preview') return
      syncingFrom = 'editor'
      syncEditorToPreview()
      releaseSyncLockSoon()
    }

    const onPreviewScroll = (): void => {
      if (!enabled.value) return
      if (syncingFrom === 'editor') return
      syncingFrom = 'preview'
      syncPreviewToEditor()
      releaseSyncLockSoon()
    }

    editorScrollEl.addEventListener('scroll', onEditorScroll, { passive: true })
    previewScrollEl.addEventListener('scroll', onPreviewScroll, { passive: true })

    editorCleanup = () => editorScrollEl.removeEventListener('scroll', onEditorScroll)
    previewCleanup = () => previewScrollEl.removeEventListener('scroll', onPreviewScroll)
    isBound.value = true

    console.log('[scroll-sync] bound listeners', {
      editorScrollEl,
      previewScrollEl
    })
  }

  const setupResizeObserver = (): void => {
    clearObserver()

    const articleEl = previewRef.value?.getArticleElement() ?? null
    if (!articleEl) return

    resizeObserver = new ResizeObserver(() => {
      void measureSections()
    })

    resizeObserver.observe(articleEl)
  }

  const refreshScrollSync = async (): Promise<void> => {
    if (!enabled.value) return

    await measureSections()
    bindListeners()
    setupResizeObserver()

    console.log('[scroll-sync] refresh complete', {
      isBound: isBound.value,
      sections: sections.value,
      tuning: {
        EDITOR_TO_PREVIEW_ADVANCE,
        PREVIEW_TO_EDITOR_SLOWDOWN,
        EDITOR_TO_PREVIEW_MAPPED_WEIGHT,
        EDITOR_TO_PREVIEW_RATIO_WEIGHT,
        PREVIEW_TO_EDITOR_MAPPED_WEIGHT,
        PREVIEW_TO_EDITOR_RATIO_WEIGHT
      }
    })
  }

  watch(
    () => [content.value, editorRef.value, previewRef.value, enabled.value],
    async () => {
      if (!enabled.value) return
      await refreshScrollSync()
    },
    { deep: true, flush: 'post' }
  )

  onBeforeUnmount(() => {
    clearListeners()
    clearObserver()
    clearReleaseTimer()
  })

  return {
    sections,
    isBound,
    refreshScrollSync
  }
}