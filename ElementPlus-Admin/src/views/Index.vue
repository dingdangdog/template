<template>
  <div>
    <el-container id="i-container">
      <el-header id="i-header"><HeaderView /></el-header>
      <el-container style="width: 100%; height: calc(100vh - var(--i-header-height))">
        <el-aside id="i-aside"><MenuView /></el-aside>
        <el-main id="i-main"><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import HeaderView from '@/views/Header.vue'
import MenuView from '@/views/Menu.vue'
</script>

<style lang="less" scoped>
#i-container {
  color: var(--el-text-color-primary);
  height: 100vh;

  #i-header {
    background-color: var(--el-color-primary-light-7);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: var(--i-header-height);
  }

  #i-aside {
    background-color: var(--el-color-primary-light-9);
    width: auto;
  }

  #i-main {
    background-color: var(--el-color-primary-light-8);
    overflow-y: auto;
  }
}
</style>
