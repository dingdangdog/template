<template>
  <div class="website-card" @click="openLink(website.url)">
    <div class="website-image">
      <img :src="website.avatar" :alt="website.title" class="website-avatar" />
    </div>
    <div class="website-content">
      <h3 class="website-info">{{ website.title }}</h3>
      <p class="website-info">{{ website.desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { website } = defineProps(["website"]);

const openLink = (url: string) => {
  window.open(url, "_blank");
};
</script>

<style scoped>
.website-card {
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.website-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.website-image img {
  max-width: 3rem;
  height: auto;
  display: block;
}

.website-content {
  flex: 1;
  padding: 0.5rem;
  width: 10rem;
}

@media screen and (max-width: 1440px) {
  .website-content {
    width: 12rem;
  }
}
@media screen and (max-width: 1080px) {
  .website-content {
    width: 10rem;
  }
}
@media screen and (max-width: 680px) {
  .website-content {
    width: 6rem;
  }
}

.website-content h3 {
  margin: 0;
  font-size: 1rem;
}

.website-content p {
  margin: 8px 0 0;
  color: #666;
}

.website-info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
