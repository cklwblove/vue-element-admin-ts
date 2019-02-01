<template>
  <div id="app">
    <div class="pages">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component
  export default class App extends Vue {}
</script>

<style lang="less">
  @import "~@/assets/less/app.less";

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
