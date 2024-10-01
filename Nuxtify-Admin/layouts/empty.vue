<template>
  <slot></slot>
</template>

<script setup lang="ts">
// 布局组件，负责主题初始化，也可能涉及主题切换
import { useTheme } from "vuetify";

const theme = useTheme(); // vuetify 的 theme 属性

// 服务端获取主题
const { data: res } = await useFetch<Setting>("setting");
if (res) {
  theme.global.name.value = res.value?.theme || "dark";
}

onMounted(() => {
  // 获取本地缓存的主题
  const themeCache = localStorage.getItem("theme");
  if (themeCache && themeCache != theme.global.name.value) {
    // 本地缓存主题不为空，则设置主题
    theme.global.name.value = themeCache;
  }
});
</script>

<style scoped></style>
