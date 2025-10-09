import type { FirebaseApp } from 'firebase/app'
import type { Auth, UserCredential } from 'firebase/auth'
import type { Database } from 'firebase/database'

type FB = { app: FirebaseApp; auth: Auth; db: Database }

export const useFirebaseAuth = () => {
  if (import.meta.server) return null

  const nuxt = useNuxtApp()
  const authStore = useAuthStore()

  let cached: Promise<{ fb: FB } & typeof import('firebase/auth')> | null = null
  const ensure = async () => {
    if (cached) return cached
    cached = (async () => {
      // ✅ Always call $getFirebase (well-typed), then add auth API
      const fb = await nuxt.$getFirebase()
      const authApi = await import('firebase/auth')
      return { fb, ...authApi }
    })()
    return cached
  }

  const sendPasswordReset = async (email: string) => {
    const { fb, sendPasswordResetEmail } = await ensure()
    try {
      if (!email?.includes('@')) throw new Error('Please provide a valid email address.')
      await sendPasswordResetEmail(fb.auth, email)
    } catch (err) { if (err instanceof Error) authStore.setError(err.message); throw err }
  }

  const createUser = async (email: string, password: string): Promise<UserCredential> => {
    const { fb, createUserWithEmailAndPassword } = await ensure()
    try {
      if (!email?.includes('@') || !password) throw new Error('Please provide valid email and password.')
      const cred = await createUserWithEmailAndPassword(fb.auth, email, password)
      void authStore.setUser(cred.user)   // ✅ explicit call; void silences “unused result”
      return cred
    } catch (err) {
      authStore.clearAuth()
      if (err instanceof Error) authStore.setError(err.message)
      throw err
    }
  }

  const loginUser = async (email: string, password: string): Promise<UserCredential> => {
    const { fb, signInWithEmailAndPassword } = await ensure()
    try {
      if (!email?.includes('@') || !password) throw new Error('Please provide valid email and password.')
      const cred = await signInWithEmailAndPassword(fb.auth, email, password)
      void authStore.setUser(cred.user)
      return cred
    } catch (err) {
      authStore.clearAuth()
      if (err instanceof Error) authStore.setError(err.message)
      throw err
    }
  }

  const logoutUser = async () => {
    const { fb, signOut } = await ensure()
    try { await signOut(fb.auth); authStore.clearAuth(); return true }
    catch (err) { if (err instanceof Error) authStore.setError(err.message); throw err }
  }

  const getCurrentUser = async () => {
    const { fb } = await ensure()
    return fb.auth.currentUser
  }

  return { sendPasswordReset, createUser, loginUser, logoutUser, getCurrentUser }
}
