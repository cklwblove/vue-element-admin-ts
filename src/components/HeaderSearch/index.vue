<template>
  <div :class="{'show':show}" class="header-search">
    show {{show}}
    <svg-icon name="search" class="search-icon" @click="click"/>
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change">
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')"/>
    </el-select>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { ElSelect } from 'element-ui/types/select';
  import Fuse from 'fuse.js';
  import path from 'path';
  import i18n from '@/lang';

  @Component({
    name: 'Search'
  })
  export default class HeaderSearch extends Vue {
    public search: string = '';
    public options: any[] = [];
    public searchPool: any[] = [];
    public show: boolean = false;
    public fuse: any = null;

    get routers() {
      return this.$store.getters.permission_routers;
    }

    get lang() {
      return this.$store.getters.language;
    }

    @Watch('lang')
    public onLangChange() {
      this.searchPool = this.generateRouters(this.routers);
    }

    @Watch('routers')
    public onRoutersChange() {
      this.searchPool = this.generateRouters(this.routers);
    }

    @Watch('searchPool')
    public onSearchPoolChange(list) {
      this.initFuse(list);
    }

    @Watch('show')
    public onShowChange(value) {
      // TODO 这里 addEventListener 会被立刻执行，所以迁移到了created
      console.log('onShowChange value', value);
    }

    public created() {
      document.body.addEventListener('click', this.close);
    }

    public mounted() {
      this.searchPool = this.generateRouters(this.routers);
    }

    public click(e) {
      e.stopPropagation();
      this.show = !this.show;
      console.log('click', this.show);
      if (this.show) {
        const searchSelect = this.$refs.headerSearchSelect as ElSelect;
        searchSelect && searchSelect.focus();
      }
    }

    public close() {
      if (this.show) {
        const searchSelect = this.$refs.headerSearchSelect as ElSelect;
        searchSelect && searchSelect.blur();
        this.options = [];
        this.show = false;
      }
    }

    public change(val) {
      this.$router.push(val.path);
      this.search = '';
      this.options = [];
      this.$nextTick(() => {
        this.show = false;
      });
    }

    public initFuse(list) {
      const options: any = {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      };

      this.fuse = new Fuse(list, options);
    }

    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    public generateRouters(routers, basePath = '/', prefixTitle: any[] = []) {
      let res: any[] = [];

      for (const router of routers) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        };

        if (router.meta && router.meta.title) {
          // generate internationalized title
          const i18nTitle = i18n.t(`route.${router.meta.title}`);

          data.title = [...data.title, i18nTitle];

          if (router.redirect !== 'noredirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routers
        if (router.children) {
          const tempRouters = this.generateRouters(router.children, data.path, data.title);
          if (tempRouters.length >= 1) {
            res = [...res, ...tempRouters];
          }
        }
      }
      return res;
    }

    public querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    }

    public beforeDestroy() {
      document.body.removeEventListener('click', this.close);
    }
  }
</script>

<style lang="less" scoped>
  .header-search {
    font-size: 0 !important;

    .search-icon {
      cursor: pointer;
      font-size: 18px;
      vertical-align: middle;
    }

    .header-search-select {
      font-size: 18px;
      transition: width 0.2s;
      width: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      /deep/ .el-input__inner {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }

    &.show {
      .header-search-select {
        width: 210px;
        margin-left: 10px;
      }
    }
  }
</style>
