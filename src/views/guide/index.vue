<template>
  <div class="app-container">
    <p class="warn-content">
      {{ $t('guide.description') }}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.
      </a>
    </p>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">{{ $t('guide.button') }}</el-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Driver from 'driver.js';
  import 'driver.js/dist/driver.min.css';
  import steps from './defineSteps';

  @Component
  export default class Guide extends Vue {
    public driver: any = null;

    public mounted() {
      this.driver = new Driver();
    }

    public guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
