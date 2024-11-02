<template>
  <div
    class="w-full h-16 bg-gray-950 fixed top-0 left-0 flex justify-between items-center transition-transform duration-500 ease-in-out transform"
    :class="isMenuVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    <div class="w-1/2 flex items-center h-full">
      <a class="px-4 md:pl-8 text-lg md:text-xl" href="/">
        {{ $t("title") }}
      </a>
      <a
        class="h-full flex justify-center items-center px-4 hover:bg-gray-800 case-in-out duration-300"
        href="/donate"
        >{{ $t("menu.donate") }}
      </a>
    </div>

    <!-- <div class="w-1/2 flex h-full"></div> -->

    <div class="w-1/2 h-full flex justify-end items-center">
      <a href="https://github.com/dingdangdog/dingdangdog.github.io">
        <span><IconGithub class="w-8 h-8" :color="`rgb(243 244 246)`" /></span>
      </a>
      <LocaleSelect />
    </div>
  </div>
</template>

<script setup lang="ts">
const isMenuVisible = ref(true); // 控制菜单是否可见
let lastScrollPosition = 0;
const threshold = 5; // 设置滚动的最小距离阈值

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  // 检测滚动方向并且需要滚动超过指定的阈值
  if (Math.abs(currentScrollPosition - lastScrollPosition) > threshold) {
    if (currentScrollPosition > lastScrollPosition) {
      // 向下滚动，隐藏菜单
      isMenuVisible.value = false;
    } else {
      // 向上滚动，显示菜单
      isMenuVisible.value = true;
    }
  }
  lastScrollPosition = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
header.hidden {
  transform: translateY(-100%);
}

header.visible {
  transform: translateY(0);
}
</style>
