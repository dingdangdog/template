<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import AppHeader from "./components/AppHeader.vue";
import AppAside from "./components/AppAside.vue";
</script>

<template>
  <div class="rounded-md overflow-hidden">
    <AppHeader />
    <main class="h-screen pt-12">
      <div
        style="height: calc(100vh - 3rem)"
        class="overflow-y-auto flex justify-between relative"
      >
        <div class="h-full border-r-2 border-gray-500 bg-gray-950">
          <AppAside />
        </div>
        <div class="w-full h-full overflow-y-auto bg-gray-900">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>
