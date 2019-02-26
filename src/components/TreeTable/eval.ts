/**
 * @Author: jianglei
 * @Date:   2017-10-12 12:06:49
 */

import Vue from 'vue';

export default function treeToArray(data, expandAll, parent = null, level: number) {
  let tmp: any[] = [];
  Array.from(data).forEach((record: any) => {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll);
    }
    let levelTemp = 1;
    if (level !== undefined && level !== null) {
      levelTemp = level + 1;
    }
    Vue.set(record, '_level', levelTemp);
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent);
    }
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, levelTemp);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
}
