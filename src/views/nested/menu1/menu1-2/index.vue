<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-2" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Menu1 extends Vue {}
</script>
