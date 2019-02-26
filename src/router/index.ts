/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2019/01/12
 * @description 定义路由模块
 */

import Vue, { AsyncComponent } from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

/* Router Modules */
// import componentsRouter from './modules/components';
import chartsRouter from './modules/charts';
import tableRouter from './modules/table';
// import nestedRouter from './modules/nested';

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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: loadView('redirect')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: loadView('login')
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: loadView('dashboard'),
        name: 'Dashboard',
        meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: loadView('documentation'),
        name: 'Documentation',
        meta: {title: 'documentation', icon: 'documentation', affix: true}
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: loadView('guide'),
        name: 'Guide',
        meta: {title: 'guide', icon: 'guide', noCache: true}
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true
  }
];

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: loadView('svgIcons'),
        name: 'Icons',
        meta: {title: 'icons', icon: 'icon', noCache: true}
      }
    ]
  },
  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  chartsRouter,
  // nestedRouter,
  tableRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401.vue'),
        name: 'Page401',
        meta: {title: 'page401', noCache: true}
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404.vue'),
        name: 'Page404',
        meta: {title: 'page404', noCache: true}
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: loadView('errorLog'),
        name: 'ErrorLog',
        meta: {title: 'errorLog', icon: 'bug'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
];

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({x: 0, y: 0}),
  routes: constantRouterMap
});
