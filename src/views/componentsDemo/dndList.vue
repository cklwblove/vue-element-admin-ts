<template>
  <div class="components-container">
    <code>drag-list base on
      <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
    </code>
    <div class="editor-container">
      <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {
    DndList
  } from '@/components';
  import {SUCCESS_STATUS} from '@/constant';

  @Component({
    components: {
      DndList
    }
  })
  export default class DndListView extends Vue {
    list1: any[] = [];
    list2: any[] = [];

    created() {
      this.getData();
    }

    getData() {
      this.$services.articleList({method: 'get'}).then((response) => {
        const {code, data} = response;
        if (code === SUCCESS_STATUS) {
          this.list1 = data.items.splice(0, 5);
          this.list2 = data.items;
        } else {
          this.list1 = [];
          this.list2 = [];
        }
      });
    }
  }
</script>
