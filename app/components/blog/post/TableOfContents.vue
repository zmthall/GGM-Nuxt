<template>
  <div v-if="hasLinks">
    <button
      type="button"
      :class="[
        'fixed left-0 top-1/2 z-16 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-r-2xl border-y border-r border-brand-secondary bg-brand-primary text-white shadow-primary transition-all duration-300 ease-in-out hover:bg-brand-secondary hover:text-brand-primary',
        drawerOpen ? 'translate-x-72 sm:translate-x-80' : 'translate-x-0'
      ]"
      aria-label="Open table of contents"
      :aria-expanded="drawerOpen ? 'true' : 'false'"
      aria-controls="blog-post-toc-drawer"
      @click="openDrawer"
    >
      <BaseIcon name="mdi:format-list-bulleted" color="text-inherit" />
    </button>

    <div
      :class="[
        'fixed inset-0 z-15 bg-black/35 transition-opacity duration-300 ease-in-out',
        drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      ]"
      aria-hidden="true"
      @click="closeDrawer"
    />

    <aside
      id="blog-post-toc-drawer"
      :class="[
        'fixed left-0 top-4 bottom-4 z-15 w-72 max-w-[85vw] overflow-hidden rounded-r-2xl border-y border-r border-brand-secondary bg-brand-primary shadow-primary transition-transform duration-300 ease-in-out sm:w-80',
        drawerOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      aria-label="Table of contents"
      :aria-hidden="drawerOpen ? 'false' : 'true'"
    >
      <div class="flex h-full min-h-0 flex-col">
        <div class="border-b border-white/10 px-5 py-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="font-serif text-[1.95rem] leading-none text-brand-secondary">Table of Contents</h2>
              <p class="mt-2 text-sm leading-snug text-white/70">Explore the article by section.</p>
            </div>

            <button
              type="button"
              class="rounded-full flex items-center p-2 text-white transition-colors duration-200 hover:bg-white/10 hover:text-brand-secondary"
              aria-label="Close table of contents"
              @click="closeDrawer"
            >
              <BaseIcon name="mdi:close" color="text-inherit" />
            </button>
          </div>
        </div>

        <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4 pr-2">
          <ul class="space-y-1.5">
            <li v-for="link in displayLinks" :key="link.key">
              <a
                :href="`#${link.id}`"
                :class="getRowClasses(link)"
                @click.prevent="scrollToHeading(link.id)"
              >
                <span v-if="activeId === link.id" class="w-2 rounded-r-xl absolute h-full right-0 top-0 bg-brand-secondary/80" />
                <span class="flex items-center gap-3">
                  <span
                    v-if="link.depth >= 3"
                    :class="[
                      'flex h-4 w-4 shrink-0 items-center justify-center',
                      getIndicatorColorClass(link)
                    ]"
                  >
                    <span
                      v-if="activeId === link.id"
                      class=""
                    />
                    <span
                      v-if="link.depth === 3 && activeId !== link.id"
                      class="block h-1.5 w-1.5 rounded-full bg-current"
                    />
                    <span
                      v-else-if="activeId !== link.id"
                      class="block h-1.5 w-1.5 rotate-45 bg-current"
                    />
                  </span>

                  <span
                    :class="[
                      'block min-w-0 leading-snug transition-colors duration-200',
                      getTextBaseClass(link),
                      getTextStateClass(link)
                    ]"
                  >
                    {{ link.text }}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BlogPostTableOfContents'
})

interface TocLink {
  id: string
  text?: string
  depth?: number
  children?: TocLink[]
}

interface FlatTocLink {
  key: string
  id: string
  text: string
  depth: number
}

const props = withDefaults(defineProps<{
  toc: {
    links: TocLink[]
  }
  scrollOffset?: number
  maxDepth?: number
}>(), {
  scrollOffset: 120,
  maxDepth: 3
})

const drawerOpen = ref(false)
const activeId = ref('')

const hasLinks = computed(() => Array.isArray(props.toc?.links) && props.toc.links.length > 0)

const formatFallbackText = (value: string): string => {
  return value
    .replaceAll('-', ' ')
    .replaceAll(/\s+/g, ' ')
    .trim()
}

const flattenTocLinks = (
  links: TocLink[],
  output: FlatTocLink[] = [],
  parentKey = ''
): FlatTocLink[] => {
  links.forEach((link, index) => {
    const depth = Number(link.depth ?? 2)
    const key = parentKey ? `${parentKey}-${index}-${link.id}` : `${index}-${link.id}`

    output.push({
      key,
      id: link.id,
      text: link.text?.trim() || formatFallbackText(link.id),
      depth
    })

    if (Array.isArray(link.children) && link.children.length) {
      flattenTocLinks(link.children, output, key)
    }
  })

  return output
}

const flatLinks = computed(() => {
  return flattenTocLinks(props.toc?.links ?? [])
})

const displayLinks = computed(() => {
  return flatLinks.value.filter(link => link.depth <= props.maxDepth)
})

const getRowClasses = (link: FlatTocLink): string[] => {
  return [
    'relative group block rounded-xl transition-all duration-200',
    link.depth === 2 ? 'mt-6 px-3 py-2.5 first:mt-0' : '',
    link.depth === 3 ? 'ml-3 px-3 py-2' : '',
    link.depth >= 4 ? 'ml-6 px-3 py-1.5' : '',
    activeId.value === link.id ? 'bg-white/10' : 'hover:bg-white/5'
  ]
}

const getTextBaseClass = (link: FlatTocLink): string => {
  if (link.depth === 2) return 'text-[1.08rem] font-semibold tracking-tight'
  if (link.depth === 3) return 'text-[0.96rem] font-medium'
  return 'text-sm font-normal'
}

const getTextStateClass = (link: FlatTocLink): string => {
  if (activeId.value === link.id) {
    return 'text-brand-secondary font-semibold'
  }

  if (link.depth === 2) {
    return 'text-white group-hover:text-brand-secondary'
  }

  if (link.depth === 3) {
    return 'text-white/95 group-hover:text-brand-secondary'
  }

  return 'text-white/60 group-hover:text-brand-secondary'
}

const getIndicatorColorClass = (link: FlatTocLink): string => {
  if (activeId.value === link.id) return ''
  return 'text-white/35 group-hover:text-brand-secondary'
}

const openDrawer = (): void => {
  drawerOpen.value = true
}

const closeDrawer = (): void => {
  drawerOpen.value = false
}

const scrollToHeading = (id: string): void => {
  const heading = document.getElementById(id)

  if (!heading) {
    closeDrawer()
    return
  }

  const headingTop = heading.getBoundingClientRect().top + globalThis.scrollY
  const targetTop = Math.max(0, headingTop - props.scrollOffset)

  globalThis.history.replaceState(null, '', `#${id}`)
  globalThis.scrollTo({
    top: targetTop,
    behavior: 'smooth'
  })

  activeId.value = id
  closeDrawer()
}

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && drawerOpen.value) {
    closeDrawer()
  }
}

let observer: IntersectionObserver | null = null
let removeHashListener: (() => void) | null = null

onMounted(() => {
  globalThis.addEventListener('keydown', onKeydown)

  if (!hasLinks.value) return

  const ids = displayLinks.value.map(link => link.id).filter(Boolean)

  const headings = ids
    .map(id => document.getElementById(id))
    .filter((value): value is HTMLElement => Boolean(value))

  if (!headings.length) return

  const syncFromHash = (): void => {
    const hash = globalThis.location.hash.replace('#', '').trim()

    if (hash) {
      activeId.value = decodeURIComponent(hash)
    }
  }

  syncFromHash()
  globalThis.addEventListener('hashchange', syncFromHash)
  removeHashListener = () => globalThis.removeEventListener('hashchange', syncFromHash)

  observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))

      if (visible.length) {
        activeId.value = visible[0]?.target.id ?? ''
      }
    },
    {
      root: null,
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0, 0.2, 0.5, 1]
    }
  )

  headings.forEach(heading => observer?.observe(heading))
})

watch(drawerOpen, isOpen => {
  document.body.classList.toggle('overflow-hidden', isOpen)
})

onBeforeUnmount(() => {
  globalThis.removeEventListener('keydown', onKeydown)
  removeHashListener?.()
  document.body.classList.remove('overflow-hidden')
  observer?.disconnect()
  observer = null
})
</script>