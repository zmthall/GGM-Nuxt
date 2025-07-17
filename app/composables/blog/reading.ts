import type { MarkdownRoot } from "@nuxt/content";

export const useReading = () => {

  const getReadingTime = (body: MarkdownRoot) => {
    if(!body) return undefined

    let count = 0;
    body.value.forEach(arr => {
      const content = arr[2] as string;
      if (typeof content === 'string' && content.trim()) {
        count += content.trim().split(/\s+/).length; // \s+ handles multiple spaces
      }
    })
    
    if(count === 0) return undefined;

    const minutes = Math.ceil(count/250);
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }
  return {
    getReadingTime
  }
}
