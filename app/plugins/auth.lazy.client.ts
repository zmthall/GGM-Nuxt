import { defineNuxtPlugin } from '#app'

type FB = {
  app: import('firebase/app').FirebaseApp
  auth: import('firebase/auth').Auth
  db: import('firebase/database').Database
}

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  let bundlePromise: Promise<FB> | null = null

  const init = async (): Promise<FB> => {
    const [{ initializeApp }, authMod, { getDatabase }] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/database'),
    ])

    const cfg = useRuntimeConfig().public.firebase

    const app = initializeApp({
      apiKey: cfg.apiKey,
      authDomain: cfg.authDomain,
      projectId: cfg.projectId,
      storageBucket: cfg.storageBucket,
      messagingSenderId: cfg.messagingSenderId,
      appId: cfg.appId,
    })

    const { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } = authMod
    const auth = getAuth(app)

    await setPersistence(auth, browserLocalPersistence)

    const db = getDatabase(app)

    await new Promise<void>((resolve) => {
      let first = true

      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            authStore.setUser(user)
            authStore.resetRole()
            await authStore.refreshRole()
          } else {
            authStore.clearAuth()
          }
        } catch (error) {
          console.error('Error during auth initialization:', error)
          authStore.clearAuth()
        } finally {
          if (first) {
            authStore.setFirebaseReady(true)
            first = false
            resolve()
          }
        }
      })
    })

    return { app, auth, db }
  }

  const getFirebase = async (): Promise<FB> => {
    if (!bundlePromise) {
      bundlePromise = init()
    }

    const fb = await bundlePromise

    if (!nuxtApp.$firebase) {
      nuxtApp.provide('firebase', fb)
    }

    return fb
  }

  nuxtApp.provide('getFirebase', getFirebase)
})