export const useReading = () => {
  const getWordCount = (markdown: string | null | undefined) => {
    if (!markdown || typeof markdown !== "string") return 0;

    let cleaned = markdown
      .replace(
        /::[A-Za-z0-9_]+(?:\{[^}]*\})?\s*([\s\S]*?)::/g,
        "$1"
      )
      .replace(/(^|\n)#{1,6}\s*References[\s\S]*$/i, "");

    // Remove markdown syntax to avoid inflated word counts
    cleaned = cleaned
      // .replace
      .replace(/[`*_>#-]/g, "")
      .replace(/!\[.*?\]\(.*?\)/g, " ")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleaned) return 0;
    return cleaned.split(" ").length;
  };

  const getReadingTime = async (slug: string): Promise<string | undefined> => {
    const postBodyStr = await getPostBody(slug)

    const count = getWordCount(postBodyStr);
    if (!count) return undefined;

    const minutes = Math.ceil(count / 250);
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  };

  // Page Body (string)
  const getPostBody = async (slug: string): Promise<string> => {
    const response = await $fetch<{ body: string }>(`/api/blog/${slug}`, {
        method: 'GET'
      })

      return response.body;
  }

  return {
    getWordCount,
    getReadingTime,
  };
}
