import { defineNuxtConfig } from 'nuxt/config';
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  sourcemap: false,
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  routeRules: {
    // Static page generated on-demand once
    //'/': { static: true },
  },
  router: {},
  build: {
    transpile: ['@heroicons/vue', 'primevue'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  buildModules: [
    '@nuxt/postcss8',
    // ...
  ],
  alias: {
    //Un-comment this for vercel deployment
    //pinia: process.env.NODE_ENV === 'production' ? '/node_modules/pinia/dist/pinia.mjs' : '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    
  },
  runtimeConfig: {
    GOOGLE_MAP_TOKEN: process.env.GOOGLE_MAP_TOKEN,
    // Config within public will be also exposed to the client
    public: {
      //BASE_URL: process.env.MONGODB_ATLAS_REST_URL,
      SUPABASE_URL: process.env.SUPABASE_URL || 'http://your-supabase-url',
      SUPABASE_STORAGE_URL: process.env.SUPABASE_URL + '/storage/v1/object/public',
    },
  },
  modules: [ '@nuxt/content','@nuxtjs/supabase', '@tailvue/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon',  'nuxt-lodash',  
  '@nuxtjs/robots','@nuxtjs/fontaine'],
  content: {
    documentDriven: true,
     highlight: {
      theme: 'dracula',
    },
  },
  //extends: process.env.DOCUS_THEME_PATH || "@nuxt-themes/docus",
  // Define storage used in API routes with useStorage()
});
