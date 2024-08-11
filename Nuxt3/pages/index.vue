<template>
  <div id="website-container">
    <div id="oldmoon">
      <div class="links-tag">oldmoon</div>
      <div class="links">
        <WebsiteCard
          v-for="website in webList.data.value"
          :key="website.title"
          :website="website"
        ></WebsiteCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const webList = await useFetch("/api/tags");
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
