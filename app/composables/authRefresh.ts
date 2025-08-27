// composables/useAuthRefresh.ts
export const useAuthRefresh = () => {
  const { $firebase } = useNuxtApp();
  const authStore = useAuthStore();

  const refreshUser = async () => {
    if ($firebase?.auth?.currentUser) {
      await $firebase.auth.currentUser.reload();
      authStore.setUser($firebase.auth.currentUser);
    }
  };

  return { refreshUser };
};