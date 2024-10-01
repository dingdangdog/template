<script setup lang="ts">
import { ref } from "vue";

const desserts = ref([
  {
    title: "Frozen Yogurt",
    tag: "Java",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
  {
    title: "Ice cream sandwich",
    tag: "Python",
    desc: "",
    time: "",
    level: "",
    action: "",
  },
]);
const headers = ref([
  {
    title: "Title",
    align: "start",
    sortable: false,
    key: "title",
  },
  { title: "Like", key: "like" },
  { title: "Tag", key: "tag" },
  { title: "Time", key: "time" },
  { title: "Level", key: "level" },
]);
</script>

<template>
  <div class="">
    <v-btn variant="tonal"> Search </v-btn>
  </div>
  <v-data-table
    :items="desserts"
    :headers="headers"
    height="calc(100vh - 3.5*var(--v-layout-top))"
  >
  </v-data-table>
</template>

<style scoped></style>
