import {VuexModule, Module, getModule} from 'vuex-module-decorators';

@Module
class Getters extends VuexModule {
  get sidebar() {
    return this.app.sidebar;
  }
  get language() {
    return this.app.language;
  }

  get size() {
    return this.app.size;
  }

  get device() {
    return this.app.device;
  }

  get visitedViews() {
    return this.tagsView.visitedViews;
  }

  get cachedViews() {
    return this.tagsView.cachedViews;
  }

  get token() {
    return this.user.token;
  }

  get avatar() {
    return this.user.avatar;
  }

  get name() {
    return this.user.name;
  }

  get introduction() {
    return this.user.introduction;
  }

  get roles() {
    return this.user.roles;
  }

  get status() {
    return this.user.status;
  }

  get setting() {
    return this.user.setting;
  }

  get permission_routers() {
    return this.permission.routers;
  }

  get addRouters() {
    return this.permission.addRouters;
  }

  get errorLogs() {
    return this.errorLog.logs;
  }
}

export const GettersModule = getModule(Getters);
