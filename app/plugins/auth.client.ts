import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

export default defineNuxtPlugin(async () => {
  try {
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
  
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
  
    await setPersistence(auth, browserLocalPersistence);
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authStore.user = user;
      } else {
        authStore.user = undefined;
      }
    });
    return {
      provide: {
        firebase: {
          app,
          auth,
          db,
        },
      },
    };
  
  } catch (err) {
    console.error('Plugin error:', err)
  }

  return {};
});
