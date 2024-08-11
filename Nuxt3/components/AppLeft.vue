<template>
  <aside class="categories" :class="isHeadVisible">
    <NuxtLink v-for="menu in menus" :key="menu.code" :to="`#${menu.code}`" style="display: block;">
      {{ menu.name }}
    </NuxtLink>
  </aside>
</template>

<script setup lang="ts">
const menus = [
  {
    code: "oldmoon",
    name: "oldmoon",
  },
  {
    code: "oldmoon1",
    name: "oldmoon1",
  },
  {
    code: "oldmoon2",
    name: "oldmoon2",
  },
  {
    code: "oldmoon3",
    name: "oldmoon3",
  },
  {
    code: "oldmoon4",
    name: "oldmoon4",
  },
  {
    code: "oldmoon5",
    name: "oldmoon6",
  },
  {
    code: "oldmoon6",
    name: "oldmoon6",
  },
  {
    code: "oldmoon7",
    name: "oldmoon7",
  },
  {
    code: "oldmoon8",
    name: "oldmoon8",
  },
  {
    code: "oldmoon9",
    name: "oldmoon9",
  },
  {
    code: "oldmoon10",
    name: "oldmoon10",
  },
  {
    code: "oldmoon11",
    name: "oldmoon11",
  },
];


const { isHeadVisible } = defineProps(["isHeadVisible"]);
</script>

<style scoped>
.categories.hidden {
  padding-top: 1rem;
}

.categories.visible {
  padding-top: 4rem;
}
</style>
