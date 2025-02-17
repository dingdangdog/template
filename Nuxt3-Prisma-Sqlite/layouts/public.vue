<script setup lang="ts"></script>

<template>
  <div class="tw-bg-gray-900">
    <AppHeader :showGide="true" :haveMenu="false" />
    <main class="tw-pb-16 md:tw-pb-0">
      <div class="tw-min-h-[100vh] tw-pt-16">
        <slot></slot>
      </div>
      <AppInfo />
    </main>
    <AppFooter />
  </div>
  <GlobalAlert />
  <GlobalConfirm />
</template>

<style scoped></style>
