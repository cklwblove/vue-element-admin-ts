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
import getPageTitle from '@/utils/getPageTitle';
import { Route } from 'vue-router';
import { UserModule } from '@/store/modules/user';
import { PermissionModule } from '@/store/modules/permission';

NProgress.configure({showSpinner: false});

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({path: '/'});
      // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      NProgress.done();
    } else {
      console.log('store.getters.roles', store.getters);
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          await UserModule.GetUserInfo();
          const roles = UserModule.roles;
          // generate accessible routes map based on roles
          await PermissionModule.GenerateRoutes(roles);
          const dynamicRoutes = PermissionModule.dynamicRoutes;
          // dynamically add accessible routes
          router.addRoutes(dynamicRoutes);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({...to, replace: true});
        } catch (error) {
          // remove token and go to login page to re-login
          await UserModule.ResetToken();
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
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

router.afterEach((to) => {
  NProgress.done(); // finish progress bar
  // set page title
  document.title = getPageTitle(to.meta.title);
});
