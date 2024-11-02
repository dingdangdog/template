<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

import { successAlert } from "~/utils/alert";
import { deleteViewerLog, getViewerPage } from "./api";

const showSearch = ref(false);

const pageQuery = ref<PageParam>({ pageSize: 15, pageNum: 1 });
const paramQuery = ref<ViewerLog>({});

const tableData = ref<PageInfo<ViewerLog>>();
// 获取分页数据
const getPages = () => {
  loading.value = true;
  getViewerPage(pageQuery.value, paramQuery.value).then((res) => {
    tableData.value = res;
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

const loading = ref(false);
const headers = ref([
  { title: "IP", key: "ip" },
  { title: "Uri", key: "uri" },
  {
    title: "Time",
    key: "time",
    value: (i: ViewerLog) => {
      let date = new Date();
      i.time ? date.setTime(Number(i.time)) : "new Date()";
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },
  { title: "Timezone", key: "timezone" },
  { title: "UserAgent", key: "userAgent" },
  { title: "Actions", key: "actions", sortable: false },
]);

const confirmDelete = () => {
  deleteViewerLog(deleteItem.value).then(() => {
    successAlert("Delete Success");
    deleteConfirmDialog.value = false;
    getPages();
  });
};

// 确认删除的一些逻辑
const deleteConfirmDialog = ref(false);
const deleteItem = ref<ViewerLog>({});
const toDelete = (item: ViewerLog) => {
  deleteConfirmDialog.value = true;
  deleteItem.value = item;
};
const cancelDelete = () => {
  deleteConfirmDialog.value = false;
  deleteItem.value = {};
};

onMounted(() => {
  getPages();
});
</script>

<template>
  <div class="admin-table-container">
    <div class="admin-table-header">
      <v-btn
        variant="tonal"
        @click="showSearch = !showSearch"
        style="margin: 0.5rem"
      >
        Search
      </v-btn>
    </div>
    <v-divider class="border-opacity-50" style="margin: 1px 0"></v-divider>
    <v-data-table-server
      :items-per-page="pageQuery.pageSize"
      :items="tableData?.records"
      :itemsLength="tableData?.total || 0"
      :headers="headers"
      :loading="loading"
      @update:options="changePage"
      height="calc(100vh - 3*var(--v-layout-top))"
    >
      <template v-slot:top>
        <v-dialog v-model="deleteConfirmDialog" width="auto">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete 【{{
                deleteItem?.ip + "/" + deleteItem?.time
              }}】?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="cancelDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue-darken-1" variant="text" @click="confirmDelete"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="toDelete(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>
  </div>

  <v-navigation-drawer v-model="showSearch" location="right" temporary>
    <div style="padding: 1rem">
      <div class="table-search">
        <v-text-field
          clearable
          variant="outlined"
          hide-details="auto"
          label="IP"
          v-model="paramQuery.ip"
        ></v-text-field>
      </div>
      <div class="table-search">
        <v-text-field
          clearable
          variant="outlined"
          hide-details="auto"
          label="URI"
          v-model="paramQuery.uri"
        ></v-text-field>
      </div>
      <v-btn variant="tonal" @click="getPages"> Search </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style scoped></style>
