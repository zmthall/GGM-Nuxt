import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    authDomain: config.public.firebase.authDomain,
    projectId: config.public.firebase.projectId,
    storageBucket: config.public.firebase.storageBucket,
    messagingSenderId: config.public.firebase.messagingSenderId,
    appId: config.public.firebase.appId,
  };

   try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
  
    await setPersistence(auth, browserLocalPersistence);

    await new Promise<void>((resolve) => {
      let isInitialCall = true;
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          authStore.setUser(user);
        } else {
          authStore.clearAuth();
        }
        
        if (isInitialCall) {
          // Mark Firebase as ready after first auth check
          authStore.setFirebaseReady();
          isInitialCall = false;
          resolve();
        }
      });
    });

    nuxtApp.provide('firebase', { app, auth, db });
  
  } catch (err) {
    console.error('Firebase initialization error:', err);
    authStore.setFirebaseReady(); // Mark as ready even on error
    nuxtApp.provide('firebase', null);
  }
});