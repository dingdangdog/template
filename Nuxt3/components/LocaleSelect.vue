<script setup lang="ts">
const { locale, locales } = useI18n();
const localName = ref<any>("");
const switchLocalePath = useSwitchLocalePath();

locales.value.forEach((i) => {
  if (i.code === locale.value) {
    localName.value = i.name;
    return;
  }
});

const isDropdownOpen = ref(false);

// 切换下拉菜单的显示/隐藏
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector(".relative.inline-block");
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

// 绑定和解绑事件
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative inline-block text-left" @click="toggleDropdown()">
    <div class="mx-2 md:mx-4 h-full cursor-pointer">
      <span class="rounded-md p-1">{{ localName }}</span>
    </div>

    <!-- Dropdown menu -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 top-12 min-w-32 rounded-sm shadow-lg z-20 bg-gray-950"
    >
      <!-- 我的主页 -->
      <NuxtLink
        v-for="lc in locales"
        :key="lc.code"
        :to="switchLocalePath(lc.code)"
        @click="localName = lc.name"
      >
        <div
          class="p-1 hover:bg-gray-800 text-center rounded-sm"
          :class="{ 'bg-gray-600': lc.code === locale }"
        >
          {{ lc.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
