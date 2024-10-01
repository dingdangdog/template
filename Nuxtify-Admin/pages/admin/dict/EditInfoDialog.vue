<script setup lang="ts">
import { onMounted, ref } from "vue";
import { errorAlert, successAlert } from "~/utils/alert";
import { addDictionary, listDictionary, updateDictionary } from "./api";
import { editInfoFlag, tableFlash } from "./flag";

// 组件传入数据
let { item, title } = defineProps(["item", "title"]);
// 编辑数据实体
const editItem = ref<Dictionary>({});
const types = ref<{ title: any; value: any }[]>([]);
// 编辑数据初始化
onMounted(() => {
  editItem.value = {};
  if (item) {
    // console.log(item)
    editItem.value = { ...item };
  }

  listDictionary({ type: "dict" }).then((res) => {
    types.value = res.map((dict) => {
      return { title: dict.name, value: dict.value };
    });
  });
});

// 保存编辑数据
const saveItem = () => {
  if (!form.value) {
    // formRef.validate()
    errorAlert("UnSubmit, Please Check Form!");
    return;
  }

  if (editItem.value.id) {
    updateDictionary(editItem.value).then((res) => {
      successAlert(res);
      editInfoFlag.value = false;
      tableFlash.value = !tableFlash.value;
    });
  } else {
    addDictionary(editItem.value).then((res) => {
      successAlert(res);
      editInfoFlag.value = false;
      tableFlash.value = !tableFlash.value;
    });
  }
};

const form = ref(false);
</script>

<template>
  <v-dialog
    v-model="editInfoFlag"
    transition="dialog-bottom-transition"
    id="tag-dialog"
    max-width="600"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="form" ref="formRef">
          <v-autocomplete
            clearable
            label="Type"
            variant="outlined"
            v-model="editItem.type"
            :items="types"
          ></v-autocomplete>
          <v-text-field
            clearable
            label="Name"
            variant="outlined"
            v-model="editItem.name"
          ></v-text-field>
          <v-text-field
            clearable
            label="Value"
            variant="outlined"
            v-model="editItem.value"
          ></v-text-field>
          <v-text-field
            clearable
            label="Sort"
            variant="outlined"
            v-model="editItem.sort"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          density="default"
          @click="editInfoFlag = false"
          variant="elevated"
        >
          Cancel
        </v-btn>
        &nbsp;
        <v-btn
          density="default"
          @click="saveItem"
          color="blue-lighten-3"
          variant="elevated"
        >
          Save
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-dialog > .v-overlay__content {
  margin: 0 !important;
}
</style>
