<template>
  <article-detail :is-edit="true"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ArticleDetail from './components/ArticleDetail.vue';

  @Component({
    components: {
      ArticleDetail
    }
  })
  export default class Edit extends Vue {
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
