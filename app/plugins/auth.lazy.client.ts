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
      onAuthStateChanged(auth, (user) => {
        if (user) authStore.setUser(user)
        else authStore.clearAuth()
        if (first) { authStore.setFirebaseReady(); first = false; resolve() }
      })
    })

    return { app, auth, db }
  }

  const getFirebase = async (): Promise<FB> => {
    if (!bundlePromise) bundlePromise = init()
    const fb = await bundlePromise
    if (!nuxtApp.$firebase) nuxtApp.provide('firebase', fb) // back-compat
    return fb
  }

  nuxtApp.provide('getFirebase', getFirebase)
})
