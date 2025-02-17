<script setup lang="ts">
// 需要登录
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
</script>

<template>
  <div class="tw-text-xl">欢迎使用 MyNuxt 管理系统</div>
</template>

<style scoped></style>
