import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';

export interface IErrorLogState {
  logs: any[];
}

@Module({dynamic: true, store, name: 'errorLog'})
class ErrorLog extends VuexModule implements IErrorLogState {
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

export const ErrorLogModule = getModule(ErrorLog);
