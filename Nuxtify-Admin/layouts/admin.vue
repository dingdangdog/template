<template>
  <Head>
    <Title>Nuxtify Admin - oldmoon.top</Title>
    <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
  </Head>
  <v-layout class="rounded-md" id="admin-container">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="miniWindow"
          @click="showMenu = !showMenu"
        ></v-app-bar-nav-icon>
      </template>
      <v-btn icon @click="toHome">
        <img src="/favicon.ico" height="40" alt="logo" />
      </v-btn>
      <v-app-bar-title>Nuxtify Admin</v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <img src="/favicon.ico" height="40" alt="logo" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="cursor-pointer" @click="logout">
            Logout
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="showMenu" location="left" :width="200">
      <AdminMenu />
    </v-navigation-drawer>

    <v-main>
      <div id="admin-main">
        <slot></slot>
      </div>
      <GlobalAlert />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { successAlert } from "~/utils/alert";
import { toLogin } from "~/utils/admin/common";
import { signOut } from "~/utils/admin/api.auth";

const toHome = () => {
  navigateTo("/admin/");
};

const logout = () => {
  signOut().then(() => {
    successAlert("Logout success");
    toLogin();
  });
};
// 用于判断是否时小屏幕
const miniWindow = ref(false);
// 用于判断是否折叠/显示菜单
const showMenu = ref(false);

// 布局组件，负责主题初始化，也可能涉及主题切换
import { useTheme } from "vuetify";

const theme = useTheme(); // vuetify 的 theme 属性

// 服务端获取主题
const { data: res } = await useFetch<Setting>("setting");
if (res) {
  theme.global.name.value = res.value?.theme || "dark";
}

onMounted(() => {
  miniWindow.value = window.innerWidth < 1280;
  showMenu.value = !miniWindow.value;
  window.addEventListener("resize", () => {
    miniWindow.value = window.innerWidth < 1280;
    showMenu.value = !miniWindow.value;
  });

  // 获取本地缓存的主题
  const themeCache = localStorage.getItem("theme");
  if (themeCache && themeCache != theme.global.name.value) {
    // 本地缓存主题不为空，则设置主题
    theme.global.name.value = themeCache;
  }
});
</script>

<style>
@import url("@/assets/css/admin.css");
</style>
