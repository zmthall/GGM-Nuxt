// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  css: ["./assets/css/main.css", "flatpickr/dist/flatpickr.min.css"],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/robots'
  ],
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        services: {
          auth: true, // Just as example. Can be any other service.
        },
      },
      siteUrl: process.env.SITE_URL || 'http://localhost'
    }
  },
  app: {
    buildAssetsDir: "assets",
  },
  sitemap: {
    sitemaps: {
      ['sitemap-main']: {
        exclude: ['/admin/**', '/news/blog/**'],
        includeAppSources: true,
      },
      ['sitemap-blog']: {
        includeAppSources: true,
        sources: ['/api/sitemap-blog'],
        include: ['/news/blog/**'],
      }
    },
    autoLastmod: true,
    xslColumns: [
      { label: 'URL', width: '75%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
    ],
    xslTips: false,
  },
  robots: {
    blockNonSeoBots: true,
    disallow: ['/admin'],
  }
})