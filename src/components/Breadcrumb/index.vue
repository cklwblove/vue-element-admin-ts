<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{
        generateTitle(item.meta.title) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { generateTitle } from '@/utils/i18n';
import { RouteRecord } from 'vue-router';
import pathToRegexp from 'path-to-regexp';

@Component
export default class Breadcrumb extends Vue {
  public levelList: RouteRecord[] = [];

  public created() {
    this.getBreadcrumb();
  }

  public generateTitle(title) {
    generateTitle(title);
  }

  public getBreadcrumb() {
    let matched = this.$route.matched.filter((item) => item.name);

    const first: RouteRecord = matched[0];
    if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
      matched = [{path: '/dashboard', meta: {title: 'dashboard'}} as RouteRecord].concat(matched);
    }

    this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
  }

  public pathCompile(path) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const {params} = this.$route;
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  }

  public handleLink(item) {
    const {redirect, path} = item;
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }

  @Watch('$route')
  private onRouteChange() {
    this.getBreadcrumb();
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
