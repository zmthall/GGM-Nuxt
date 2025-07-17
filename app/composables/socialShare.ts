// composables/useSocialShare.js
export const useSocialShare = () => {
  const shareOnFacebook = () => {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const cleanUrl = `${runtimeConfig.public.siteUrl}${route.fullPath}`;
    const encodedUrl = encodeURIComponent(cleanUrl);
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;

    console.log('Page URL: ', runtimeConfig.public.siteUrl)
    console.log('Route Pathname: ', route.fullPath)

    console.log('Encoded URL: ', encodedUrl)
    console.log('Facebook URL: ', facebookUrl)
    // window.open(facebookUrl, '_blank', 'width=600,height=400');
  };


  return {
    shareOnFacebook
  };
};