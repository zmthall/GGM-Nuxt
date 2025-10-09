import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Database } from 'firebase/database'

declare module '#app' {
  interface NuxtApp {
    $getFirebase: () => Promise<{ app: FirebaseApp; auth: Auth; db: Database }>
    $firebase?: { app: FirebaseApp; auth: Auth; db: Database }
    $refreshUser?: () => Promise<void>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $getFirebase: NuxtApp['$getFirebase']
    $firebase?: NuxtApp['$firebase']
    $refreshUser?: NuxtApp['$refreshUser']
  }
}
export {}
