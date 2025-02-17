<template>
  <footer
    class="top-index tw-fixed tw-h-16 tw-bottom-0 tw-left-0 tw-flex md:tw-hidden tw-justify-between tw-items-center tw-w-full tw-border-t tw-border-gray-500 tw-bg-gray-950"
  >
    <div
      class="tw-flex-1 tw-h-full tw-flex tw-items-center tw-justify-center"
      :class="selected == 'create' ? 'tw-bg-gray-800' : ''"
      @click="navigateTo('/cc/create')"
    >
      <span>开始创作</span>
    </div>
    <div
      class="tw-flex-1 tw-h-full tw-flex tw-items-center tw-justify-center"
      :class="selected == 'user' ? 'tw-bg-gray-800' : ''"
      @click="navigateTo('/user/info')"
    >
      <span>个人中心</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { selected } = defineProps(["selected"]);
</script>

<style scoped></style>
