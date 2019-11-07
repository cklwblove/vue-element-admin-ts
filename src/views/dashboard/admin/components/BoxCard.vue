<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb"/>
      <mallki class-name="mallki-text" text="vue-element-admin-ts"/>
      <div style="padding-top:35px;" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="70"/>
      </div>
      <div class="progress-item">
        <span>JavaScript</span>
        <el-progress :percentage="18"/>
      </div>
      <div class="progress-item">
        <span>Css</span>
        <el-progress :percentage="12"/>
      </div>
      <div class="progress-item">
        <span>ESLint</span>
        <el-progress :percentage="100" status="success"/>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  PanThumb,
  Mallki
} from '@/components';

@Component({
  name: 'BoxCard',
  components: {
    PanThumb,
    Mallki
  }
})
export default class BoxCard extends Vue {
  articleCount: number = 1024;
  pageViewsCount: number = 1024;

  get name() {
    return this.$store.getters.name;
  }

  get avatar() {
    return this.$store.getters.avatar;
  }

  get roles() {
    return this.$store.getters.roles;
  }
}
</script>

<style rel="stylesheet/less" lang="less">
  .box-card-component {
    .el-card__header {
      padding: 0px !important;
    }
  }
</style>

<style rel="stylesheet/less" lang="less" scoped>
  .box-card-component {
    .box-card-header {
      position: relative;
      height: 220px;

      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;

        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }

    .mallki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }

    .panThumb {
      z-index: 100;
      height: 70px !important;
      width: 70px !important;
      position: absolute !important;
      top: -45px;
      left: 0px;
      border: 5px solid #ffffff;
      background-color: #fff;
      margin: auto;
      box-shadow: none !important;

      /deep/ .pan-info {
        box-shadow: none !important;
      }
    }

    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }

    @media only screen and (max-width: 1510px) {
      .mallki-text {
        display: none;
      }
    }
  }
</style>
