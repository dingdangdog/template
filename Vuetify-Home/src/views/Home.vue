<template>
  <v-layout>
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main id="offcial-main">
      <v-app-bar>
        <template v-slot:prepend>
          <v-avatar>
            <v-icon icon="mdi-alarm"></v-icon>
          </v-avatar>
          <v-app-bar-title>Application bar</v-app-bar-title>
        </template>
        <template v-slot:title>
          <v-tabs v-model="tab">
            <v-tab value="one">Item One</v-tab>
            <v-tab value="two">Item Two</v-tab>
            <v-tab value="three">Item Three</v-tab>
          </v-tabs>
        </template>
        <template v-slot:append>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
      </v-app-bar>

      <v-window v-model="tab">
        <v-window-item value="one"> <AboutView /> </v-window-item>
        <v-window-item value="two"> <AboutView /> </v-window-item>
        <v-window-item value="three"> <AboutView /> </v-window-item>
      </v-window>

      <v-footer class="text-center d-flex flex-column">
        <div>
          <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
        </div>

        <div class="pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
          interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed
          massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi
          vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
          sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </div>

        <v-divider></v-divider>

        <div>{{ new Date().getFullYear() }} — <strong>Vuetify</strong></div>
      </v-footer>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AboutView from './AboutView.vue'

const tab = ref(null)

const icons = ref(['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'])
</script>

<style scoped>
.v-navigation-drawer {
  border: 0 !important;
}
</style>
