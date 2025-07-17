<template>
  <div class="md:grid md:grid-cols-15 md:max-w-[1500px] md:mx-auto">
    <BaseLayoutPageSection margin="top" class="col-span-11 space-y-4">
        <div>
          <h2 class="text-2xl font-bold text-brand-primary">
            {{ post?.title }}
          </h2>
          <time v-if="post?.date" :datetime="formatDates.formatDatetime(post.date)">
            Posted On: {{ formatDates.formatDisplayDate(post.date) }}
          </time>
          <p v-if="post?.author">By: {{ post.author }}</p>
          <div v-if="post?.tags" class="md:hidden">
          <span v-if="post.tags.length" class="flex gap-2 items-center">
            <h3>Tags:</h3>
            <span v-for="tag in post.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg hover:bg-brand-secondary hover:text-brand-primary transition-colors ease-in-out duration-500">
              {{ tag }}
            </span>
          </span>
        </div>
        </div>
        <div class="w-full overflow-hidden rounded-lg md:hidden">
          <NuxtImg 
            :src="post?.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
            :alt="post?.thumbnailAlt || post?.title" 
            :title="post?.thumbnailAlt || post?.title" 
            loading="eager" 
            sizes="sm:100vw md:50vw lg:400px"
            class="object-cover w-full h-full" 
          />        
        </div>
        <ContentRenderer v-if="post" :value="post" class="prose prose-lg space-y-2 text-xl text-brand-main-text" />
        <div class="md:hidden">
          <!-- Social icons to share page -->
          <BlogPostSocialShare />
        </div>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="top" class="col-span-4 max-md:hidden">
      <aside class="space-y-4">
        <div class="w-full max-h-[400px] h-max overflow-hidden rounded-lg">
          <NuxtImg 
            :src="post?.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
            :alt="post?.thumbnailAlt || post?.title" 
            :title="post?.thumbnailAlt || post?.title" 
            loading="eager" 
            sizes="sm:100vw md:50vw lg:400px"
            class="border-4 border-zinc-200 p-4 object-cover w-full h-full" 
          />        
        </div>
        <div v-if="post?.tags">
          <span v-if="post.tags.length" class="flex gap-2 items-center">
            <h3>Tags:</h3>
            <span v-for="tag in post.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg hover:bg-brand-secondary hover:text-brand-primary transition-colors ease-in-out duration-500">
              {{ tag }}
            </span>
          </span>
        </div>
        <div>
          <!-- Social icons to share page -->
          <BlogPostSocialShare is-aside/>
        </div>
      </aside>
    </BaseLayoutPageSection>
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from '../../../../composables/dates/dateFormat';

const route = useRoute();
const formatDates = useDateFormat();

// Get the slug from the URL
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join("/") 
  : route.params.slug;

// Build the content path
const contentPath = `/blog/post/${slug}`;

// Fetch the specific post
const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection("blog").path(contentPath).first()
);

// Handle 404 if post doesn't exist
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  });
}

// Handle 404 if post is still a draft
if(post.value.draft) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

// Use the blog-post layout
definePageMeta({
  layout: 'blog-post',
  breadcrumbLabel: 'Blog Posts'
});

// SEO
const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: `${post.value.title} | Golden Gate Manor Blog`,
  ogTitle: `${post.value.title} | Golden Gate Manor Blog`,
  description: post.value.description,
  ogDescription: post.value.description,
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: `${post.value.title} | Golden Gate Manor Blog`,
  twitterDescription: post.value.description,
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})
</script>

<style></style>