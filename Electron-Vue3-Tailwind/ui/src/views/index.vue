<template>
  <div id="website-container">
    <div id="oldmoon">
      <div class="links-tag">oldmoon</div>
      <div class="links">
        <WebsiteCard
          v-for="(website, index) in webList"
          :key="index"
          :website="website"
        ></WebsiteCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WebsiteCard from "@/components/WebsiteCard.vue";
import local from "@/utils/local";

const webList = ref([]);
local("test", "null").then((res) => {
  console.log(res)
  webList.value = res;
});
</script>

<style scoped>
#website-container {
  width: 100%;
}

.links-tag {
  position: relative;
  top: 1rem;
  left: 1rem;
  width: 12rem;
}
</style>
