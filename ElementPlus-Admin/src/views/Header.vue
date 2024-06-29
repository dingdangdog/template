<template>
  <div class="i-header-container">
    <div id="i-header-logo">
      <el-image style="height: 3rem; width: auto" :src="circleUrl" fit="cover" />
      <h2 style="margin: 0 1rem">Title</h2>
    </div>
    <div id="i-header-user">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :src="circleUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
const circleUrl = 'src/assets/logo.svg'

const logout = () => {
  localStorage.removeItem('token')
  window.location.reload()
}
</script>

<style lang="less" scoped>
.i-header-container {
  display: flex;
  align-items: center;
  width: 100%;

  #i-header-logo {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
