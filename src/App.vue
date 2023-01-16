<script>
import { store } from './store';

import AppMessages from './components/AppMessages.vue';
import AppMenu from './views/AppMenu.vue';

export default {
  components: { 
    AppMessages,
    AppMenu
  },
  mounted() {
    store.loadData()
  },
}
</script>

<template>
  <div class="container">
    <app-menu></app-menu>
    <app-messages></app-messages>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
