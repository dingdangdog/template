<script setup lang="ts">
const logout = () => {
  doApi.get("api/admin/logout").then(() => {
    Alert.success("Logout success");
    navigateTo("/admin/login");
  });
};
const miniWindow = ref(false);
const menuer = ref(false);
onMounted(() => {
  miniWindow.value = window.innerWidth < 1280;
  menuer.value = !miniWindow.value;
});

const toHome = () => {
  navigateTo("/admin/home");
};

type Menu = {
  title: string;
  icon?: string;
  path?: string;
  children?: Menu[];
};

const openMenu = ref<string>("orders");

const items = ref<Menu[]>([
  // { title: "Overview", path: "home", icon: "mdi-home-analytics" },
  { title: "主站", path: "website", icon: "mdi-home-circle" },
  {
    title: "业务数据",
    children: [
      { title: "用户", path: "users", icon: "mdi-account" },
      {
        title: "账本",
        path: "books",
        icon: "mdi-order-numeric-ascending ",
      },
    ],
  },
  {
    title: "系统管理",
    children: [{ title: "系统设置", path: "settings", icon: "mdi-cog" }],
  },
]);

const toPath = (menu: Menu) => {
  if (menu.path == "website") {
    window.open(`/`, "_blank");
    return;
  }

  openMenu.value = menu.path || "home";
  navigateTo({ path: `/admin/${openMenu.value}` });
};
</script>

<template>
  <Head>
    <Title>MyNuxt - 管理系统</Title>
    <!-- <Link rel="icon" type="image/x-icon" href="/favicon.png" /> -->
  </Head>
  <v-layout class="" id="admin-container">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="miniWindow"
          @click="menuer = !menuer"
        ></v-app-bar-nav-icon>
      </template>
      <v-btn icon @click="toHome">
        <img
          src="/favicon.ico"
          height="40"
          class="tw-rounded-full tw-overflow-hidden"
          alt="logo"
        />
      </v-btn>
      <v-app-bar-title>MyNuxt - 管理系统</v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <img
              src="/favicon.ico"
              height="40"
              class="tw-rounded-full tw-overflow-hidden"
              alt="logo"
            />
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="tw-cursor-pointer" @click="logout">
            Logout
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="menuer" location="left" :width="200">
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="toPath(item)"
          class="tw-cursor-pointer hover:tw-bg-gray-500/20"
          :class="openMenu == item.path ? 'selected-menu' : ''"
        >
          <!-- 一级菜单 -->
          <v-list-item-title v-if="!item.children">
            <v-icon class="menu-icon" :icon="item.icon"></v-icon>
            <span>{{ item.title }}</span>
          </v-list-item-title>

          <!-- 有下级，则形成菜单组，显示二级菜单 -->
          <v-list-group :value="item.title" v-else>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="item.title"> </v-list-item>
            </template>

            <v-list-item
              v-for="(child, i2) in item.children"
              :key="i2"
              @click="toPath(child)"
              class="tw-cursor-pointer hover:tw-bg-gray-500/20"
              :class="openMenu == item.path ? 'selected-menu' : ''"
            >
              <v-list-item-title>
                <v-icon class="menu-icon" :icon="child.icon"></v-icon>
                <span>{{ child.title }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item>
      </v-list>
      <v-btn style="position: absolute; bottom: 0; width: 100%">
        <v-icon icon="mdi-code-tags"></v-icon>
      </v-btn>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
    <GlobalAlert />
    <GlobalConfirm />
  </v-layout>
</template>

<style>
.admin-page-container {
  padding: 0.5rem;
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>

<style scoped>
#admin-container {
  border-radius: 0 !important;
  background-color: rgb(47, 47, 47) !important;
}

.v-main {
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  background-color: rgb(47, 47, 47) !important;
}

.menu-icon {
  margin: 0 0.5rem;
}

.selected-menu {
  background: rgba(106, 102, 102, 0.3);
}
</style>
