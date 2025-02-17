<script setup lang="ts">
// 需要登录
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

import type { User } from "@prisma/client";
import { getUsersPage } from "./api";
import { tableFlash } from "./flag";

const pageQuery = ref<PageParam>({ pageSize: 15, pageNum: 1 });
const query = ref<User | any>({});
const tabledata = ref<{ total?: number; data?: User[] }>({});
const loading = ref(false);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
  { title: "Username", key: "username" },
  { title: "Email", key: "email" },
  { title: "Avatar", key: "avatar" },
  {
    title: "CreateBy",
    key: "create_by",
    value: (p: User | any) => {
      return formatDate(p.createBy);
    },
  },
  { title: "Actions", key: "actions", sortable: false },
]);

watch(tableFlash, () => {
  getPages();
});

const getPages = () => {
  loading.value = true;
  getUsersPage(pageQuery.value, query.value).then((res) => {
    tabledata.value = res;
    loading.value = false;
  });
};

const changePage = (param: {
  page: number;
  itemsPerPage: number;
  sortBy: any;
}) => {
  pageQuery.value.pageNum = param.page;
  pageQuery.value.pageSize = param.itemsPerPage;
  getPages();
};
</script>

<template>
  <div class="admin-page-container">
    <div class="tw-flex tw-items-center">
      <div class="tw-w-64">
        <v-text-field
          clearable
          label="用户ID"
          variant="outlined"
          hide-details="auto"
          v-model="query.id"
        ></v-text-field>
      </div>
      <div class="tw-w-64 tw-ml-2">
        <v-text-field
          clearable
          label="昵称"
          variant="outlined"
          hide-details="auto"
          v-model="query.username"
        ></v-text-field>
      </div>
      <div class="tw-w-64 tw-ml-2">
        <v-text-field
          clearable
          label="账号"
          variant="outlined"
          hide-details="auto"
          v-model="query.account"
        ></v-text-field>
      </div>
      <v-btn variant="tonal" @click="getPages" class="tw-ml-2"> 查询 </v-btn>
    </div>
    <v-data-table-server
      noDataText="noDataText"
      :items-per-page="pageQuery.pageSize"
      :items="tabledata?.data"
      :itemsLength="tabledata?.total || 0"
      :headers="headers"
      :loading="loading"
      @update:options="changePage"
      height="calc(100vh - 3*var(--v-layout-top) - 1rem)"
    >
    </v-data-table-server>
  </div>
</template>

<style scoped></style>
