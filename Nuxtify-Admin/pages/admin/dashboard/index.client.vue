<template>
  <div>
    <h1>看板</h1>

    <div>
      <AdminViewerLine title="访客趋势" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});
// const AdminViewerLine = defineAsyncComponent(
//   () => import("@/components/admin/ViewerLine.vue")
// );
</script>

<style scoped></style>
