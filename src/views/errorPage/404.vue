<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/img/404_images/404.png" alt="404">
        <img class="pic-404__child left" src="@/assets/img/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="@/assets/img/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="@/assets/img/404_images/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">版权所有
          <a class="link-type" href="https://wallstreetcn.com" target="_blank">华尔街见闻</a>
        </div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <router-link to="/" class="bullshit__return-home">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import errGif from '@/assets/img/404_images/404.gif';

  @Component
  export default class ErrorPage404 extends Vue {
    get message() {
      return '网管说这个页面你不能进......';
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
