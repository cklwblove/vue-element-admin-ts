<template>
  <div>
    <svg-icon :name="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"/>
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ScreenFull extends Vue {
  isFullscreen: boolean = false;

  click() {
    if (screenfull) {
      if (!(screenfull as any).enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        });
        return false;
      }
      (screenfull as any).toggle().then(() => {
        this.isFullscreen = (screenfull as any).isFullscreen;
      });
    }

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
