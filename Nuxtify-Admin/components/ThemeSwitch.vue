<template>
  <div>
    <v-switch
      color="warning"
      v-model="themeValue"
      @update:modelValue="toggleTheme()"
      hide-details
      inset
    >
      <template v-slot:label>
        <v-icon
          :icon="themeValue ? 'mdi-emoticon-cool-outline' : 'mdi-weather-night'"
          :color="themeValue ? 'warning' : 'white'"
        ></v-icon>
      </template>
    </v-switch>
  </div>
</template>

<script setup lang="ts">
// 切换主题开关组件，只负责切换逻辑，不关心主题初始化逻辑
import { useTheme } from "vuetify";

const theme = useTheme(); // vuetify 的 theme 属性
const themeValue = ref(theme.global.name.value == "light"); // 根据theme控制switch开关的变量

const toggleTheme = () => {
  const to = themeValue.value ? "light" : "dark";
  theme.global.name.value = to;
  localStorage.setItem("theme", to);
};
</script>

<style scoped></style>
