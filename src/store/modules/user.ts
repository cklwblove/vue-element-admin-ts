import { VuexModule, Module, Action, Mutation, getModule, MutationAction } from 'vuex-module-decorators';
import { setToken, getToken, removeToken } from '@/utils/auth';
import services from '@/services';
import store from '@/store';
import { PermissionModule } from '@/store/modules/permission';
import router, { resetRouter } from '@/router';
import { SUCCESS_STATUS } from '@/constant';

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
    const res = await services.loginByUsername({
      data: {
        username,
        password: userInfo.password
      }
    });
    const {code, data} = res;
    if (code === SUCCESS_STATUS) {
      const {token} = data;
      setToken(token);
    }
  }

  // 获取用户信息
  @MutationAction({mutate: ['roles', 'name', 'avatar', 'introduction']})
  async GetUserInfo() {
    const {code, data} = await services.getUserInfo({
      method: 'get',
      data: {
        token: getToken()
      }
    });
    if (!data) {
      throw Error('Verification failed, please Login again.');
    }
    if (code === SUCCESS_STATUS) {
      const {roles, name, avatar, introduction} = data;
      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        throw Error('getInfo: roles must be a non-null array!');
      }
      // console.log('roles', roles);
      // TODO 动态生成路由
      PermissionModule.GenerateRoutes(roles).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
      });
      return {
        roles,
        name,
        avatar,
        introduction
      };
    }
    return {
      roles: [],
      name: '',
      avatar: '',
      introduction: ''
    };
  }

  // 登出
  @MutationAction({mutate: ['token', 'roles']})
  async LogOut() {
    await services.logout({});
    removeToken();
    resetRouter();
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
    const token = role + '-token';

    setToken(token);

    const {code, data} = await services.getUserInfo({
      method: 'get',
      data: {
        token: role
      }
    });
    if (code === SUCCESS_STATUS) {
      const {roles} = data;
      console.log('ChangeRoles data', data);
      resetRouter();
      permissionModule.GenerateRoutes(roles);
    }

    return {
      token,
      roles: data.roles,
      name: data.name,
      avatar: data.avatar,
      introduction: data.introduction
    };
  }
}

export const UserModule = getModule(User);

