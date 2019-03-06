<template>
  <div class="app-container">
    <code style="margin-top:15px;">{{ $t('pdf.tips') }}</code>
    <router-link target="_blank" to="/pdf/download">
      <el-button type="primary">Click to download PDF</el-button>
    </router-link>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Pdf extends Vue {
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
