<template>
  <template v-if="showVariant">
    <BaseUiBreadCrumbCTA
      v-if="chosen === 'breadcrumb'"
      :href="MED_URL"
      @ab-test-click="trackCTA('breadcrumb')"
    >
      Visit Our City Cab Website
    </BaseUiBreadCrumbCTA>

    <div v-if="chosen === 'under-image'" class="flex justify-center">
      <BaseUiAction
        :href="withUtm(MED_URL, 'under-image')"
        :ab-button="true"
        title="Opens in new tab"
        :new-page="true"
        class="group"
        styling="flex items-center py-2 px-4"
        @ab-test-click="trackCTA('under-image')"
      >
        <BaseIcon
          name="stash:new-window-page"
          size="size-6"
          color="text-brand-secondary"
          hover-color="group-hover:text-brand-primary"
          class="transition-colors ease-in-out duration-500"
        />
        <div>Visit Our City Cab Website</div>
      </BaseUiAction>
    </div>
  </template>
</template>

<script lang="ts" setup>
type CtaVariant = 'breadcrumb' | 'under-image';

const EVENT = 'citycab_ab_button_click'

const props = defineProps<{ abValue: CtaVariant }>();

const MED_URL = 'https://pueblocitycab.com';

/** Single source of truth for the chosen variant (shared across instances) */
function useABVariant(key: string, variants: CtaVariant[]) {
  const k = `ab:${key}`;
  // useState is global-per-route in Nuxt; initialize empty to avoid SSR mismatch
  const chosen = useState<CtaVariant | ''>(k, () => '');

  onMounted(() => {
    const saved = localStorage.getItem(k) as CtaVariant | null;
    if (saved) {
      chosen.value = saved;
      return;
    }
    const v = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(k, v as string);
    chosen.value = v as CtaVariant;
  });

  return chosen;
}

const chosenRef = useABVariant('city-cab', ['breadcrumb', 'under-image']);
const chosen = computed(() => chosenRef.value); // for template simplicity

/** Build URL with UTM tags */
function withUtm(baseUrl: string, variant: CtaVariant) {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', 'ggm');
  url.searchParams.set('utm_medium', 'site');
  url.searchParams.set('utm_campaign', 'city_cab_cta');
  url.searchParams.set('utm_content', String(variant));
  return url.toString();
}

/** Click tracking (matches your global typings) */
function trackCTA(variant: CtaVariant) {
  const params: Record<string, unknown> = {
    event: EVENT,
    location: variant,
    event_category: 'CTA',
    event_label: `city_cab_${variant}`,
  };

  // GTM
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(params as unknown as DataLayerEvent);
  }

  // GA4 (add beacon transport to reduce drop-offs on outbound nav)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const gaParams: Record<string, unknown> = { location: variant, transport_type: 'beacon' };
    window.gtag('event', EVENT, gaParams);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', EVENT, { location: variant });
  }

  // Microsoft UET (array or object queue)
  if (typeof window !== 'undefined' && window.uetq) {
    const u = window.uetq;
    const uetParams = { location: variant };
    if (Array.isArray(u)) u.push(['event', EVENT, uetParams]);
    else if (typeof u.push === 'function')
      u.push(['event', EVENT, uetParams] as unknown as UetEventTuple);
  }
}

/** Only render the instance that matches the assigned variant */
const showVariant = computed(() => chosen.value === props.abValue);
</script>
