export const useReading = () => {
  const getWordCount = (markdown: string | null | undefined) => {
    if (!markdown || typeof markdown !== "string") return 0

    let cleaned = markdown

    cleaned = cleaned.replace(/::BlogAtAGlance(?:\{[^}]*\})?\s*[\s\S]*?::/g, " ")
    cleaned = cleaned.replace(/::BlogReferences(?:\{[^}]*\})?\s*[\s\S]*?::/g, " ")

    cleaned = cleaned.replace(/::[A-Za-z0-9_]+(?:\{[^}]*\})?\s*([\s\S]*?)::/g, "$1")

    cleaned = cleaned
      .replace(/(^|\n)---(\n|$)/g, ' ')
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/~~~[\s\S]*?~~~/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/!\[.*?\]\(.*?\)/g, " ")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/[*_>#~=-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    if (!cleaned) return 0
    return cleaned.split(" ").filter(Boolean).length
  }

  const getReadingMinutes = (markdown: string | null | undefined) => {
    const words = getWordCount(markdown)
    if (!words) return 0
    return Math.max(1, Math.ceil(words / 250))
  }

  return { getWordCount, getReadingMinutes }
}