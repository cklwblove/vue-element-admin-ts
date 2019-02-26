<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { scrollTo } from '@/utils/scrollTo';

  @Component
  export default class Pagination extends Vue {
    @Prop({required: true}) total!: number;
    @Prop({default: 1}) page!: number;
    @Prop({default: 20}) limit!: number;
    @Prop({default: [10, 20, 30, 50]}) pageSizes!: number[];
    @Prop({default: 'total, sizes, prev, pager, next, jumper'}) layout!: string;
    @Prop({default: true}) background!: boolean;
    @Prop({default: true}) autoScroll!: boolean;
    @Prop({default: false}) hidden!: boolean;

    get currentPage() {
      return this.page;
    }

    @Emit('update:page')
    set currentPage(val) {
      this.page = val;
    }

    get pageSize() {
      return this.limit;
    }

    @Emit('update:limit')
    set pageSize(val) {
      this.limit = val;
    }

    handleSizeChange(val) {
      this.$emit('pagination', {page: this.currentPage, limit: val});
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }

    handleCurrentChange(val) {
      this.$emit('pagination', {page: val, limit: this.pageSize});
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  }
</script>

<style scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
  }

  .pagination-container.hidden {
    display: none;
  }
</style>
