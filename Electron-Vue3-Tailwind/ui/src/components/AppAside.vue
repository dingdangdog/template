<template>
  <div class="h-full flex flex-col justify-between">
    <div>
      <div
        v-for="menu in menus"
        :key="menu.code"
        @click="goPage(menu.code)"
        class="flex items-center p-2 hover:bg-gray-700 duration-300 cursor-pointer"
        :class="activeMenu == menu.code ? 'bg-gray-800' : ''"
      >
        <div class="p-1">
          <div class="w-5 h-5 z-10">
            <component :is="getIcon(menu.icon)" />
          </div>
        </div>
        <div v-show="menuOpen" class="px-2" :class="menuOpen ? 'min-w-24' : ''">
          {{ menu.name }}
        </div>
      </div>
    </div>
    <!-- <div
      class="w-full flex justify-center hover:bg-gray-800 cursor-pointer duration-300"
      @click="menuOpen = !menuOpen"
    >
      <div class="w-8 h-8">
        <IconMenu />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";

import IconMicrophone from "@/components/icon/microphone.vue";
import IconCog from "@/components/icon/cog.vue";
import IconAccount from "@/components/icon/account.vue";
import IconWifi from "@/components/icon/wifi.vue";

const getIcon = (icon: string) => {
  switch (icon) {
    case "IconMicrophone":
      return IconMicrophone;
    case "IconCog":
      return IconCog;
    case "IconAccount":
      return IconAccount;
    case "IconWifi":
      return IconWifi;
    default:
      return IconCog;
  }
};

const activeMenu = ref("oldmoon");
const menuOpen = ref(true);

const menus = [
  {
    code: "index",
    name: "语音转换",
    icon: "IconMicrophone",
  },
  {
    code: "local",
    name: "本地开放",
    icon: "IconWifi",
  },
  {
    code: "setting",
    name: "系统设置",
    icon: "IconCog",
  },
  {
    code: "account",
    name: "账户管理",
    icon: "IconAccount",
  },
];

const goPage = (code: string) => {
  activeMenu.value = code;
  // navigateTo("/" + code);
  router.push({ path: "/" + code });
};
</script>

<style scoped></style>
