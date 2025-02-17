<script setup lang="ts">
// 需要登录
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

import type { SystemSetting } from "@prisma/client";

const settings = ref<SystemSetting | any>({});

onMounted(() => {
  getConfig();
});

const getConfig = () => {
  doApi.get("api/admin/entry/settings/get").then((res) => {
    settings.value = res;
  });
};

const saveConfig = () => {
  doApi.post("api/admin/entry/setting/update", settings.value).then(() => {
    Alert.success("保存成功");
    getConfig();
  });
};
</script>

<template>
  <div class="admin-page-container">
    <div
      class="tw-flex tw-flex-col tw-p-2 tw-max-w-[760px]"
      style="margin: 0 auto"
    >
      <v-text-field
        clearable
        label="Title"
        v-model="settings.title"
        variant="outlined"
      ></v-text-field>
      <v-textarea
        rows="2"
        label="Description"
        :model-value="settings.description"
        variant="outlined"
      ></v-textarea>
      <v-textarea
        rows="2"
        label="Keywords"
        :model-value="settings.keywords"
        variant="outlined"
      ></v-textarea>
      <v-text-field
        clearable
        label="Version"
        v-model="settings.version"
        variant="outlined"
      ></v-text-field>
      <p class="tw-my-2 tw-text-sm tw-text-gray-500">
        最后修改时间：{{ formatDate(settings.update_by || 0) }}
      </p>
      <div class="tw-flex tw-space-x-4 tw-justify-center">
        <v-btn class="tw-w-40" variant="flat" @click="getConfig()">
          重置
        </v-btn>
        <v-btn
          class="tw-w-40"
          variant="flat"
          color="primary"
          @click="saveConfig()"
        >
          保存
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
