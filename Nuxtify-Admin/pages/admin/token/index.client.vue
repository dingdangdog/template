<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

import { successAlert } from "~/utils/alert";
import { deleteToken, getTokens } from "./api";

const tableData = ref<Token[]>();
// 获取分页数据
const getPages = () => {
  loading.value = true;
  getTokens().then((res) => {
    tableData.value = res;
    loading.value = false;
  });
};

const loading = ref(false);
const headers = ref([
  { title: "UserID", key: "id" },
  { title: "Token", key: "token" },
  {
    title: "CreateTime",
    key: "createtime",
    value: (i: Token) => {
      let date = new Date();
      i.createtime ? date.setTime(Number(i.createtime)) : "new Date()";
      return date.toLocaleDateString();
    },
  },
  { title: "Actions", key: "actions", sortable: false },
]);

const fullLoading = ref(false);

const confirmDelete = () => {
  deleteToken({ token: deleteItem.value.token }).then(() => {
    successAlert("Delete Success");
    deleteConfirmDialog.value = false;
    getPages();
  });
};

// 确认删除的一些逻辑
const deleteConfirmDialog = ref(false);
const deleteItem = ref<Token>({});
const toDelete = (item: Token) => {
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
    <v-data-table-virtual
      :items="tableData"
      :items-length="tableData?.length"
      :headers="headers"
      :loading="loading"
      height="calc(100vh - 3*var(--v-layout-top) - 1rem)"
    >
      <template v-slot:top>
        <v-dialog v-model="deleteConfirmDialog" width="auto">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete 【{{ deleteItem?.token }}】?
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
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="toDelete(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<style scoped></style>
