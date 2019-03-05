<template>
  <div style="display:inline-block;">
    <label class="radio-label">Book Type: </label>
    <el-select v-model="bookType" style="width:120px;">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"/>
    </el-select>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class BookTypeOption extends Vue {
    @Prop({default: 'xlsx'}) value!: string;

    options: string[] = ['xlsx', 'csv', 'txt'];

    get bookType() {
      return this.value;
    }

    set bookType(val) {
      this.$emit('input', val);
    }
  }
</script>
