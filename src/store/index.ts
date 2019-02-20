import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
import { ILogState } from './modules/log';
import { ITagsViewState } from './modules/tagsView';
import { IUserState } from './modules/user';
import { IPermissionState } from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  user: IUserState;
  permission: IPermissionState;
  tagsView: ITagsViewState;
  log: ILogState;
}

// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({getters});

export default store;
