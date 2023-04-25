import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'pathe';
import consola from 'consola';
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config

export default defineNuxtConfig({
  nitro: {},
  sourcemap: false,
  //theme: 'genesis', //Required for FormKit
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  /*
   ** Plugins to load before mounting the App
   */

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
    // Private config that is only available on the server
    GOOGLE_MAP_TOKEN: process.env.GOOGLE_MAP_TOKEN,
    // Config within public will be also exposed to the client
    public: {
      TEMPLRJS_BASE_URL: process.env.TEMPLRJS_BASE_URL,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_STORAGE_URL: process.env.SUPABASE_URL + '/storage/v1/object/public',
    },
  },
  modules: ['@nuxt/content', '@nuxtjs/supabase', '@tailvue/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon', '@nuxtlabs/github-module', '@nuxthq/studio', 'nuxt-lodash', '@sidebase/nuxt-pdf'],
  content: {
    documentDriven: true,
  },
  //extends: process.env.DOCUS_THEME_PATH || "@nuxt-themes/docus",
  extends: '@nuxt-themes/docus',
  // Define storage used in API routes with useStorage()
  nitro: {
    //Production storage uses cloudflare http kv
    storage: {
      cms: {
        driver: process.env.STORAGE_DRIVER || 'cloudflare-kv-http',
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '4ab70cb705b6c844de6565161cd09b11',
        namespaceId: process.env.CLOUDFLARE_NAMESPACE_ID || '34a3c98ce2a54164ae258f365fdd5c46',
        email: process.env.CLOUDFLARE_EMAIL || 'nathansweb@icloud.com',
        apiKey: process.env.CLOUDFLARE_API_KEY || '11d03bdf02f6e55d539ac8bbcd7bc439da5e1',
      },
    },
    // Overwrite cms storage in development using FS. "cms" refers to the physical folder inside .data
    devStorage: {
      cms: {
        driver: process.env.STORAGE_DRIVER || 'cloudflare-kv-http',
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '4ab70cb705b6c844de6565161cd09b11',
        namespaceId: process.env.CLOUDFLARE_NAMESPACE_ID || '34a3c98ce2a54164ae258f365fdd5c46',
        email: process.env.CLOUDFLARE_EMAIL || 'nathansweb@icloud.com',
        apiKey: process.env.CLOUDFLARE_API_KEY || '11d03bdf02f6e55d539ac8bbcd7bc439da5e1',
      },
    },
  },
});
