<template>
  <div class="app-container">

    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple">apple</el-checkbox>
        <el-checkbox label="banana">banana</el-checkbox>
        <el-checkbox label="orange">orange</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" :key="key" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180"/>
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';

  const defaultFormThead: string[] = ['apple', 'banana'];

  @Component
  export default class FixedThead extends Vue {
    tableData: any = [
      {
        name: 'fruit-1',
        apple: 'apple-10',
        banana: 'banana-10',
        orange: 'orange-10'
      },
      {
        name: 'fruit-2',
        apple: 'apple-20',
        banana: 'banana-20',
        orange: 'orange-20'
      }
    ];
    // table key
    key: number = 1;
    formTheadOptions: string[] = ['apple', 'banana', 'orange'];
    // checkboxVal
    checkboxVal: string[] = defaultFormThead;
    // 默认表头 Default header
    formThead: string[] = defaultFormThead;

    @Watch('checkboxVal')
    onCheckboxValChange(valArr) {
      this.formThead = this.formTheadOptions.filter((i) => valArr.indexOf(i) >= 0);
      // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
      this.key = this.key + 1;
    }
  }
</script>
