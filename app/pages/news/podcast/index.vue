<template>
  <div>
    <!-- Top Page -->
    <BaseLayoutPageSection margin="top">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="md:w-1/2 space-y-4">
          <p class="text-xl text-brand-main-text">
            {{ $t('news.podcast.top.paragraph') }}
          </p>
          
          <div class="flex items-center justify-center gap-2">
            <BaseUiAction new-page no-follow href="https://www.youtube.com/playlist?list=PLkDjBvgYc0nSsCsKdp-U38c6Iw2lY8F9l" title="Opens in a new Tab - YouTube playlist for Gridlock and Gridlines" styling="flex justify-center items-center px-4 py-2">
              {{ $t('news.podcast.top.button') }}
            </BaseUiAction>
          </div>
        </div>

        <div class="max-md:mt-6 md:w-1/2">
          <BaseYoutubeLite
            video-id="Uz2gEuVx3XQ"
            :title="$t('news.podcast.video.title')"
            aspect-ratio="16/9"
            class="w-full md:w-3/4 justify-self-center"
            poster="podcast"
            :has-shadow="false"
            image-loading="eager"
          />
        </div>

      </div>
    </BaseLayoutPageSection>

    <BaseLayoutPageCTA :has-button="false" :centered-text="false">
      <h2 class="text-2xl font-bold">{{ $t('news.podcast.featured.title') }}</h2>
      <PodcastFeatured
        v-if="featuredEpisode"
        :podcast="featuredEpisode"
        :playlist-url="playlistUrl"
      />
    </BaseLayoutPageCTA>

    <BaseLayoutPageSection margin="default">
      <h2 class="text-2xl font-bold text-brand-primary">{{ $t('news.podcast.posts.title') }}</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <PodcastPost
          v-for="podcast in sortedPodcasts"
          :key="podcast.id"
          :podcast="podcast"
          @watch="podcastModal?.open(podcast)"
        />
      </ul>
    </BaseLayoutPageSection>

    <PodcastVideoModal ref="podcastModal" />
  </div>
</template>

<script lang="ts" setup>
import podcasts from "~/data/podcasts.json"

definePageMeta({
  title: 'Gridlock & Gridlines Podcast by Golden Gate Manor Inc.',
  layout: 'default',
  breadcrumbLabel: 'Podcast',
  breadcrumbOverrides: [
    undefined,
    { label: 'Community', to: '/news/community' },
    undefined
  ]
})

const playlistUrl = "https://www.youtube.com/playlist?list=PLkDjBvgYc0nSsCsKdp-U38c6Iw2lY8F9l"

// const latestEpisode = computed(() => {
//   return [...podcasts].sort((a, b) => {
//     return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
//   })[0]
// })

const sortedPodcasts = computed(() => {
  return [...podcasts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
})

const featuredEpisode = computed(() => {
  const featured = podcasts.filter(p => p.featured)

  const source = featured.length ? featured : podcasts

  if (!source.length) return null

  const randomIndex = Math.floor(Math.random() * source.length)
  return source[randomIndex]
})

const podcastModal = ref()

</script>

<style>

</style>