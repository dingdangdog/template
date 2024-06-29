<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'

const tab = ref('one')

const toPath = (path: string) => {
  router.push({ path: '/home/' + path })
}

onMounted(() => {
  router.push({ path: '/home/hello' })
})
</script>

<template>
  <v-card>
    <v-tabs v-model="tab" style="border-radius: 0px !important">
      <v-tab value="one" @click="toPath('hello')">Hello</v-tab>
      <v-tab value="two" @click="toPath('about')">About</v-tab>
    </v-tabs>
    <v-card-text>
      <RouterView />
    </v-card-text>
  </v-card>
</template>
