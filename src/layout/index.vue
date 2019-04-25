<template>
  <div :class="classObj" class="app-wrapper">
    <!--侧边栏出现的遮罩-->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar/>
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main/>
      <right-panel v-if="showSettings">
        <settings/>
      </right-panel>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { RightPanel } from '@/components';
  import { Navbar, Sidebar, AppMain, TagsView, Settings } from './components';
  import { AppModule, DeviceType } from '@/store/modules/app';
  import ResizeMixin from './mixin/ResizeHandler';

  @Component({
    components: {
      Navbar,
      RightPanel,
      Sidebar,
      AppMain,
      TagsView,
      Settings
    },
    mixins: [ResizeMixin]
  })
  export default class Layout extends Vue {

    get sidebar() {
      return this.$store.getters.sidebar;
    }

    get device() {
      return this.$store.getters.device;
    }

    get showSettings() {
      return this.$store.getters.showSettings;
    }

    get needTagsView() {
      return this.$store.getters.tagsView;
    }

    get fixedHeader() {
      return this.$store.getters.fixedHeader;
    }

    get classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === DeviceType.Mobile
      };
    }

    handleClickOutside() {
      AppModule.CloseSideBar(false);
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "~mixins";

  .app-wrapper {
    .clearfix();
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 210px);
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
