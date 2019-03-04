<template>
  <el-select ref="dragSelect" v-model="selectVal" v-bind="$attrs" class="drag-select" multiple v-on="$listeners">
    <slot/>
  </el-select>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import {ElSelect} from 'element-ui/types/select';
  import Sortable from 'sortablejs';

  @Component
  export default class DragSelect extends Vue {
    @Prop({required: true}) value!: any[];

    get selectVal() {
      return [...this.value];
    }

    set selectVal(val) {
      this.$emit('input', [...val]);
    }

    mounted() {
      this.setSort();
    }

    setSort() {
      const el = (this.$refs.dragSelect as ElSelect).$el.querySelectorAll('.el-select__tags > span')[0] as HTMLElement;
      const sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: (dataTransfer) => {
          dataTransfer.setData('Text', '');
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: (evt: any) => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0];
          this.value.splice(evt.newIndex, 0, targetRow);
        }
      });
    }
  }
</script>

<style scoped>
  .drag-select >>> .sortable-ghost {
    opacity: .8;
    color: #fff !important;
    background: #42b983 !important;
  }

  .drag-select >>> .el-tag {
    cursor: pointer;
  }
</style>
