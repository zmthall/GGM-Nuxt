import type { MarkdownRoot } from "@nuxt/content";

export const useReading = () => {

  const getWordCount = (body: MarkdownRoot) => {
    if(!body) return undefined

    let count = 0;
    body.value.forEach(arr => {
      const content = arr[2] as string;
      if (typeof content === 'string' && content.trim()) {
        count += content.trim().split(/\s+/).length; // \s+ handles multiple spaces
      }
    })
    
    if(count === 0) return undefined;

    return count;
  }

  const getReadingTime = (body: MarkdownRoot) => {
    if(!body) return undefined;

    const count = getWordCount(body);

    if(count !== undefined && count !== 0) {
      const minutes = Math.ceil(count/250);
      return minutes === 1 ? '1 minute' : `${minutes} minutes`;
    } else return undefined
  }
  
  const getWordCountString = (markdown: string | null | undefined) => {
    if (!markdown || typeof markdown !== "string") return 0;

    // Remove markdown syntax to avoid inflated word counts
    const cleaned = markdown
      .replace(/[`*_>#-]/g, " ")
      .replace(/!\[.*?\]\(.*?\)/g, " ")
      .replace(/\[.*?\]\(.*?\)/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleaned) return 0;
    return cleaned.split(" ").length;
  };

  const getReadingTimeString = (markdown: string | null | undefined) => {
    const count = getWordCountString(markdown);
    if (!count) return undefined;

    const minutes = Math.ceil(count / 250);
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  };

  return {
    getWordCount,
    getReadingTime,
    getWordCountString,
    getReadingTimeString
  };
}
