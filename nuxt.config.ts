import { defineNuxtConfig } from "nuxt/config";
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  //ssr: false,
  //sourcemap: false,
  tailwindcss: {
    configPath: "tailwind.config",
    exposeConfig: false,
    config: {},
    viewer: true,
  },
  cssPath: [
    "~/assets/css/tailwind.css",
    { injectPosition: 0 }
  ],
  routeRules: {
    // Static page generated on-demand once
    //'/': { static: true },
  },
  router: {},
  build: {
    transpile: ["@heroicons/vue", "primevue"],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  buildModules: [
    "@nuxt/postcss8",
    // ...
  ],
  runtimeConfig: {
    public: {
      LOGO_WEB: process.env.LOGO_WEB || 'logo.svg',
      LOGO_mobile: process.env.LOGO_WEB || 'logo.svg',
      DUCKDB_DATA_API_BASE_PATH: process.env.DUCKDB_DATA_API_BASE_PATH || 'https://duckdb-data-api.vercel.app',
      API_BASE_URL: process.env.API_BASE_URL || '',//https://www.nathansweb.com
      CONFIG_BASE_URL: process.env.CONFIG_BASE_URL || 'ANY PUBLIC HTTP URL',
      CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL || '',
      CLOUDINARY_PUBLIC_ID: process.env.CLOUDINARY_PUBLIC_ID || '',
      TEMPLRJS_CONFIG_ROOT_PATH:process.env.TEMPLRJS_CONFIG_ROOT_PATH || ''
    },
  },
  modules: [
    "@nuxt/content",
    "@tailvue/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-lodash",
    "@nuxtjs/robots",
    "@pinia/nuxt"
  ],
  mdc: {
    highlight: {
      theme: {
        default: "vitesse-light",
        dark: "material-theme-palenight",
      },
    },
  },
  devtools: {
    enabled: false,
  },
  content: {
    documentDriven: false,
  }
});
