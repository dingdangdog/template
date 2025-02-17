<template>
  <header
    class="top-index tw-fixed tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-w-full tw-shadow-md tw-bg-gray-950"
  >
    <div class="tw-w-full tw-h-16">
      <div
        class="tw-px-2 md:tw-px-4 tw-h-full tw-flex tw-justify-between tw-items-center"
      >
        <div class="tw-flex tw-items-center">
          <div class="tw-block md:tw-hidden" v-show="haveMenu">
            <v-btn icon="mdi-menu" size="large" @click="tiggleMenu()"></v-btn>
          </div>
          <a href="/" class="tw-block md:tw-hidden">
            <img
              v-show="!haveMenu"
              src="/favicon.ico"
              class="tw-w-12 tw-h-12 tw-object-contain tw-rounded-full"
            />
          </a>
          <a
            href="/"
            class="tw-text-lg md:tw-text-xl tw-h-full tw-font-boldtw-justify-center tw-items-center tw-hidden md:tw-flex"
          >
            <img
              src="/favicon.ico"
              class="tw-w-12 tw-h-12 tw-object-contain tw-rounded-full"
            />
            <span class="tw-min-w-16 tw-ml-2">文声AI</span>
          </a>
        </div>
        <div class="tw-flex-1 tw-h-full tw-flex tw-justify-end tw-items-center">
          <div
            class="tw-px-0 md:tw-px-4 tw-h-full tw-flex tw-items-center tw-justify-center"
          >
            <!-- <a
              href="/client"
              class="tw-px-4 tw-text-base tw-font-bold hover:tw-text-sky-500 tw-hidden md:tw-flex tw-h-full tw-items-center"
              target="_blank"
              >客户端
            </a> -->
            <a
              href="/main/books"
              class="tw-px-4 tw-text-base tw-font-bold hover:tw-text-blue-400 tw-h-full tw-flex tw-items-center"
              target="_blank"
              v-show="showGide"
              >账本管理
            </a>
            <a
              href="/auth/login"
              class="tw-px-4 tw-text-base tw-font-bold hover:tw-text-blue-400 tw-hidden md:tw-flex tw-h-full tw-items-center"
              v-show="!logined"
            >
              登录/注册
            </a>
            <a
              href="/cc/create"
              class="tw-px-4 tw-text-base tw-font-bold hover:tw-text-blue-400 tw-hidden md:tw-flex tw-h-full tw-items-center"
              v-show="logined"
              >开始创作
            </a>
            <a
              href="/admin"
              class="tw-px-4 tw-text-base tw-font-bold hover:tw-text-blue-400 tw-hidden md:tw-flex tw-h-full tw-items-center"
              >后台管理
            </a>
            <!-- <a
              href="/user/info"
              class="tw-pl-4 tw-text-base tw-font-bold hover:tw-text-blue-400 tw-hidden md:tw-flex tw-h-full tw-items-center"
              v-show="logined"
              >个人中心
            </a> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { showGide, haveMenu } = defineProps(["showGide", "haveMenu"]);
const emit = defineEmits(["tiggleMenu"]);

const logined = ref(false);
if (checkSignIn()) {
  // console.log(session);
  logined.value = true;
}

onMounted(async () => {
  if (logined.value) {
    getUserInfo();
    const timer = setInterval(async () => {
      try {
        const user = await getUserInfo();
        if (!user) {
          GlobalUserInfo.value = {};
          clearInterval(timer);
        }
      } catch (err) {
        clearInterval(timer);
      }
    }, 5000);
  }
});

const tiggleMenu = () => {
  emit("tiggleMenu");
};
</script>

<style scoped></style>
