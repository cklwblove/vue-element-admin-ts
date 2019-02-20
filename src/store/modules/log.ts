import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';

export interface ILogState {
  logs: any[];
}

@Module({dynamic: true, store, name: 'Log'})
class Log extends VuexModule implements ILogState {
  public logs: any[] = [];

  @Action({commit: 'ADD_ERROR_LOG'})
  public AddErrorLog(log) {
    return log;
  }

  @Mutation
  public ADD_ERROR_LOG(log) {
    this.logs.push(log);
  }
}

export const LogModule = getModule(Log);
