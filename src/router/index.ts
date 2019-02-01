/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2019/01/12
 * @description 定义路由模块
 */

import Vue, {AsyncComponent} from 'vue';
import Router, {RouteConfig} from 'vue-router';

Vue.use(Router);

const loadView = (view: string): AsyncComponent => (): any => import(`@views/${view}/index.vue`);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'hello',
    component: loadView('hello')
  },
  {
    path: '/home',
    name: 'home',
    component: loadView('home')
  },
  {
    path: '*', redirect: '/'
  }
];

export default new Router({
  mode: 'hash',
  routes
});
