// composables/useSocialShare.js
export const useSocialShare = () => {
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();

  const copyLink = () => {
      const cleanUrl = `${runtimeConfig.public.siteUrl}${route.path}`;
  
      navigator.clipboard?.writeText(cleanUrl);
  };

  const shareOnFacebook = () => {
    const cleanUrl = `${runtimeConfig.public.siteUrl}${route.fullPath}`;
    const encodedUrl = encodeURIComponent(cleanUrl);
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const cleanUrl = `${runtimeConfig.public.siteUrl}${route.path}`;
    const encodedUrl = encodeURIComponent(cleanUrl);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const cleanUrl = `${runtimeConfig.public.siteUrl}${route.path}`;
    const encodedUrl = encodeURIComponent(cleanUrl);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareOnReddit = () => {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const cleanUrl = `${runtimeConfig.public.siteUrl}${route.path}`;
    const encodedUrl = encodeURIComponent(cleanUrl);
    const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}`;
    window.open(redditUrl, '_blank', 'width=600,height=400');
  };

  const shareOnPinterest = () => {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const cleanUrl = `${runtimeConfig.public.siteUrl}${route.path}`;
    const encodedUrl = encodeURIComponent(cleanUrl);
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}`;
    window.open(pinterestUrl, '_blank', 'width=600,height=400');
  };

  const shareViaEmail = () => {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const cleanUrl = `${runtimeConfig.public.siteUrl}${route.path}`;
    const subject = encodeURIComponent('Check out this blog post');
    const body = encodeURIComponent(`I thought you might find this interesting: ${cleanUrl}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  return {
    copyLink,
    shareOnFacebook,
    shareOnTwitter,
    shareOnLinkedIn,
    shareViaEmail,
    shareOnReddit,
    shareOnPinterest
  };
};