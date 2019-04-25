<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">

    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="请给我点时间！">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="Date">
      <template slot-scope="scope">
        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="Title">
      <template slot-scope="scope">
        <span>{{ scope.row.title }}</span>
        <el-tag>{{ scope.row.type }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="Author">
      <template slot-scope="scope">
        <span>{{ scope.row.author }}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" label="Importance">
      <template slot-scope="scope">
        <svg-icon v-for="n in +scope.row.importance" :key="n" name="star"/>
      </template>
    </el-table-column>

    <el-table-column align="center" label="Readings" width="95">
      <template slot-scope="scope">
        <span>{{ scope.row.pageviews }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="Status" width="110">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>

  </el-table>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { IListQuery } from '@/interface';
  import {SUCCESS_STATUS} from '@/constant';

  interface IListQuery1 extends IListQuery {
    type: string;
    sort: string;
  }

  @Component({
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        };
        return statusMap[status];
      }
    }
  })
  export default class TabPane extends Vue {
    @Prop({default: 'CN'}) type!: string;

    list: any[] = [];
    listQuery: IListQuery1 = {
      page: 1,
      limit: 5,
      type: this.type,
      sort: '+id'
    };
    loading: boolean = false;

    created() {
      this.getList();
    }

    getList() {
      this.loading = true;
      this.$emit('create'); // for test
      this.$services.articleList({data: this.listQuery, method: 'get'}).then((response) => {
        const {code, data} = response;
        if (code === SUCCESS_STATUS) {
          this.list = data.items;
        } else {
          this.list = [];
        }
        this.loading = false;
      });
    }
  }
</script>
