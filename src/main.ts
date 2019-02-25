import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { getSize } from '@/utils/auth';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang';
import './errorLog';
import './icons/components';
import './router/router.interceptor';
import './filters';
import './directives';
import './services';
import './registerServiceWorker';
// mock
import './mock';

Vue.use(Element, {
  size: getSize() || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});


Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
});

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
