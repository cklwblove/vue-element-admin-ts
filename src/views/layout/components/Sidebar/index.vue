<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SidebarItem from './SidebarItem.vue';
  import variable from '@/assets/js/variable';

  @Component({
    components: {
      SidebarItem
    }
  })
  export default class Sidebar extends Vue {
    get permission_routers() {
      return this.$store.getters.permission_routers;
    }

    get variables() {
      return variable;
    }

    get isCollapse() {
      return !this.$store.getters.sidebar.opened;
    }
  }
</script>


