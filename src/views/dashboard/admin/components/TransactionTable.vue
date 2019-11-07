<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | articleStatusFilter"> {{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {SUCCESS_STATUS} from '@/constant';

@Component({
  name: 'TransactionTable',
  filters: {
    orderNoFilter(str) {
      return str.substring(0, 30);
    }
  }
})
export default class TransactionTable extends Vue {

  list: any = null;

  created() {
    this.fetchData();
  }

  fetchData() {
    this.$services.getList({method: 'get'}).then((response) => {
      // console.log('fetchData response', response);
      const {code, data} = response;
      if (code === SUCCESS_STATUS) {
        this.list = data.items.slice(0, 8);
      } else {
        this.list = [];
      }
    });
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
