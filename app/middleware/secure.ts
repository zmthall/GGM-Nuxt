// ~/middleware/secure.ts
export default defineNuxtRouteMiddleware(async (to) => {
  // If your auth plugin runs client-side only, skip on server
  if (import.meta.server) return

  const auth = useAuthStore()

  // Read config from page meta (all fields optional)
  // Example meta below in section 3.
  const meta = to.meta.secure as undefined | {
    requireAuth?: boolean          // default true
    allowedRoles?: Array<'user' | 'admin' | 'superadmin'>
    requireAllPerms?: string[]     // all must be present
    requireAnyPerms?: string[]     // at least one present
    redirectTo?: string            // override login redirect
    forbiddenTo?: string           // override forbidden redirect
  }
  if (!meta) return

  const {
    requireAuth = true,
    allowedRoles,
    requireAllPerms,
    requireAnyPerms,
    redirectTo = '/login',
    forbiddenTo = '/forbidden',
  } = meta

  // Avoid loops
  if ([redirectTo, forbiddenTo].includes(to.path)) return

  // 1) Wait for Firebase auth to resolve
  try {
    await waitForTrue(() => auth.isFirebaseReady, 8000)
  } catch {
    return navigateTo(redirectTo)
  }

  // 2) Require login?
  if (requireAuth && !auth.user) {
    return navigateTo(redirectTo)
  }

  // 3) Ensure we have role/permissions loaded once per session
  if (auth.user && auth.role === null) {
    await auth.refreshRole() // your API call populates role (+ permissions if available)
  }

  // 4) Role check (if specified)
  if (allowedRoles?.length) {
    const ok = allowedRoles.includes(auth.role as any)
    if (!ok) return navigateTo(forbiddenTo)
  }
})

function waitForTrue(getter: () => boolean, timeoutMs = 8000) {
  return new Promise<void>((resolve, reject) => {
    const start = Date.now()
    const t = setInterval(() => {
      if (getter()) { clearInterval(t); resolve() }
      else if (Date.now() - start > timeoutMs) { clearInterval(t); reject(new Error('timeout')) }
    }, 50)
  })
}
