<template>
  <div class="max-w-3xl">
    <h1 class="text-2xl font-semibold text-foreground mb-2">控制台</h1>
    <p class="text-muted text-sm">
      模板占位页：在此接入你的后台首页内容。
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
</script>
