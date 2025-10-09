// ~/middleware/secure.ts
type Role = 'user' | 'admin' | 'superadmin'
type SecureMeta = {
  requireAuth?: boolean
  allowedRoles?: Role[]
  requireAllPerms?: string[]
  requireAnyPerms?: string[]
  redirectTo?: string
  forbiddenTo?: string
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const meta = to.meta.secure as SecureMeta | undefined
  if (!meta) return

  const auth = useAuthStore()
  const { $getFirebase } = useNuxtApp()

  const {
    requireAuth = true,
    allowedRoles,
    redirectTo = '/admin/login',
    forbiddenTo = '/admin',
  } = meta

  // Avoid loops
  if ([redirectTo, forbiddenTo].includes(to.path)) return

  // 1) Make sure Firebase client is initialized
  await $getFirebase()

  // 2) Wait for the store to mark Firebase as ready
  try {
    await waitForTrue(() => auth.isFirebaseReady, 8000)
  } catch {
    // If we can’t even get ready, go to login
    return navigateTo(redirectTo, { replace: true })
  }

  // 3) Require login?
  // Prefer your store's "authorized" (token+user) over just user presence
  if (requireAuth && !auth.authorized) {
    return navigateTo(redirectTo, { replace: true })
  }

  // 4) Ensure role is populated once per session
  if (auth.authorized && auth.role == null) {
    await auth.refreshRole()
  }

  // 5) Role check (if provided)
  if (allowedRoles?.length) {
    if (!allowedRoles.includes(auth.role as Role)) {
      return navigateTo(forbiddenTo, { replace: true })
    }
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
