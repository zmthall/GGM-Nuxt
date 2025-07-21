import type { FirebaseApp } from "firebase/app";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, validatePassword, type Auth } from "firebase/auth";
import type { Database } from "firebase/database";

export const useFirebaseAuth = () => {
  try {
    const { $firebase } = useNuxtApp();
    const authStore = useAuthStore();
  
    const firebase = $firebase as {
      app: FirebaseApp;
      auth: Auth;
      db: Database;
    };
  
    const sendPasswordReset = async (email: string) => {
      try {
        if (email && email.length > 0 && email.includes("@"))
          await sendPasswordResetEmail(firebase.auth, email);
        else throw new Error("Failed to send password reset request.");
      } catch (err) {
        if (err instanceof Error) authStore.error = err.message;
      }
    };
  
   const createUser = async (email: string, password: string) => {
    try {
      if((email && email.length > 0 && email.includes("@")) && password && password.length > 0) {
        const userCredential = await createUserWithEmailAndPassword(firebase.auth, email, password);
        authStore.setUser(userCredential.user)
        return userCredential
      } else throw new Error("Failed to create user.")
    } catch (err) {
      authStore.clearAuth()
      if(err instanceof Error) authStore.error = err.message;
    }
   }
  
    const loginUser = async (email: string, password: string) => {
      try {
        if((email && email.length > 0 && email.includes("@"))) {
          const status = await validatePassword(firebase.auth, password)
          if(!status.isValid) {
            throw new Error("Failed to login, invalid credentials.");
          } else {
            const userCredential = await signInWithEmailAndPassword(firebase.auth, email, password);
            authStore.setUser(userCredential.user)
            return userCredential
          }
        } else throw new Error("Error, failed to login.")
      } catch (err) {
        authStore.clearAuth()
        if(err instanceof Error) authStore.error = err.message;
      }
    }
  
    const logoutUser = async () => {
      if(authStore.user) {
        try {
          await signOut(firebase.auth);
          authStore.clearAuth()
          return true;
        } catch (err) {
          if(err instanceof Error) authStore.error = err.message
        }
      }
    }
  
    const getCurrentUser = () => {
      if(!firebase.auth) return false

      return firebase.auth.currentUser
    }
  
    return {
      sendPasswordReset,
      createUser,
      loginUser,
      logoutUser,
      getCurrentUser,
    };
  } catch (err) {
    console.error('Composable error (FirebaseAuth):', err)
  }
};
