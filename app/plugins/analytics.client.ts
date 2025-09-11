// plugins/marketing.client.ts
export default defineNuxtPlugin(() => {
  const { public: pub } = useRuntimeConfig()
  const gaId = pub.googleAnalyticsId
  const uetId = pub.microsoftUetId

  if (!gaId && !uetId) return

  useHead({
    script: [
      // --- GA4 (gtag.js) ---
      ...(gaId
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
              async: true,
              // Initialize GA once the loader finishes
              onload: `
                (function(){
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){ dataLayer.push(arguments); }
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                })();
              `
            } as const
          ]
        : []),

      // --- Microsoft UET (SPA auto tracking) ---
      ...(uetId
        ? [
            {
              src: 'https://bat.bing.com/bat.js',
              async: true,
              defer: true,
              onload: `
                ;(function(){
                  window.uetq = window.uetq || [];
                  var o = { ti: "${uetId}", enableAutoSpaTracking: true };
                  var u = new UET(o);
                  if (Array.isArray(window.uetq)) {
                    window.uetq.forEach(function(args){ u.push.apply(u, args); });
                  }
                  window.uetq = u;
                  window.uetq.push('pageLoad');
                })();
              `
            } as const
          ]
        : [])
    ]
  })
})
