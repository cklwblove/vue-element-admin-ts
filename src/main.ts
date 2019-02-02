import Vue from 'vue';
import Cookies from 'js-cookie';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';
import i18n from './lang';
import './icons';
import './router/router.interceptor';
import './filters';
import './services';
import store from './store';
import './registerServiceWorker';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
