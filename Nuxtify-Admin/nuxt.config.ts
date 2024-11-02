// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-09-28",
  devtools: { enabled: true },
  $development: {},
  $production: {},
  css: ["~/assets/css/base.css"],
  build: {
    // transpile: ["vuetify"],
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "",
    domain: "",
    admin: "admin", // 默认账号
    adminPass: "admin", // 默认密码
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
      authKey: "Authorization",
    },
  },
  echarts: {
    features: ["LabelLayout", "UniversalTransition"],
    charts: ["BarChart", "LineChart", "PieChart"],
    components: [
      "DatasetComponent",
      "GridComponent",
      "TooltipComponent",
      "LegendComponent",
      "ToolboxComponent",
      "DataZoomComponent",
    ],
  },
  devServer: {
    port: 30000,
  },
  nitro: {
    experimental: {
      database: true,
    },
  },
  modules: [
    "@nuxtjs/i18n",
    "vuetify-nuxt-module",
    "@nuxtjs/tailwindcss",
    "nuxt-echarts",
  ],
  i18n: {
    // strategy: "prefix_except_default",
    strategy: "no_prefix",
    defaultLocale: "en",
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
      redirectOn: "root", // recommended
    },
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {},
  },
  vite: {},
});
