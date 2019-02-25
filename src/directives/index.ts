import Vue from 'vue';

import permission from './permission';

const directives = {
  permission
};

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});
