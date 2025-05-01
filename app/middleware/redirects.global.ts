export default defineNuxtRouteMiddleware((to, _from) => {
    try {
        // /login → /admin/login
        if (to.path === '/login') {
            return navigateTo('/admin/login')
        }
      } catch (err) {
        console.error('Middleware error (Redirects.Global):', err)
      }
})
