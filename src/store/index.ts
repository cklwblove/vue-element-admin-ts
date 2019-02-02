import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
// import errorLog from './modules/errorLog';
// import permission from './modules/permission';
// import tagsView from './modules/tagsView';
import { IUserState } from './modules/user';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  user: IUserState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
