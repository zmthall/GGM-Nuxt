export default defineNuxtRouteMiddleware(async (_to, _from) => {
    if(!import.meta.client) return;

    const firebaseAuth = useFirebaseAuth()
    const authStore = useAuthStoreStore()
    const currentUser = firebaseAuth.getCurrentUser()

    if(currentUser === null)
        authStore.authorized = false;
    else
        authStore.authorized = true;
})

