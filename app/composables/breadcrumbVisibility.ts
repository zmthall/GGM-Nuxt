export const useBreadcrumbVisibility = () => {
  return useState<boolean | null>('breadcrumb-visibility-override', () => null)
}