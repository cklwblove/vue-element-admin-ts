<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SidebarItem from './SidebarItem.vue';
  import Logo from './Logo.vue';
  import variable from '@/assets/js/variable';

  @Component({
    name: 'Sidebar',
    components: {
      SidebarItem,
      Logo
    }
  })
  export default class Sidebar extends Vue {
    get permission_routers() {
      return this.$store.getters.permission_routers;
    }

    get variables() {
      return variable;
    }

    get activeMenu() {
      const route = this.$route;
      const {meta, path} = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }

    get showLogo() {
      return this.$store.getters.sidebarLogo;
    }

    get isCollapse() {
      return !this.$store.getters.sidebar.opened;
    }
  }
</script>


