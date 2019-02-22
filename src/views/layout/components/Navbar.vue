<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search class="right-menu-item"/>

        <error-log class="errLog-container right-menu-item hover-effect"/>

        <screen-full class="right-menu-item hover-effect"/>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="right-menu-item hover-effect"/>
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect"/>

        <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="right-menu-item hover-effect"/>
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  Getter,
  Action
} from 'vuex-class';
// import { UserModule } from '@/store/modules/user';
// import { AppModule } from '@/store/modules/app';
import {
  Breadcrumb,
  Hamburger,
  ErrorLog,
  ScreenFull,
  SizeSelect,
  LangSelect,
  ThemePicker,
  Search
} from '@/components';

@Component({
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    ScreenFull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    Search
  }
})
export default class Navbar extends Vue {
  // 不支持
  // mapGetters([
  //   'sidebar',
  //   'name',
  //   'avatar',
  //   'device'
  // ])
  @Getter public sidebar;
  @Getter public name;
  @Getter public avatar;
  @Getter public device;
  @Action('ToggleSideBar') public actionToggleSideBar;
  @Action('LogOut') public actionLogOut;

  public toggleSideBar() {
    this.actionToggleSideBar(false);
    // AppModule.ToggleSideBar(false);
  }

  public logout() {
    this.actionLogOut().then(() => {
      // In order to re-instantiate the vue-router object to avoid bugs
      location.reload();
    });
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

