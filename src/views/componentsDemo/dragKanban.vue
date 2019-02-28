<template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :options="options" class="kanban todo" header-text="Todo"/>
    <Kanban :key="2" :list="list2" :options="options" class="kanban working" header-text="Working"/>
    <Kanban :key="3" :list="list3" :options="options" class="kanban done" header-text="Done"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Kanban } from '@/components';

  @Component({
    components: {
      Kanban
    }
  })
  export default class DragKanban extends Vue {
    options: any = {
      group: 'mission'
    };
    list1: any[] = [
      {name: 'Mission', id: 1},
      {name: 'Mission', id: 2},
      {name: 'Mission', id: 3},
      {name: 'Mission', id: 4}
    ];
    list2: any[] = [
      {name: 'Mission', id: 5},
      {name: 'Mission', id: 6},
      {name: 'Mission', id: 7}
    ];
    list3: any[] = [
      {name: 'Mission', id: 8},
      {name: 'Mission', id: 9},
      {name: 'Mission', id: 10}
    ];
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .board {
    width: 1000px;
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
  }

  .kanban {
    &.todo {
      .board-column-header {
        background: #4A9FF9;
      }
    }

    &.working {
      .board-column-header {
        background: #f9944a;
      }
    }

    &.done {
      .board-column-header {
        background: #2ac06d;
      }
    }
  }
</style>
