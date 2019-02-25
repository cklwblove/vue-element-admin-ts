<template>
  <div></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ErrorTestB extends Vue {
    public created() {
      // @ts-ignore
      this.b = b; // eslint-disable-line
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
