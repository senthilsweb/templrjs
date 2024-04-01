import { defineNuxtConfig } from 'nuxt/config';
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  ssr: false,
  target: 'static',
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
    public: {
      API_BASE_URL: process.env.API_BASE_URL || '',//https://www.nathansweb.com
      CONFIG_BASE_URL: process.env.CONFIG_BASE_URL || 'ANY PUBLIC HTTP URL'
    },
  },
  extends: '@nuxthq/neo',
  modules: ['@nuxt/content', '@tailvue/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon', 'nuxt-lodash', '@nuxtjs/robots','@nuxtjs/mdc', '@nuxtjs/fontaine'],
  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight',
      }
    }
  },
  devtools: {
    enabled: true
  },
  content: {
    documentDriven: false,
    //highlight: {
    //theme: 'monokai'
    //},
  },
});
