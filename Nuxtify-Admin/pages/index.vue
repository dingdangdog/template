<template>
  <div class="common-page-container">Home</div>

  <v-dialog
    transition="dialog-bottom-transition"
    v-model="showTipDialog"
    persistent
    width="auto"
    max-width="60rem"
  >
    <v-card>
      <v-toolbar>
        <template v-slot:title>
          <h2 style="margin-left: 1rem; color: orange">网站提示</h2>
        </template>
      </v-toolbar>

      <v-card-text>
        <div class="field-row">
          <h3>
            当前网站还在建设中，功能和数据尚不完全，您可以先行体验，敬请期待
          </h3>
        </div>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          text="知道了"
          size="large"
          color="primary"
          @click="iKnow"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const showTipDialog = ref(false);

const iKnow = () => {
  showTipDialog.value = false;
  localStorage.setItem("iKown", "true");
};

onMounted(() => {
  if (localStorage.getItem("iKown") !== "true") {
    showTipDialog.value = true;
  }
});
</script>

<style scoped></style>
