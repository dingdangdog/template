import { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  ssr: true,
  devtools: { enabled: true },
  css: ["~/assets/css/base.css"],
  runtimeConfig: {
    public: {},
    adminUsername: "",
    adminPassword: "",
  },

  devServer: {
    port: 12345,
  },
  nitro: {
    // routeRules: {
    //   "/api/**": { swr: true },
    // },
  },
  modules: [
    "@nuxtjs/i18n",
    "vuetify-nuxt-module",
    "@nuxtjs/tailwindcss",
    "@prisma/nuxt",
  ],

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "zh",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "zh",
        name: "简体中文",
      },
    ],
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  tailwindcss: {
    config: {
      prefix: "tw-",
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
