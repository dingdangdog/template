import { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  ssr: true,
  devtools: { enabled: true },
  css: ["~/assets/css/base.css"],
  runtimeConfig: {
    public: {},
    authSecret: "",
    authOrigin: "", // 即 NUXT_AUTH_ORIGIN，权限框架使用
    adminSecret: "",
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
    "nuxt-echarts",
    "@sidebase/nuxt-auth",
    "@prisma/nuxt",
  ],

  auth: {
    // 重要提示：请修改 baseURL 值为你的正式服务地址
    baseURL:
      process.env.NUXT_AUTH_ORIGIN || "https://mynuxt.oldmoon.top/api/auth",
    // globalAppMiddleware: false,
    // originEnvKey: "NUXT_AUTH_ORIGIN",
    provider: {
      type: "authjs",
      trustHost: false,
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: true,
    },
  },
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
  // 动态引入echars图表
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
  tailwindcss: {
    config: {
      prefix: "tw-",
    },
  },
  vuetify: {
    moduleOptions: {
      ssrClientHints: {},
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: "dark",
        themes: {},
      },
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
