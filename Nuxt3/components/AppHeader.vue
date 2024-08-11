<template>
  <header :class="isVisible">
    <h1>
      {{ $t("title", { ait: "@" }) }}
    </h1>

    <div class="language-switcher">
      <!-- <h2>{{ nowLocal.name }}</h2> -->
      <!-- <select v-model="nowLocal.code" @change="changeLocal(nowLocal.code)">
        <option
          v-for="locale in locales"
          :key="locale.code"
          :value="locale.code"
        >
            {{ locale.name }}
        </option>
      </select> -->
      <NuxtLink
        v-for="lc in locales"
        :key="lc.code"
        :to="switchLocalePath(lc.code)"
      >
        <span v-if="lc.code !== locale">{{ lc.name }}</span>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();
const nowLocal = ref();
const switchLocalePath = useSwitchLocalePath();

const changeLocal = (code: string) => {
  console.log(switchLocalePath(code));
  window.location.pathname = switchLocalePath(code);
};

locales.value.forEach((i) => {
  if (i.code === locale.value) {
    nowLocal.value = i;
    return;
  }
});

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const { isVisible } = defineProps(["isVisible"]);
</script>

<style scoped>
header.hidden {
  transform: translateY(-100%);
}

header.visible {
  transform: translateY(0);
}
</style>
