<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container"><svg-icon name="wechat" class="icon"/></span> 微信
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container"><svg-icon name="qq" class="icon"/></span> QQ
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue } from 'vue-property-decorator';

  export default class SocialSignIn extends Vue {

    private wechatHandleClick(thirdpart) {
      alert('ok');
    }

    private tencentHandleClick(thirdpart) {
      alert('ok');
    }
  }
</script>

<style rel="stylesheet/less" scoped>
  .social-signup-container {
    margin: 20px 0;
  }

  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }

  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }

  .wx-svg-container {
    background-color: #24da70;
  }

  .qq-svg-container {
    background-color: #6BA2D6;
    margin-left: 50px;
  }
</style>
