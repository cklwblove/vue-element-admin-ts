<template>
  <div id="app">
    <router-view />
    <service-worker-update-popup />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue';

@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
  @import "~@/assets/less/app.less";
</style>
