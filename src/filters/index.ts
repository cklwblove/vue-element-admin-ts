/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2018/6/5 上午10:43
 * @description 定义过滤器模块
 */

import Vue from 'vue';

import { formatDate } from '@liwb/cloud-utils';

import {
  parseTime,
  formatTime
} from '@/utils';

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'k'}
  ];
  for (const s of si) {
    if (num >= s.value) {
      return (num / s.value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + s.symbol;
    }
  }
  return num.toString();
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

// Filter for article status
export const articleStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    success: 'success',
    draft: 'info',
    deleted: 'danger',
    pending: 'danger'
  };
  return statusMap[status];
};

// register global utility filters.
const filters = {
  formatDate,
  parseTime,
  formatTime,
  numberFormatter,
  toThousandFilter,
  articleStatusFilter
};

Object.keys(filters).forEach((key) => {
  // tslint:disable-next-line:ban-types
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
