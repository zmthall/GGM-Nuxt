// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  site: {
    name: 'Golden Gate Manor',
    url: 'https://goldengatemanor.com',
    description: 'Medicaid-approved NEMT, assisted living & medical supplies in Southern Colorado.'
  },
  css: ["./assets/css/main.css"],
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
  nitro: {
    compressPublicAssets: true,
  },
  vite: {
    build: {
      cssCodeSplit: false,   // roll all CSS into a single entry.css
    }
  },
  routeRules: {
    // Contact / resources
    '/contact-us/schedule-a-ride': { redirect: { to: '/resources/schedule-a-ride', statusCode: 308 } },
    '/schedule-a-ride': { redirect: { to: '/resources/schedule-a-ride', statusCode: 308 }},
    '/contact-us': { redirect: { to: '/company/contact-us', statusCode: 308 } },
    '/contactus': { redirect: { to: '/company/contact-us', statusCode: 308 }},
    '/contacts': { redirect: { to: '/company/contact-us', statusCode: 308 }},

    // Transportation
    '/non-medical-transportation':  { redirect: { to: '/non-medical', statusCode: 308 } },
    '/non-medical-transportation/': { redirect: { to: '/non-medical', statusCode: 308 } },

    '/nemt-transportation':  { redirect: { to: '/nemt', statusCode: 308 } },
    '/nemt-transportation/': { redirect: { to: '/nemt', statusCode: 308 } },

    // Company / About
    '/about-us': { redirect: { to: '/company/about-us', statusCode: 308 } },
    '/about': { redirect: { to: '/company/about-us', statusCode: 308 } },
    '/about-us/employment': { redirect: { to: '/company/employment', statusCode: 308 } },

    // Preserve any query like ?select=general automatically by NOT hardcoding a query here
    '/about-us/employment/apply': { redirect: { to: '/company/employment/apply', statusCode: 308 } },

    // News / Community / Location
    '/about-us/community': { redirect: { to: '/news/community', statusCode: 308 } },
    '/about-us/location':  { redirect: { to: '/company/location', statusCode: 308 } },

    // Old "home"
    '/home': { redirect: { to: '/', statusCode: 308 } },

    // Policy Pages
    '/accessibility': { redirect: { to: '/company/policies/accessibility', statusCode: 308 }},
    '/termsandconditions': { redirect: { to: '/company/policies/terms-and-conditions', statusCode: 308 }},
    '/privacy-policy': { redirect: { to: '/company/policies/privacy', statusCode: 308 }},
    '/privacypolicy': { redirect: { to: '/company/policies/privacy', statusCode: 308 }},

    // Caching
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    },
    // dev domain shows /assets/* — cover that too
    '/assets/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    },
    // your fonts
    '/fonts/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    },
    // static images (if versioned or rarely change)
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    }
  },
  runtimeConfig: {
    apiKey: process.env.API_KEY,
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        services: {
          auth: true,
        },
      },
      googleMapsKey: process.env.GMAPS_KEY,
      siteUrl: process.env.SITE_URL,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
      microsoftUetId: process.env.MICROSOFT_UET_ID
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
      ],
    },
  },
  sitemap: {
    sitemaps: {
      'sitemap-main': {
        exclude: ['/admin/**', '/news/blog/**'],
        includeAppSources: true,
      },
      'sitemap-blog': {
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
  robots: process.env.BUILD_TYPE === 'DEV' ? { groups: [ { userAgent: '*', disallow: ['/'] } ] } : {
    blockNonSeoBots: false,          // turn off built-in to prevent dupes
    disallow: ['/admin'],
    groups: [
      { userAgent: ['GPTBot','PerplexityBot','CCBot','ClaudeBot'], allow: '/' },
      { userAgent: ['Googlebot','bingbot','Applebot','DuckDuckBot'], allow: '/' },

      // your custom denylist (only once)
      { userAgent: ['python-requests','curl','Wget','libwww','Scrapy','Go-http-client','Java','okhttp','PHP'], disallow: ['/'] },
      { userAgent: ['CazoodleBot','PetalBot','Bytespider','DataForSeoBot','ZoominfoBot','BLEXBot','magpie-crawler','Riddler'], disallow: ['/'] },
      { userAgent: ['ia_archiver','GrapeshotCrawler','adscanner','CensysInspect'], disallow: ['/'] },
    ],
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
    format: ['webp','avif','jpeg'],
    quality: 68,
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
    ipx: {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    domains: ['i.ytimg.com']
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
