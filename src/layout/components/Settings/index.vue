<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t('settings.title') }}</h3>

      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange"/>
      </div>

      <!--<div class="drawer-item">-->
        <!--<span>{{ $t('settings.tagsView') }}</span>-->
        <!--<el-switch v-model="tagsView" class="drawer-switch"/>-->
      <!--</div>-->

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch"/>
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.sidebarLogo') }}</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch"/>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import {
    Getter,
    Action
  } from 'vuex-class';
  import { Component, Vue } from 'vue-property-decorator';
  import { ThemePicker } from '@/components';

  @Component({
    components: {
      ThemePicker
    }
  })
  export default class Settings extends Vue {
    // @Getter fixedHeader;
    // @Getter tagsView;
    // @Getter sidebarLogo;
    @Action('ChangeSetting') actionChangeSetting;

    mounted() {
      console.log('this.$store', this.$store);
    }

    set fixedHeader(val) {
      this.actionChangeSetting({
        key: 'fixedHeader',
        value: val
      });
    }

    // set tagsView(val) {
    //   this.actionChangeSetting({
    //     key: 'tagsView',
    //     value: val
    //   });
    // }

    set sidebarLogo(val) {
      this.actionChangeSetting({
        key: 'sidebarLogo',
        value: val
      });
    }

    themeChange(val) {
      this.actionChangeSetting({
        key: 'theme',
        value: val
      });
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, .85);
      font-size: 14px;
      line-height: 22px;
    }

    .drawer-item {
      color: rgba(0, 0, 0, .65);
      font-size: 14px;
      padding: 12px 0;
    }

    .drawer-switch {
      float: right
    }
  }
</style>
