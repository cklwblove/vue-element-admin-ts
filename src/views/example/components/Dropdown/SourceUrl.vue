<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      外链
      <i class="el-icon-caret-bottom el-icon--right"/>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding no-border" style="width:400px">
      <el-form-item label-width="0px" style="margin-bottom: 0px" prop="source_uri">
        <el-input v-model="sourceUri" placeholder="请输入内容">
          <template slot="prepend">填写url</template>
        </el-input>
      </el-form-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class SourceUrl extends Vue {
    @Prop({default: ''}) value!: string;

    get sourceUri() {
      return this.value;
    }

    set sourceUri(val) {
      this.$emit('input', val);
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
