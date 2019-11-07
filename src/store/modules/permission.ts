import {getModule, Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import {asyncRouterMap, constantRouterMap} from '@/router';
import { RouteConfig } from 'vue-router';
import store from '@/store';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteConfig) {
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
export function filterAsyncRoutes(routes: RouteConfig[], roles: string[]) {
  const res: RouteConfig[] = [];

  routes.forEach((route) => {
    const tmp: RouteConfig = {...route};
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({dynamic: true, store, name: 'permission'})
class Permission extends VuexModule implements IPermissionState {
  routes = [];
  dynamicRoutes = [];

  @Action({commit: 'SET_ROUTERS'})
  GenerateRoutes(roles) {
    // console.log('GenerateRoutes', roles);
    let accessedRoutes;
    if (roles.includes('admin')) {
      accessedRoutes = asyncRouterMap;
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles);
    }

    return accessedRoutes;
  }

  @Mutation
  private SET_ROUTERS(routes) {
    this.routes = (constantRouterMap as any).concat(routes);
    this.dynamicRoutes = routes;
  }
}

export const PermissionModule = getModule(Permission);
