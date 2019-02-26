import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';

export interface IErrorLogState {
  logs: any[];
}

@Module({dynamic: true, store, name: 'errorLog'})
class ErrorLog extends VuexModule implements IErrorLogState {
  logs: any[] = [];

  @Action({commit: 'ADD_ERROR_LOG'})
  AddErrorLog(log) {
    return log;
  }

  @Mutation
  ADD_ERROR_LOG(log) {
    console.log('ADD_ERROR_LOG', this.logs);
    this.logs.push(log);
  }
}

export const ErrorLogModule = getModule(ErrorLog);
