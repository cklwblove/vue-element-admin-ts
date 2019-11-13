import Vue from 'vue';
import { isArray, isString } from '@/utils/validate';
import { ErrorLogModule } from '@/store/modules/errorLog';
import settings from '@/settings';

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const {errorLog: needErrorLog} = settings;

const checkNeed = () => {
  const env = process.env.NODE_ENV as string;
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
};

// you can set only in production env show the error-log
if (checkNeed()) {
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
