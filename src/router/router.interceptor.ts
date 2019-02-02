/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2019/01/12
 * @description 定义路由拦截器模块，比如登录鉴权逻辑等
 */
import router from './index';
import store from '../store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { Route } from 'vue-router';
import {UserModule} from '@/store/modules/user';
import {PermissionModule} from '@/store/modules/permission';

NProgress.configure({showSpinner: false});

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({path: '/'});
      // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        UserModule.GetUserInfo().then((res) => { // 拉取user_info
          const roles = res.roles; // note: roles must be a array! such as: ['editor','develop']
          PermissionModule.GenerateRoutes({roles}).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({...to, replace: true});
          });
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err);
            next({path: '/'});
          });
        });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({path: '/401', replace: true, query: {noGoBack: true}});
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
