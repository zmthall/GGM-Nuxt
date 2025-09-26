export const useRouting = () => {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      // fallback if no history (e.g. direct 404 visit)
      navigateTo('/')
    }
  }

  const goBackAdmin = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      // fallback if no history (e.g. direct 404 visit)
      navigateTo('/admin')
    }
  }

  return {
    goBack,
    goBackAdmin
  }
}
