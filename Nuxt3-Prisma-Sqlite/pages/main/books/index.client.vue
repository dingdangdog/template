<script setup lang="ts">
// 需要登录
definePageMeta({
  layout: "public",
  middleware: ["auth"],
});

import type { Book } from "@prisma/client";
import { del, page } from "./api";
import { editInfoFlag } from "./flag";
import EditInfoDialog from "./EditInfoDialog.vue";

const pageQuery = ref<PageParam>({ pageSize: 15, pageNum: 1 });
const query = ref<Book | any>({});
const tabledata = ref<{ total?: number; data?: Book[] }>({});
const loading = ref(false);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "UserId", key: "userId" },
  { title: "BookName", key: "bookName" },
  {
    title: "CreateBy",
    key: "createBy",
    value: (item: Book | any) => {
      return formatDate(item.createBy);
    },
  },
  { title: "Actions", key: "actions" },
]);

const editItem = ref<Book | any>();
const editDialogTitle = ref("Title");
// 新增
const addItem = () => {
  editDialogTitle.value = "Add Book";
  editItem.value = {};
  editInfoFlag.value = true;
};
// 编辑基本信息
const editItemInfo = (item: Book) => {
  editDialogTitle.value = "Edit Book";
  editItem.value = item;
  editInfoFlag.value = true;
};

// 取消编辑的回调
const cancelEdit = () => {
  // cancel hook
};

const toDelete = (item: Book) => {
  Confirm.open({
    title: "删除确认",
    content: `确定要删除【${item.bookName}】吗？`,
    confirm: () => {
      del(item.id)
        .then((res) => {
          // console.log(res)
          Alert.success("删除成功");
          getPages();
        })
        .catch(() => {
          error("delete fail");
        });
    },
    cancel: () => {
      // 取消删除
      Alert.info("取消删除");
    },
  });
};

const getPages = () => {
  loading.value = true;
  page(pageQuery.value, query.value).then((res) => {
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
    <div class="tw-flex tw-items-center tw-space-x-4 tw-pb-2">
      <div class="tw-w-80">
        <v-text-field
          clearable
          label="套餐名"
          v-model="query.name"
          variant="outlined"
          hide-details="auto"
        ></v-text-field>
      </div>
      <v-btn variant="tonal" @click="getPages"> 查询 </v-btn>
      <v-btn variant="tonal" color="blue-darken-4" @click="addItem()">
        新增
      </v-btn>
    </div>
    <v-data-table-server
      noDataText="noDataText"
      :headers="headers"
      :items-per-page="pageQuery.pageSize"
      :items="tabledata?.data"
      :itemsLength="tabledata?.total || 0"
      :loading="loading"
      @update:options="changePage"
      height="calc(100vh - 3*var(--v-layout-top) - 1rem)"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItemInfo(item)">
          mdi-pencil
        </v-icon>
        <!-- <v-icon size="small" class="me-2" @click="editItemFields(item)">
          mdi-information
        </v-icon> -->
        <v-icon size="small" class="me-2" @click="toDelete(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>
  </div>
  <EditInfoDialog
    :item="editItem"
    :title="editDialogTitle"
    @success="getPages"
    @cancel="cancelEdit"
    v-if="editInfoFlag"
  />
</template>

<style scoped></style>
