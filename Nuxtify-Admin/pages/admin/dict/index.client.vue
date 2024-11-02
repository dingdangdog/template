<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

import { onMounted, ref, watch } from "vue";
import { errorAlert, successAlert } from "~/utils/alert";
import EditInfoDialog from "./EditInfoDialog.vue";
import { delDictionary, getDictionaryPage, listDictionary } from "./api";
import { editInfoFlag, tableFlash } from "./flag";

const showSearch = ref(false);

const types = ref<any>([]);

const pageQuery = ref<PageParam>({ pageSize: 15, pageNum: 1 });
const query = ref<Dictionary>({});
const tabledata = ref<{ total?: number; data?: Dictionary[] }>({});
const loading = ref(false);
const headers = ref([
  { title: "Type", key: "type" },
  { title: "Name", key: "name" },
  { title: "Value", key: "value" },
  { title: "Sort", key: "sort" },
  { title: "Actions", key: "actions", sortable: false },
]);

const editItem = ref({});
const editDialogTitle = ref("Add Dictionary");
// 新增
const addItem = () => {
  editDialogTitle.value = "Add Dictionary";
  editItem.value = {};
  editInfoFlag.value = true;
};
// 编辑基本信息
const editItemInfo = (item: Dictionary) => {
  editDialogTitle.value = "Edit Dictionary";
  editItem.value = item;
  editInfoFlag.value = true;
};

// 确认删除的一些逻辑
const deleteConfirmDialog = ref(false);
const deleteItem = ref<Dictionary>();
const toDelete = (item: Dictionary) => {
  deleteConfirmDialog.value = true;
  deleteItem.value = item;
};
const cancelDelete = () => {
  deleteConfirmDialog.value = false;
  deleteItem.value = {};
};
const confirmDelete = () => {
  if (!deleteItem.value?.id) {
    errorAlert("Please Select One Item");
    return;
  }
  delDictionary(deleteItem.value?.id)
    .then((res) => {
      successAlert(res);
      getPages();
    })
    .catch(() => {
      errorAlert("delete fail");
    });
  deleteConfirmDialog.value = false;
};

watch(tableFlash, () => {
  getPages();
});

const getPages = () => {
  loading.value = true;
  getDictionaryPage(pageQuery.value, query.value).then((res) => {
    tabledata.value = res;
    loading.value = false;
  });

  listDictionary({ type: "dict" }).then((res) => {
    types.value = res.map((dict) => {
      return { title: dict.name, value: dict.value };
    });
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
      <v-btn
        variant="tonal"
        color="success"
        @click="addItem()"
        style="margin: 0.5rem"
      >
        ADD
      </v-btn>
    </div>
    <v-data-table-server
      :items-per-page="pageQuery.pageSize"
      :items="tabledata?.data"
      :itemsLength="tabledata?.total || 0"
      :headers="headers"
      :loading="loading"
      @update:options="changePage"
      height="calc(100vh - 3*var(--v-layout-top))"
    >
      <template v-slot:item.icon="{ value }">
        <!-- 图标 -->
        <v-img :width="30" aspect-ratio="1" :src="value"></v-img>
      </template>
      <template v-slot:top>
        <v-dialog v-model="deleteConfirmDialog" width="auto">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete 【{{ deleteItem?.type }}:{{
                deleteItem?.name
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
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItemInfo(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" class="me-2" @click="toDelete(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>
  </div>

  <v-navigation-drawer v-model="showSearch" location="right" temporary>
    <div style="padding: 1rem">
      <div class="table-search">
        <v-autocomplete
          clearable
          variant="outlined"
          hide-details="auto"
          label="Type"
          v-model="query.type"
          :items="types"
        ></v-autocomplete>
      </div>
      <div class="table-search">
        <v-text-field
          clearable
          variant="outlined"
          hide-details="auto"
          label="Name"
          v-model="query.name"
        ></v-text-field>
      </div>
      <v-btn variant="tonal" @click="getPages"> Search </v-btn>
    </div>
  </v-navigation-drawer>

  <EditInfoDialog
    :item="editItem"
    :title="editDialogTitle"
    v-if="editInfoFlag"
  />
</template>

<style scoped></style>
