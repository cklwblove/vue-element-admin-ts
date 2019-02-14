import {getModule, Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import store from '@/store';

export interface IErrorLog {
  logs: any[];
}

@Module({dynamic: true, store, name: 'log'})
class ErrorLog extends VuexModule implements IErrorLog {
  public logs: any[] = [];

  @Action({commit: 'ADD_ERROR_LOG'})
  public AddErrorLog(log) {
    console.log('log', log);
  }

  @Mutation
  public ADD_ERROR_LOG(log) {
    this.logs.push(log);
  }

}
export const ErrorLogModule = getModule(ErrorLog);
