export default defineNuxtPlugin(() => {   
    // Just remove any duplicate viewport tags the bot creates
    setTimeout(() => {
      const viewports = document.querySelectorAll('meta[name="viewport"]');
      // Keep only the first viewport (yours) and remove any duplicates
      if (viewports.length > 1) {
        for (let i = 1; i < viewports.length; i++) {
          viewports[i]?.remove();
        }
      }
    }, 500);
})