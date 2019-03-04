<template>
  <div class="components-container">

    <el-drag-select v-model="value" style="width:500px;" multiple placeholder="请选择">
      <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"/>
    </el-drag-select>

    <div style="margin-top:30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right:15px;">{{ item }}</el-tag>
    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {
    ElDragSelect
  } from '@/components';

  @Component({
    components: {
      ElDragSelect
    }
  })
  export default class DragSelectView extends Vue {
    value: string[] = ['Apple', 'Banana', 'Orange'];
    options: any[] = [{
      value: 'Apple',
      label: 'Apple'
    }, {
      value: 'Banana',
      label: 'Banana'
    }, {
      value: 'Orange',
      label: 'Orange'
    }, {
      value: 'Pear',
      label: 'Pear'
    }, {
      value: 'Strawberry',
      label: 'Strawberry'
    }];
  }
</script>
