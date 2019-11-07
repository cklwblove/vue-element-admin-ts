import Vue, { DirectiveOptions } from 'vue';

import permission from './permission';
import waves from './waves';
import elDragDialog from './el-dragDialog';
import clipboard from './clipboard';

const directives = {
  permission,
  waves,
  elDragDialog,
  clipboard
};

Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});
