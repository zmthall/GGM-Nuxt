// composables/sanitize.ts

/**
 * Safely sanitize HTML for controlled environments
 * Allows only a minimal whitelist of tags:
 *   <strong>, <em>, <b>, <i>, <u>, <br>
 *
 * This is perfect for admin-generated markdown where you
 * want *some* formatting but no risky tags or attributes.
 */
export function useSanitize() {
  const allowedTags = new Set([
    'strong',
    'em',
    'b',
    'i',
    'u',
    'br',
    'ul',
    'li',
    'ol',
    'p',
    'a',
    'h1',
    'h2',
    'h3',
    'h4'
  ])

  /**
   * Strips out all HTML tags except those on the whitelist.
   * Attributes inside tags are removed for safety.
   */
  const sanitize = (html: string): string => {
    if (!html || typeof html !== 'string') return ''

    return html.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, tagName) => {
      const lower = tagName.toLowerCase()
      return allowedTags.has(lower) ? `<${lower}>` : ''
    })
  }

  return { sanitize }
}
