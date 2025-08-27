// app/composables/useDateFormat.ts
export const useDateFormat = () => {
  const parseFlexibleDate = (dateInput: string | Date | undefined): Date | null => {
    if (!dateInput) return null;
    if (dateInput instanceof Date) return dateInput;
    
    const dateString = dateInput.toString().trim();
    
    // MM/DD/YYYY or M/D/YYYY format
    const usDateMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (usDateMatch) {
      const month = usDateMatch[1];
      const day = usDateMatch[2];
      const year = usDateMatch[3];
      
      if (month && day && year) {
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
        const yearNum = parseInt(year, 10);
        
        if (!isNaN(monthNum) && !isNaN(dayNum) && !isNaN(yearNum)) {
          return new Date(yearNum, monthNum - 1, dayNum);
        }
      }
    }
    
    // YYYY-MM-DD or YYYY-M-D format (ISO)
    const isoDateMatch = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (isoDateMatch) {
      const year = isoDateMatch[1];
      const month = isoDateMatch[2];
      const day = isoDateMatch[3];
      
      if (year && month && day) {
        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
        
        if (!isNaN(yearNum) && !isNaN(monthNum) && !isNaN(dayNum)) {
          return new Date(yearNum, monthNum - 1, dayNum);
        }
      }
    }
    
    // MM-DD-YYYY or M-D-YYYY format
    const dashDateMatch = dateString.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (dashDateMatch) {
      const month = dashDateMatch[1];
      const day = dashDateMatch[2];
      const year = dashDateMatch[3];
      
      if (month && day && year) {
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);
        const yearNum = parseInt(year, 10);
        
        if (!isNaN(monthNum) && !isNaN(dayNum) && !isNaN(yearNum)) {
          return new Date(yearNum, monthNum - 1, dayNum);
        }
      }
    }
    
    // Fallback to native Date parsing
    const fallbackDate = new Date(dateString);
    if (!isNaN(fallbackDate.getTime())) {
      return fallbackDate;
    }
    
    return null;
  };

  const formatDatetime = (date: string | Date | undefined): string => {
    const parsedDate = parseFlexibleDate(date);
    return parsedDate ? parsedDate.toISOString() : '';
  };

  const formatDisplayDate = (date: string | Date | undefined): string => {
    const parsedDate = parseFlexibleDate(date);
    if (!parsedDate) return '';
    
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate= (date: string | Date | undefined): string => {
    const parsedDate = parseFlexibleDate(date);
    if (!parsedDate) return '';
    
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    
    return `${month}/${day}/${year}`;
  };

  const formatLongDateTime = (date: string | Date | undefined): string => {
    const parsedDate = parseFlexibleDate(date);
    if (!parsedDate) return '';
    
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ` at ${parsedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })}`;
  };

  return {
    parseFlexibleDate,
    formatDatetime,
    formatLongDateTime,
    formatDisplayDate,
    formatShortDate
  };
};