<template>
  <div>
    <v-list>
      <v-list-item
        class="menu"
        v-for="item in items"
        :key="item.title"
        :class="item.path == openMenu ? 'open-menu' : ''"
      >
        <!-- 有下级，则形成菜单组，显示二级菜单 -->
        <v-list-group :value="item.title" v-if="item.haveChildren">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="item.title"> </v-list-item>
          </template>

          <v-list-item
            class="menu"
            v-for="(child, i2) in item.children"
            :key="i2"
            :class="child.path == openMenu ? 'open-menu' : ''"
          >
            <v-list-item-title
              class="ait-clickable ait-menu-item cursor-pointer"
              @click="toPath(child)"
            >
              <v-icon class="menu-icon" :icon="child.icon"></v-icon>
              <span>{{ child.title }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- 一级菜单 -->
        <v-list-item-title
          class="ait-clickable ait-menu-item cursor-pointer"
          @click="toPath(item)"
          v-else
        >
          <v-icon class="menu-icon" :icon="item.icon"></v-icon>
          <span>{{ item.title }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <div class="menu-footer">
      <ThemeSwitch />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

type Menu = {
  title: string;
  icon?: string;
  path?: string;
  haveChildren?: boolean;
  children?: Menu[];
};

const openMenu = ref<string>("/home");

const items = ref<Menu[]>([
  { title: "看板", path: "dashboard", icon: "mdi-home-analytics" },
  { title: "主站", path: "home", icon: "mdi-home-circle" },
  { title: "字典管理", path: "dict", icon: "mdi-code-tags" },
  {
    title: "系统管理",
    icon: "mdi-cog",
    haveChildren: true,
    children: [
      { title: "访客记录", path: "viewerlog", icon: "mdi-looks" },
      { title: "登录记录", path: "token", icon: "mdi-key-chain" },
      { title: "系统设置", path: "setting", icon: "mdi-cog-box" },
    ],
  },
]);

const toPath = (menu: Menu) => {
  if (!menu.path) {
    return;
  }
  if (menu.path == "home") {
    // router.push({ path: "/" });
    window.open("/", "_blank");
  } else {
    openMenu.value = menu.path;
    router.push({ path: `/admin/${menu.path}` });
  }
};
</script>

<style scoped>
.menu:hover {
  background-color: rgba(66, 66, 66, 0.3);
}
.menu-icon {
  margin: 0 0.5rem;
}

.open-menu {
  background: rgba(66, 66, 66, 0.2);
}

.menu-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
