<template>
  <div class="max-w-3xl">
    <h1 class="text-2xl font-semibold text-foreground mb-2">设置</h1>
    <p class="text-muted text-sm">
      模板占位页：在此接入系统设置表单或配置。
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
</script>
