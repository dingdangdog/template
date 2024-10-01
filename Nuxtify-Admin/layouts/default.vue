<template>
  <Head>
    <Title>{{ res?.title }}</Title>
    <Link rel="icon" type="image/x-icon" :href="res?.icon" />
    <Meta name="description" :content="res?.description" />
    <Meta name="keywords" :content="res?.keyword" />
  </Head>
  <v-layout>
    <v-app-bar :elevation="2">
      <template v-slot:prepend> </template>
      <v-app-bar-title>
        <!-- 导航菜单 -->
        Nuxtify-Admin
      </v-app-bar-title>
      <template v-slot:append>
        <v-icon
          class="m-2"
          size="large"
          :icon="themeValue ? 'mdi-emoticon-cool-outline' : 'mdi-weather-night'"
          :color="themeValue ? 'warning' : 'white'"
          @click="toggleTheme()"
        ></v-icon>
      </template>
    </v-app-bar>
    <v-main>
      <div id="home-main">
        <slot></slot>
      </div>
      <v-footer class="py-4">
        <div class="text-center" style="width: 100%">
          <div></div>
          <p>
            {{ new Date().getFullYear() }} —
            <strong>Nuxtify-Admin</strong>
          </p>
        </div>
      </v-footer>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
// 布局组件，负责主题初始化，也可能涉及主题切换
import { useTheme } from "vuetify";

const theme = useTheme(); // vuetify 的 theme 属性
const themeValue = ref(false); // 根据theme控制switch开关的变量

// 获取系统配置
const { data: res } = await useFetch<Setting>("/setting");
if (res) {
  theme.global.name.value = res.value?.theme || "dark";
}
// 切换主题
const toggleTheme = () => {
  themeValue.value = !themeValue.value;
  const to = themeValue.value ? "light" : "dark";
  theme.global.name.value = to;
  localStorage.setItem("theme", to);
};

onMounted(() => {
  // 本地缓存获取主题
  const themeCache = localStorage.getItem("theme"); // 获取本地缓存的主题
  if (themeCache && themeCache != theme.global.name.value) {
    // 本地缓存主题不为空，则设置主题
    theme.global.name.value = themeCache;
  }

  if (theme.global.name.value == "light") {
    themeValue.value = true;
  }
});
</script>

<style>
#home-main {
  min-height: 100vh;
}
</style>
