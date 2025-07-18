export const useText = () => {
  const truncateText = (text: string | undefined, maxLength: number = 200): string => {
    if (text === undefined) return ''
    
    const cleanText = text.replace(/\s+/g, ' ').trim()
    
    if (cleanText.length <= maxLength) {
      return cleanText
    }
    
    return cleanText.substring(0, maxLength) + '...'
  }

  return {
    truncateText
  }
}
