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
    // '@nuxt/scripts',
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
      googleMapsKey: process.env.GMAPS_KEY,
      siteUrl: process.env.SITE_URL,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  },
  typescript: {
    // ensures TS sees the Google Maps ambient types
    tsConfig: { compilerOptions: { types: ['google.maps'] } }
  },
  app: {
    buildAssetsDir: "assets",
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png' // 180x180px
        }
      ],
      meta: [
        {
          name: 'theme-color',
          content: '#121f75'
        }
      ]
    },
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
        exclude: ['/news/blog/post']
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
  },
  seo: {
    meta: {
      viewport: {
        width: 'device-width',
        initialScale: 1,
        userScalable: 'yes'
      }
    }
  },
  image: {
    provider: 'ipx',
    format: ['webp'], // Fallback chain
    ipx: {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 4, // include h3 headings
        }
      }
    }
  }
})
