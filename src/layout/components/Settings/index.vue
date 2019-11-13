<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t('settings.title') }}</h3>

      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange"/>
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.tagsView') }}</span>
        <el-switch v-model="tagsViewModel" class="drawer-switch"/>
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeaderModel" class="drawer-switch"/>
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.sidebarLogo') }}</span>
        <el-switch v-model="sidebarLogoModel" class="drawer-switch"/>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ThemePicker } from '@/components';
  import { SettingsModule } from '@/store/modules/settings';

  @Component({
    name: 'Settings',
    components: {
      ThemePicker
    }
  })
  export default class Settings extends Vue {

    get fixedHeaderModel() {
      return this.$store.getters.fixedHeader;
    }

    set fixedHeaderModel(val) {
      SettingsModule.ChangeSetting({
        key: 'fixedHeader',
        value: val
      });
    }

    get tagsViewModel() {
      return this.$store.getters.tagsView;
    }

    set tagsViewModel(val) {
      SettingsModule.ChangeSetting({
        key: 'tagsView',
        value: val
      });
    }

    get sidebarLogoModel() {
      return this.$store.getters.sidebarLogo;
    }

    set sidebarLogoModel(val) {
      SettingsModule.ChangeSetting({
        key: 'sidebarLogo',
        value: val
      });
    }

    themeChange(val) {
      SettingsModule.ChangeSetting({
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
