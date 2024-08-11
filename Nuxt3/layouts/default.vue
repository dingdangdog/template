<template>
  <div>
    <AppHeader :isVisible="headerVisible" />
    <main>
      <AppLeft :isHeadVisible="headerVisible" />
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
const headerVisible = ref("visible");
const lastScrollY = ref(0);
onMounted(() => {
  // console.log("onMounted");
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
const handleScroll = () => {
  // console.log("handleScroll");
  const currentScrollY = window.scrollY;
  if (lastScrollY.value - currentScrollY > 60) {
    // 向上滚动
    headerVisible.value = "visible";
    lastScrollY.value = currentScrollY;
    // console.log(headerVisible.value);
  } else if (lastScrollY.value - currentScrollY < -60) {
    // 向下滚动
    headerVisible.value = "hidden";
    lastScrollY.value = currentScrollY;
    // console.log(headerVisible.value);
  }
};
</script>
