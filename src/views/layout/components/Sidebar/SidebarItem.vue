<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon"
                :title="generateTitle(onlyOneChild.meta.title)"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="generateTitle(item.meta.title)"/>
      </template>

      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            class="nest-menu"/>

          <app-link v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)"/>
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </el-submenu>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import path from 'path';
import { isExternal } from '@/utils';
import Item from './Item.vue';
import AppLink from './Link.vue';
import FixiOSBug from './FixiOSBug';

// TODO 侧边栏没有 tooltip 显示
@Component({
  components: {
    Item,
    AppLink
  },
  mixins: [FixiOSBug]
})
export default class SidebarItem extends Vue {
  @Prop({required: true, default: {}}) item!: Route;
  @Prop({default: false}) isNest!: boolean;
  @Prop({default: ''}) basePath!: string;

  onlyOneChild: null = null;

  hasOneShowingChild(children, parent) {
    const showingChildren = children.filter((item) => {
      if (item.hidden) {
        return false;
      } else {
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item;
        return true;
      }
    });

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true;
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      this.onlyOneChild = {...parent, path: '', noShowingChildren: true};
      return true;
    }

    return false;
  }

  resolvePath(routePath) {
    if (this.isExternalLink(routePath)) {
      return routePath;
    }
    return path.resolve(this.basePath, routePath);
  }

  isExternalLink(routePath) {
    return isExternal(routePath);
  }

  generateTitle(title) {
    const hasKey = this.$te('route.' + title);
    // console.log('generateTitle', title);
    if (hasKey) {
      // $t :this method from vue-i18n, inject in @/lang/index.js
      const translatedTitle = this.$t('route.' + title);

      return translatedTitle;
    }
    return title;
  }
}
</script>

