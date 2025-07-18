export const onClickOutside = (
  target: Ref<HTMLElement | null>, 
  handler: (event: MouseEvent) => void
) => {
  const listener = (event: MouseEvent) => {
    // Check if target exists and if the click was outside of it
    if (target.value && !target.value.contains(event.target as Node)) {
      handler(event)
    }
  }

  onMounted(() => {
    document.addEventListener('click', listener, true)
  })

  onUnmounted(() => {
    document.removeEventListener('click', listener, true)
  })
}