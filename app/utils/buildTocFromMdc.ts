export interface TocLink {
  id: string
  text: string
  depth: number
  children: TocLink[]
}

export interface TocResult {
  links: TocLink[]
}

export const slugifyHeading = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~[\]{}()#!.+?:/\\]/g, '')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const buildTocFromMdc = (content: string): TocResult => {
  const lines = content.split('\n')
  const flatLinks: TocLink[] = []

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) continue

    const match = /^(##|###|####)\s+(.+)$/.exec(line)

    if (!match) continue

    const hashes = match[1]
    const rawText = (match[2] ?? '').trim()

    const text = rawText
      .replaceAll(/\[(.*?)\]\(.*?\)/g, '$1')
      .replaceAll(/[*_`~]/g, '')
      .trim()

    const depth = hashes?.length
    const id = slugifyHeading(text)

    flatLinks.push({
      id,
      text,
      depth: depth ?? 0,
      children: []
    })
  }

  const root: TocLink[] = []
  const stack: TocLink[] = []

  for (const link of flatLinks) {
    while (stack.length && stack[stack.length - 1]!.depth >= link.depth) {
      stack.pop()
    }

    if (!stack.length) {
      root.push(link)
    } else {
      stack[stack.length - 1]!.children.push(link)
    }

    stack.push(link)
  }

  return { links: root }
}