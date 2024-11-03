import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// 读取环境变量
const env = loadEnv("", process.cwd());
// https://vite.dev/config/
export default defineConfig({
  base: env.NODE_ENV == "development" ? "/" : "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
