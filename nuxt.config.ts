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
      TEMPLRJS_CONFIG_ROOT_PATH:process.env.TEMPLRJS_CONFIG_ROOT_PATH || '',
      SUPABASE_URL: process.env.SUPABASE_URL || 'https://lztihcjfpbpkrcdtwsxg.supabase.co',
      SUPABASE_KEY: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dGloY2pmcGJwa3JjZHR3c3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcyMjA1NzIsImV4cCI6MTk4Mjc5NjU3Mn0.eNqEj4UODjXnw6DFKKwT4aXGg3drWu3WSOxhD3Y0GcY'}
  },
  modules: [
    "@nuxt/content",
    "@tailvue/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-lodash",
    "@nuxtjs/robots",
    "@pinia/nuxt",
    "@nuxtjs/mdc",
    "@nuxtjs/fontaine",
    '@nuxtjs/supabase',
  ],
  mdc: {
    highlight: {
      langs: ['javascript', 'css', 'html', 'sql','bash','go','json','yaml','properties','dockerfile'],
      themes: [
        'github-dark',
        'vitesse-light',
      ]
    }
  },
  devtools: {
    enabled: false,
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml','sql','javascript'
      ]
    }
  },
  //extends: '@nuxt-themes/docus',
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/','/signup','/forgotpassword','/cms/*','/blog*','/resume*'],
      cookieRedirect: false,
    },
  },
});
