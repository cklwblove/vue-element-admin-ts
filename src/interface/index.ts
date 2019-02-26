/**
 *  定义接口类
 *  最佳实践 -> 接口名字一般建议 I 开头，便于别人阅读
 */

export interface IDataValues {
  year: string;
  value: number;
}

export interface IListQuery {
  page: number;
  limit: number;
}
