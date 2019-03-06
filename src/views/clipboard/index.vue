<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;"/>
        <el-button type="primary" icon="document" @click="handleCopy(inputData,$event)">copy</el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;"/>
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import clip from '@/utils/clipboard';

  @Component
  export default class Clipboard extends Vue {
    activeName: string = 'directly';
    inputData: string = 'https://github.com/PanJiaChen/vue-element-admin';

    handleCopy(text, event) {
      clip(text, event);
    }

    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      });
    }
  }
</script>
