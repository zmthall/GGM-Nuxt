// plugins/analytics-stub.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type { Script as UnheadScript } from '@unhead/schema'  // ✅ proper type

// Some unhead versions don’t include nonce in Script; extend it if needed.
type ScriptWithNonce = UnheadScript & { nonce?: string }

export default defineNuxtPlugin(() => {
  const cfg   = useRuntimeConfig()
  const gaId  = cfg.public.googleAnalyticsId as string | undefined
  const uetId = cfg.public.microsoftUetId     as string | undefined
  const nonce = cfg.public.cspNonce           as string | undefined

  // Skip admin routes only
  const path = import.meta.server ? useRequestURL().pathname : useRoute().path
  if (path.startsWith('/admin')) return

  const scripts: ScriptWithNonce[] = []

  if (gaId) {
    const gaInline: ScriptWithNonce = {
      key: 'ga-stub',
      type: 'text/javascript',
      // IMPORTANT: use innerHTML for inline scripts
      innerHTML: `
        (function(){
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            send_page_view: true,
            page_path: location.pathname + location.search
          });
        })();
      `.trim(),
      nonce, // ✅ allowed via ScriptWithNonce
    }
    scripts.push(gaInline)
  }

  if (uetId) {
    const uetInline: ScriptWithNonce = {
      key: 'uet-stub',
      type: 'text/javascript',
      innerHTML: `
        (function(w){ w.uetq = w.uetq || []; w.uetq.push('pageLoad'); })(window);
      `.trim(),
      nonce,
    }
    scripts.push(uetInline)
  }

  useHead({ script: scripts }) // ✅ correctly typed
})
