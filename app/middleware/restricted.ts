export default defineNuxtRouteMiddleware(async (_to, _from) => {
    if(import.meta.server) return

    try {
        const firebaseAuth = useFirebaseAuth()
        const authStore = useAuthStoreStore()
        const currentUser = firebaseAuth?.getCurrentUser()
    
        authStore.authorized = !!currentUser
      } catch (err) {
        console.error('Middleware error (Restricted):', err)
      }

})

