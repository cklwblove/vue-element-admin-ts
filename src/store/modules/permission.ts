import {getModule, Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import {asyncRouterMap, constantRouterMap} from '@/router';
import {Route} from 'vue-router';
import store from '@/store';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route: Route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = {...route};
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

export interface IPermissionState {
  routers: string[];
  addRouters: string[];
}

@Module({dynamic: true, store, name: 'permission'})
class Permission extends VuexModule implements IPermissionState {
  public routers = [];
  public addRouters = [];

  @Action({commit: 'SET_ROUTERS'})
  public GenerateRoutes(data) {
    const {roles} = data;
    let accessedRouters;
    if (roles.includes('admin')) {
      accessedRouters = asyncRouterMap;
    } else {
      accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
    }

    return accessedRouters;
  }

  @Mutation
  private setRoutes(routers) {
    this.addRouters = routers;
    this.routers = constantRouterMap.concat(routers);
  }
}

export const PermissionModule = getModule(Permission);
