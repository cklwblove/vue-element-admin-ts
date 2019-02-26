import { VuexModule, Module, Action, Mutation, getModule, MutationAction } from 'vuex-module-decorators';
import { setToken, getToken, removeToken } from '@/utils/auth';
import services from '@/services';
import store from '@/store';
import { PermissionModule } from '@/store/modules/permission';
import router from '@/router';

const permissionModule = PermissionModule;

export interface IUserState {
  user: string;
  status: string;
  code: string;
  token: any;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
  setting: {
    articlePlatform: string[]
  };
}

@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
  user = '';
  status = '';
  code = '';
  token = getToken();
  name = '';
  avatar = '';
  introduction = '';
  roles = [];
  setting = {
    articlePlatform: []
  };

  @Mutation
  SET_CODE(code) {
    this.code = code;
  }

  @Mutation
  SET_TOKEN(token) {
    this.token = token;
  }

  @Mutation
  SET_INTRODUCTION(introduction) {
    this.introduction = introduction;
  }

  @Mutation
  SET_SETTING(setting) {
    this.setting = setting;
  }

  @Mutation
  SET_STATUS(status) {
    this.status = status;
  }

  @Mutation
  SET_NAME(name) {
    this.name = name;
  }

  @Mutation
  SET_AVATAR(avatar) {
    this.avatar = avatar;
  }

  @Mutation
  SET_ROLES(roles) {
    this.roles = roles;
  }

  // action
  // 用户名登录
  @Action({commit: 'SET_TOKEN'})
  async LoginByUsername(userInfo: { username: string, password: string }) {
    const username = userInfo.username.trim();
    const {token} = await services.loginByUsername({
      data: {
        username,
        password: userInfo.password
      }
    });
    console.log('LoginByUsername token', token);
    setToken(token);
    return token;
  }

  // 获取用户信息
  @MutationAction({mutate: ['roles', 'name', 'avatar']})
  async GetUserInfo() {
    const {roles, name, avatar} = await services.getUserInfo({
      method: 'get',
      data: {
        token: getToken()
      }
    });
    if (roles && roles.length) {
      // TODO 动态生成路由
      PermissionModule.GenerateRoutes({roles}).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
      });
      return {
        roles,
        name,
        avatar
      };
    } else {
      throw Error('getInfo: roles must be a non-null array!');
    }
  }

  // 登出
  @MutationAction({mutate: ['token', 'roles']})
  async LogOut() {
    await services.logout({});
    removeToken();
    return {
      token: '',
      roles: []
    };
  }

  @Action({commit: 'SET_TOKEN'})
  async FedLogOut() {
    removeToken();
    return '';
  }

  // 动态修改权限
  @MutationAction({mutate: ['token', 'roles', 'name', 'avatar', 'introduction']})
  async ChangeRoles(role: string) {
    setToken(role);
    const res = await services.getUserInfo({
      method: 'get',
      data: {
        token: role
      }
    });
    console.log('ChangeRoles res', res);
    permissionModule.GenerateRoutes(res);
    return {
      token: role,
      roles: res.roles,
      name: res.name,
      avatar: res.avatar,
      introduction: res.introduction
    };
  }
}

export const UserModule = getModule(User);

