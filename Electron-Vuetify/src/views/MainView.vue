<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar
      class="window-title-bar"
      color="primary"
      density="compact"
      style="border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem"
      @mousedown="onMouseDown"
    >
      <template v-slot:prepend>
        <v-avatar rounded="0" size="small">
          <v-img src="/favicon.ico" cover></v-img>
        </v-avatar>
        <v-app-bar-title>Application bar</v-app-bar-title>
      </template>
      <template v-slot:append>
        <div class="window-menu" @click="minimizeWindow">
          <v-icon icon="mdi-window-minimize"></v-icon>
        </div>
        <div class="window-menu" @click="maximizeWindow" v-show="!isMax">
          <v-icon icon="mdi-window-maximize"></v-icon>
        </div>
        <div class="window-menu" @click="maximizeWindow" v-show="isMax">
          <v-icon icon="mdi-dock-window"></v-icon>
        </div>
        <div class="window-menu" @click="closeWindow">
          <v-icon icon="mdi-window-close"></v-icon>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <div class="window-main">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 最小化
const minimizeWindow = () => {
  window.electron.minimize()
}
// 最大化标志
const isMax = ref(false)
// 最大化
const maximizeWindow = () => {
  window.electron.maximize()
  isMas()
}
// 关闭窗口
const closeWindow = () => {
  window.electron.close()
}

// 判断窗口是否最大化
const isMas = () => {
  window.electron.isMaximized().then((flag: boolean) => {
    isMax.value = flag
  })
}

const onMouseDown = () => {
  if (isMax.value) {
    maximizeWindow()
  }
}

onMounted(() => {
  isMas()
})
</script>

<style scoped>
.window-title-bar {
  -webkit-app-region: drag;
}
.window-menu {
  padding: 0.5rem;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
.window-menu:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.window-main {
  overflow-y: auto;
  background-color: white;
  height: calc(100vh - 48px);
}
</style>
