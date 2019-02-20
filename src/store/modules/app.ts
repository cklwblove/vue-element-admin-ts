import {getLanguage, setLanguage, getSidebarStatus, setSidebarStatus, getSize, setSize} from '@/utils/auth';
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';

export enum DeviceType {
  Mobile = 'mobile',
  Desktop = 'desktop'
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  size: string;
}

@Module({dynamic: true, store, name: 'app'})
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  };

  public device = DeviceType.Desktop;

  public language = getLanguage() || 'en';

  public size = getSize() || 'medium';

  @Action({commit: 'CLOSE_SIDEBAR'})
  public CloseSideBar(withoutAnimation) {
    return withoutAnimation;
  }

  @Action({commit: 'TOGGLE_SIDEBAR'})
  public ToggleSideBar(withoutAnimation?: boolean) {
    return withoutAnimation;
  }

  @Action({commit: 'TOGGLE_DEVICE'})
  public ToggleDevice(device: DeviceType) {
    return device;
  }

  @Action({commit: 'SET_LANGUAGE'})
  public SetLanguage(language: string) {
    return language;
  }

  @Action({commit: 'SET_SIZE'})
  public SetSize(size: string) {
    return size;
  }

  @Mutation
  private TOGGLE_SIDEBAR() {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = false;
    if (this.sidebar.opened) {
      setSidebarStatus('closed');
    } else {
      setSidebarStatus('opened');
    }
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    setSidebarStatus('closed');
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language;
    setLanguage(language);
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size;
    setSize(size);
  }
}

export const AppModule = getModule(App);
