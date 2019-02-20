<template>
  <div :class="classObj" class="app-wrapper">
    <!--侧边栏出现的遮罩-->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Navbar, Sidebar, AppMain, TagsView } from './components';
import { AppModule, DeviceType } from '@/store/modules/app';
import ResizeMixin from './mixin/ResizeHandler';

@Component({
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
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

  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    };
  }

  public handleClickOutside() {
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
</style>
