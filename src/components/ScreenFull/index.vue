<template>
  <svg-icon :name="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"/>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ScreenFull extends Vue {
  public isFullscreen: boolean = false;

  public click() {
    if (!screenfull.enabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      });
      return false;
    }
    screenfull.toggle().then(() => {
      this.isFullscreen = screenfull.isFullscreen;
    });
  }
}
</script>

<style scoped>
  .screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
  }
</style>
