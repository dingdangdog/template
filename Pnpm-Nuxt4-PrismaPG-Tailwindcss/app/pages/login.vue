<script setup lang="ts">
definePageMeta({
  unauthenticatedOnly: true,
});

import { BookOpenIcon, MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

import type { UserInfo } from "~/utils/model";
import { useUserStore } from "~/stores/user";
import { doApi } from "~/utils/api";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const openRegister = ref(false);
const registerDialog = ref(false);

const loginParam = ref({
  username: "",
  password: "",
});

const loginFormErrors = ref<Record<string, string>>({});
const validateLoginForm = () => {
  loginFormErrors.value = {};

  if (!loginParam.value.username) {
    loginFormErrors.value.username = "必填";
  } else if (loginParam.value.username.length < 4) {
    loginFormErrors.value.username = "账号必须大于等于4个字符";
  }

  if (!loginParam.value.password) {
    loginFormErrors.value.password = "必填";
  } else if (loginParam.value.password.length < 8) {
    loginFormErrors.value.password = "密码必须大于等于8个字符";
  }

  return Object.keys(loginFormErrors.value).length === 0;
};

const fromUrl = ref<string>();

const redirectAfterLogin = async () => {
  const userStore = useUserStore();
  const target = fromUrl.value || "/";

  if (target.startsWith("/admin") && !userStore.isAdmin) {
    console.error("无权访问目标页面，已跳转到系统首页");
    await navigateTo("/");
    return;
  }

  try {
    await navigateTo(target);
  } catch {
    console.error("目标页面不可访问，已跳转到系统首页");
    await navigateTo("/");
  }
};

const loginLoading = ref(false);
const login = () => {
  if (!validateLoginForm()) return;
  loginLoading.value = true;
  doApi
    .post<UserInfo>("api/login", loginParam.value)
    .then((user) => {
      if (!user) return;
      useUserStore().setUser(user);
      console.log("登录成功");
      redirectAfterLogin();
    })
    .catch(() => {
      // 错误已在 doApi 中通过 Alert 展示
    })
    .finally(() => {
      loginLoading.value = false;
    });
};

onMounted(async () => {
  const route = useRoute();
  const callbackUrl = route.query.callbackUrl;
  fromUrl.value = callbackUrl as string;

  let checkResult: number;
  try {
    checkResult = await doApi.get<number>("api/check");
  } catch {
    checkResult = -1;
  }



  const user = await useUserStore().fetchUser();
  if (!user) return;

  console.log("登录成功");
  setTimeout(() => {
    redirectAfterLogin();
  }, 200);
});

</script>

<template>

  <Head>
    <Title>登录 — 模板</Title>
    <Meta name="description" content="登录模板" />
    <Meta name="keywords" content="登录模板" />
  </Head>

  <div class="h-screen p-2 transition-colors duration-300 bg-background text-foreground">
    <div class="fixed top-2 right-2 flex items-center gap-2 z-50">
      <button @click="toggleTheme()"
        class="p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg bg-surface-muted text-foreground hover:bg-surface border border-border"
        title="切换主题">
        <SunIcon v-if="isDark" class="w-5 h-5 text-foreground" />
        <MoonIcon v-else class="w-5 h-5 text-foreground" />
      </button>

    </div>
  </div>
</template>

<style scoped>
.-translate-y-1\/2 {
  transform: translateY(-50%);
}
</style>
