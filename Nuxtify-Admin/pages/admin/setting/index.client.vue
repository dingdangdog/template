<template>
  <div class="w-full">
    <div>
      <div class="w-full px-4 py-2">
        <v-text-field
          variant="outlined"
          hide-details="auto"
          v-model="setting.title"
          label="Title"
        >
        </v-text-field>
      </div>
      <div class="w-full px-4 py-2">
        <v-text-field
          variant="outlined"
          hide-details="auto"
          v-model="setting.icon"
          label="Icon"
        >
        </v-text-field>
      </div>
      <div class="w-full px-4 py-2">
        <v-text-field
          variant="outlined"
          hide-details="auto"
          v-model="setting.keyword"
          label="Keyword"
        >
        </v-text-field>
      </div>
      <div class="w-full px-4 py-2">
        <v-text-field
          variant="outlined"
          hide-details="auto"
          v-model="setting.description"
          label="description"
        >
        </v-text-field>
      </div>
      <div class="w-full max-w-64 px-4 py-2">
        <v-autocomplete
          variant="outlined"
          hide-details="auto"
          v-model="setting.theme"
          :items="['light', 'dark']"
          label="Default Theme"
        >
        </v-autocomplete>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="w-full px-4 py-2 text-center">
      <v-btn variant="tonal" color="primary" @click="saveSetting"> Save </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});
import type { Setting } from "~/utils/model";

const setting = ref<Setting>({});

const getSetting = () => {
  doApi.get<Setting>("/setting/get").then((res) => {
    setting.value = res;
  });
};
const saveSetting = () => {
  doApi.post("/setting/set", setting.value).then((res) => {
    successAlert("Success");
  });
};
getSetting();
</script>

<style scoped></style>
