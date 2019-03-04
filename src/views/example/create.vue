<template>
  <article-detail :is-edit="false"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ArticleDetail from './components/ArticleDetail.vue';

  @Component({
    components: {
      ArticleDetail
    }
  })
  export default class Create extends Vue {
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
