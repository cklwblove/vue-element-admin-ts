<template>
  <div style="display:inline-block;">
    <label class="radio-label">Cell Auto-Width: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>True</el-radio>
      <el-radio :label="false" border>False</el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class FilenameOption extends Vue {
    @Prop({default: true}) value!: boolean;

    get autoWidth() {
      return this.value;
    }

    set autoWidth(val) {
      this.$emit('input', val);
    }
  }
</script>
