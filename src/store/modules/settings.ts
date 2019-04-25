import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import defaultSettings from '@/settings';

const {showSettings, tagsView, fixedHeader, sidebarLogo, theme} = defaultSettings;

export interface ISettingsState {
  theme: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}

@Module({dynamic: true, store, name: 'settings'})
class Settings extends VuexModule implements ISettingsState {
  theme = theme;
  showSettings = showSettings;
  tagsView = tagsView;
  fixedHeader = fixedHeader;
  sidebarLogo = sidebarLogo;

  @Action({commit: 'CHANGE_SETTING'})
  ChangeSetting(data: any) {
    console.log('data', data);
    return data;
  }

  @Mutation
  CHANGE_SETTING({key, value}) {
    if (this.hasOwnProperty(key)) {
      this[key] = value;
    }
  }
}

export const SettingsModule = getModule(Settings);
