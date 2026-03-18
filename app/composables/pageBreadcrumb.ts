type BreadcrumbOverrideItem = {
  label: string
  to?: string
  href?: string
  [key: string]: unknown
}

type BreadcrumbConfig = {
  overrides?: Array<BreadcrumbOverrideItem | false | undefined>
  hideRoot?: boolean
  hideCurrent?: boolean
}

export const usePageBreadcrumb = () => {
  const route = useRoute()

  const breadcrumbRoutePath = useState<string | null>('page-breadcrumb-route-path', () => null)
  const breadcrumbOverrides = useState<Array<BreadcrumbOverrideItem | false | undefined>>('page-breadcrumb-overrides', () => [])
  const breadcrumbHideRoot = useState<boolean>('page-breadcrumb-hide-root', () => false)
  const breadcrumbHideCurrent = useState<boolean>('page-breadcrumb-hide-current', () => false)

  const setBreadcrumbConfig = (config: BreadcrumbConfig) => {
    breadcrumbRoutePath.value = route.path
    breadcrumbOverrides.value = config.overrides ?? []
    breadcrumbHideRoot.value = config.hideRoot ?? false
    breadcrumbHideCurrent.value = config.hideCurrent ?? false
  }

  const clearBreadcrumbConfig = () => {
    if (breadcrumbRoutePath.value === route.path) {
      breadcrumbRoutePath.value = null
      breadcrumbOverrides.value = []
      breadcrumbHideRoot.value = false
      breadcrumbHideCurrent.value = false
    }
  }

  const activeBreadcrumbConfig = computed(() => {
    if (breadcrumbRoutePath.value !== route.path) {
      return {
        overrides: [] as Array<BreadcrumbOverrideItem | false | undefined>,
        hideRoot: false,
        hideCurrent: false
      }
    }

    return {
      overrides: breadcrumbOverrides.value,
      hideRoot: breadcrumbHideRoot.value,
      hideCurrent: breadcrumbHideCurrent.value
    }
  })

  return {
    setBreadcrumbConfig,
    clearBreadcrumbConfig,
    activeBreadcrumbConfig
  }
}