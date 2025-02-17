<template>
  <div>
    <v-timeline side="end">
      <v-timeline-item
        v-for="item in items"
        :key="item.id"
        :dot-color="item.color"
        size="small"
      >
        <v-alert :color="item.color" :icon="item.icon" :value="true">
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
          imperdiet nec ut, sed euismod convenire principes at. Est et nobis
          iisque percipit, an vim zril disputando voluptatibus, vix an salutandi
          sententiae.
        </v-alert>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "public",
});

const items = ref([
  {
    id: 1,
    color: "info",
    icon: "mdi-information",
  },
  {
    id: 2,
    color: "error",
    icon: "mdi-alert-circle",
  },
]);

// ssr 获取接口数据
const { data: data } = await useFetch("/test");
console.log("test API res", data.value);

// 非ssr（异步）
// doApi.get("test").then((res) => {
//   console.log("test API res", res);
// });
</script>

<style scoped></style>
