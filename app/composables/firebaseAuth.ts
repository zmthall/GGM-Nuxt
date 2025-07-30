import type { FirebaseApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signOut, 
  type Auth 
} from "firebase/auth";
import type { Database } from "firebase/database";

export const useFirebaseAuth = () => {
  if (import.meta.server) {
    return null;
  }

  try {
    const { $firebase } = useNuxtApp();
    const authStore = useAuthStore();
  
    if (!$firebase) {
      throw new Error('Firebase not initialized');
    }

    const firebase = $firebase as {
      app: FirebaseApp;
      auth: Auth;
      db: Database;
    };
  
    const sendPasswordReset = async (email: string) => {
      try {
        if (email && email.length > 0 && email.includes("@")) {
          await sendPasswordResetEmail(firebase.auth, email);
        } else {
          throw new Error("Please provide a valid email address.");
        }
      } catch (err) {
        if (err instanceof Error) {
          authStore.setError(err.message);
        }
        throw err; // Re-throw so caller can handle it
      }
    };
  
    const createUser = async (email: string, password: string) => {
      try {
        if ((email && email.length > 0 && email.includes("@")) && password && password.length > 0) {
          const userCredential = await createUserWithEmailAndPassword(firebase.auth, email, password);
          authStore.setUser(userCredential.user);
          return userCredential;
        } else {
          throw new Error("Please provide valid email and password.");
        }
      } catch (err) {
        authStore.clearAuth();
        if (err instanceof Error) {
          authStore.setError(err.message);
        }
        throw err; // Re-throw so caller can handle it
      }
    };
  
    const loginUser = async (email: string, password: string) => {
      try {
        if (email && email.length > 0 && email.includes("@") && password && password.length > 0) {
          // Remove validatePassword - it doesn't exist in Firebase Auth
          // Firebase will handle password validation during signIn
          const userCredential = await signInWithEmailAndPassword(firebase.auth, email, password);
          authStore.setUser(userCredential.user);
          return userCredential;
        } else {
          throw new Error("Please provide valid email and password.");
        }
      } catch (err) {
        authStore.clearAuth();
        if (err instanceof Error) {
          authStore.setError(err.message);
        }
        throw err; // Re-throw so caller can handle it
      }
    };
  
    const logoutUser = async () => {
      try {
        await signOut(firebase.auth);
        authStore.clearAuth();
        return true;
      } catch (err) {
        if (err instanceof Error) {
          authStore.setError(err.message);
        }
        throw err; // Re-throw so caller can handle it
      }
    };
  
    const getCurrentUser = () => {
      if (!firebase.auth) return null;
      return firebase.auth.currentUser;
    };
  
    return {
      sendPasswordReset,
      createUser,
      loginUser,
      logoutUser,
      getCurrentUser,
    };
  } catch (err) {
    console.error('Composable error (FirebaseAuth):', err);
    // Return null or throw error instead of undefined
    return null;
  }
};