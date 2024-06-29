<template>
  <v-card
    class="mx-auto"
    width="400"
  >
    <v-card-title style="background-color: rgb(15 141 245);">
      {{ name }}
    </v-card-title>
    <v-card-subtitle style="background-color: rgb(15 141 245);">
      支付宝扫码
    </v-card-subtitle>

    <v-card-text class="bg-surface-light pt-4">
      <qrcode-vue :value="qrcode" style="width: 100%; height: auto;"></qrcode-vue>
    </v-card-text>
  </v-card>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import QrcodeVue from 'qrcode.vue'


// 使用 props 来接收外部传入的参数
const { qrcode, name } = defineProps(['qrcode','name'])

</script>

<style scoped>

</style>