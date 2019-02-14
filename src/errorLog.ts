import Vue from 'vue';
import {ErrorLogModule} from '@/store/modules/errorLog';

// you can set only in production env show the error-log
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = (err, vm, info) => {
    // Don't ask me why I use Vue.nextTick, it just a hack.
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      ErrorLogModule.AddErrorLog({
        err,
        vm,
        info,
        url: window.location.href
      });
      console.error(err, info);
    });
  };
}
