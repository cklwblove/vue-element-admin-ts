import Vue from 'vue';

import permission from './permission';
import waves from './waves';
import elDragDialog from './el-dragDialog';

const directives = {
  permission,
  waves,
  elDragDialog
};

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});
