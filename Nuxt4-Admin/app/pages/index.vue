<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-background text-foreground"
  >
    <h1 class="text-2xl font-semibold">项目模板</h1>
    <p class="text-muted text-sm text-center max-w-md">
      空项目骨架：按需扩展页面与接口。
    </p>
    <div class="flex flex-wrap gap-3 justify-center">
      <NuxtLink
        to="/login"
        class="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-surface-muted text-sm font-medium"
      >
        登录
      </NuxtLink>
      <NuxtLink
        to="/admin"
        class="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-sm font-medium"
      >
        管理后台
      </NuxtLink>
    </div>
  </div>
</template>
