/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2019/01/12
 * @description 定义路由模块
 */

import Vue, { AsyncComponent } from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const loadView = (view: string): AsyncComponent => (): any => import(`@views/${view}/index.vue`);

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: loadView('login'),
    hidden: true
  },
  {
    path: '*', redirect: '/404'
  }
];

export const asyncRouterMap = [];

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({x: 0, y: 0}),
  routes: constantRouterMap
});
