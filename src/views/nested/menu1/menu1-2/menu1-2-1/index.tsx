/* tslint:disable */
// 函数式组件
import Vue from 'vue';

export default Vue.extend({
  functional: true,
  render(h, ctx) {
    return (
      <div style='padding:30px;'>
        <el-alert : closable="false" title="menu 1-2-1" type="warning" />
      </div>
    );
  }
});
