import { useThemeStore } from "~~/app/stores/theme";

export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore();
  void themeStore.initTheme();
});

