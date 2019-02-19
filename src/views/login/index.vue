<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
        <lang-select class="set-language"/>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user"/>
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin">
        {{ $t('login.logIn') }}
      </el-button>

      <div style="position:relative">
        <div class="tips">
          <span>{{ $t('login.username') }} : admin</span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">
            {{ $t('login.username') }} : editor
          </span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          {{ $t('login.thirdparty') }}
        </el-button>
      </div>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign/>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { isvalidUsername } from '@/utils/validate';
  import SocialSign from './socialSignIn.vue';
  import { LangSelect } from '@/components';
  import { Route } from 'vue-router';
  import { ElForm } from 'element-ui/types/form';
  import { UserModule } from '@/store/modules/user';

  const validateUsername = (rule, value: string, callback) => {
    if (!isvalidUsername(value)) {
      callback(new Error('Please enter the correct user name'));
    } else {
      callback();
    }
  };
  const validatePassword = (rule, value: string, callback) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'));
    } else {
      callback();
    }
  };

  @Component({
    components: {
      SocialSign,
      LangSelect
    }
  })
  export default class Login extends Vue {
    private loginForm = {
      username: 'admin',
      password: '1111111'
    };

    private loginRules = {
      username: [{required: true, trigger: 'blur', validator: validateUsername}],
      password: [{required: true, trigger: 'blur', validator: validatePassword}]
    };

    private passwordType: string = 'password';
    private loading: boolean = false;
    private showDialog: boolean = false;
    private redirect: string | undefined = undefined;

    // watch
    @Watch('$route', {immediate: true})
    private onRouteChange(route: Route) {
      this.redirect = route.query && route.query.redirect as string;
    }

    private showPwd(): void {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    }

    private handleLogin(): void {
      (this.$refs.loginForm as ElForm).validate((valid) => {
        if (valid) {
          this.loading = true;
          UserModule.LoginByUsername(this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({path: this.redirect || '/'});
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
