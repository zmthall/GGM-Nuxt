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
  return {
    getReadingTime,
    getWordCount
  }
}
