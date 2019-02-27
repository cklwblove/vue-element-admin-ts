import Vue from 'vue';

import permission from './permission';
import waves from './waves';

const directives = {
  permission,
  waves
};

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});
