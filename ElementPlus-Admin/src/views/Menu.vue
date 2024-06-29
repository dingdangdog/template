<template>
  <div id="i-menu-container">
    <el-menu default-active="/home" id="i-menu" :collapse="isCollapse" @select="handleClick">
      <el-menu-item index="/home">
        <el-icon><icon-menu /></el-icon>
        <template #title>Home</template>
      </el-menu-item>
      <el-menu-item index="about">
        <el-icon><icon-menu /></el-icon>
        <template #title>About</template>
      </el-menu-item>

      <el-divider />
      <!-- 下面是一组按钮示例 -->
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>多级菜单</span>
        </template>
        <el-menu-item-group>
          <template #title><span>分组一</span></template>
          <el-menu-item index="1-1">菜单一</el-menu-item>
          <el-menu-item index="1-2">菜单二</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组二">
          <el-menu-item index="1-3">菜单三</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>菜单四</span></template>
          <el-menu-item index="1-4-1">三级菜单</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>常规菜单</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>禁用菜单</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>常规菜单</template>
      </el-menu-item>
    </el-menu>
    <div v-show="isCollapse" @click="isCollapse = !isCollapse" class="i-menu-collapse">
      <el-icon size="x-large"><Expand /></el-icon>
    </div>
    <div v-show="!isCollapse" @click="isCollapse = !isCollapse" class="i-menu-collapse">
      <el-icon size="x-large"><Fold /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Expand,
  Fold
} from '@element-plus/icons-vue'
import router from '@/router'

const isCollapse = ref(false)

const handleClick = (index: string, _indexPath: string, _item: any) => {
  console.log(index, _indexPath, _item)
  router.push(index)
}
</script>

<style scoped>
#i-menu-container {
  position: relative;
  height: 100%;
}

#i-menu {
  overflow-y: auto;
}

.i-menu-collapse {
  width: 100%;
  padding: 0.5rem 0;
  cursor: pointer;

  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: center;
}

.i-menu-collapse:hover {
  background-color: var(--el-color-primary-light-7);
}
</style>
