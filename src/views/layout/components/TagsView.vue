<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ generateTitle(tag.title) }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { generateTitle } from '@/utils/i18n';
import { TagsViewModule } from '@/store/modules/tagsView';
import {
  ScrollPane
} from '@/components';

@Component({
  components: {
    ScrollPane
  }
})
export default class TagsView extends Vue {
  public visible: boolean = false;
  public top: number = 0;
  public left: number = 0;
  public selectedTag: any = {};

  get visitedViews() {
    return this.$store.getters.visitedViews;
  }

  @Watch('$route')
  public onRouteChange() {
    this.addViewTags();
    this.moveToCurrentTag();
  }

  @Watch('visible')
  public onVisibleChange(value) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
  }

  public mounted() {
    this.addViewTags();
  }

  public generateTitle(title) {
    const hasKey = this.$te('route.' + title);

    if (hasKey) {
      // $t :this method from vue-i18n, inject in @/lang/index.js
      const translatedTitle = this.$t('route.' + title);

      return translatedTitle;
    }
    return title;
  }

  public isActive(route) {
    return route.path === this.$route.path;
  }

  public addViewTags() {
    const {name} = this.$route;
    if (name) {
      TagsViewModule.AddView(this.$route);
    }
    return false;
  }

  public moveToCurrentTag() {
    const tags = this.$refs.tag;
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          this.$refs.scrollPane.moveToTarget(tag);

          // when query is different then update
          if (tag.to.fullPath !== this.$route.fullPath) {
            TagsViewModule.UpdateVisitedView(this.$route);
          }
          break;
        }
      }
    });
  }

  public refreshSelectedTag(view) {
    TagsViewModule.DelCachedView(view).then(() => {
      const {fullPath} = view;
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        });
      });
    });
  }

  public closeSelectedTag(view) {
    TagsViewModule.DelView(view).then(({visitedViews}) => {
      if (this.isActive(view)) {
        const latestView = visitedViews.slice(-1)[0];
        if (latestView) {
          this.$router.push(latestView);
        } else {
          this.$router.push('/');
        }
      }
    });
  }

  public closeOthersTags() {
    this.$router.push(this.selectedTag);
    TagsViewModule.DelOthersViews(this.selectedTag).then(() => {
      this.moveToCurrentTag();
    });
  }

  public closeAllTags() {
    TagsViewModule.DelAllViews();
    this.$router.push('/');
  }

  public openMenu(tag, e) {
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
    const offsetWidth = this.$el.offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = e.clientX - offsetLeft + 15; // 15: margin right

    if (left > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left;
    }
    this.top = e.clientY;

    this.visible = true;
    this.selectedTag = tag;
  }

  public closeMenu() {
    this.visible = false;
  }

}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;

          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style rel="stylesheet/less" lang="less">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
