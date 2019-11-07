<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px"
                 class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item"
                 style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'"
                   :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{
        $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">{{ $t('table.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">{{ $t('table.export') }}
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{
        $t('table.reviewer') }}
      </el-checkbox>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.title')" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.title }}</span>
          <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.author')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.reviewer')" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.importance')" width="80px">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.readings')" align="center" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type" @click="handleFetchPv(scope.row.pageviews)">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | articleStatusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.status!='published'" size="mini" type="success"
                     @click="handleModifyStatus(scope.row,'published')">{{ $t('table.publish') }}
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{
            $t('table.draft') }}
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger"
                     @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.type')" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name"
                       :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3"
                   style="margin-top:8px;"/>
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea"
                    placeholder="Please input"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ElForm } from 'element-ui/types/form';
  import { parseTime } from '@/utils';
  import { IListQuery } from '@/interface';
  import {
    Pagination
  } from '@/components';
  import {SUCCESS_STATUS} from '@/constant';

  interface IListQuery1 extends IListQuery {
    importance: undefined;
    title: undefined;
    type: undefined;
    sort: string;
  }

  interface ITemp {
    id: number;
    importance: number;
    remark: string;
    timestamp: Date;
    title: string;
    type: string;
    status: string;
    author: string;
  }

  const calendarTypeOptions = [
    {key: 'CN', display_name: 'China'},
    {key: 'US', display_name: 'USA'},
    {key: 'JP', display_name: 'Japan'},
    {key: 'EU', display_name: 'Eurozone'}
  ];

  // arr to obj ,such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name;
    return acc;
  }, {});

  @Component({
    name: 'ComplexTable',
    components: {
      Pagination
    },
    filters: {
      typeFilter(type) {
        return calendarTypeKeyValue[type];
      }
    }
  })
  export default class ComplexTable extends Vue {
    tableKey: number = 0;
    list: any[] = [];
    total: number = 0;
    listLoading: boolean = true;
    listQuery: IListQuery1 = {
      page: 1,
      limit: 20,
      importance: undefined,
      title: undefined,
      type: undefined,
      sort: '+id'
    };
    importanceOptions: number[] = [1, 2, 3];
    calendarTypeOptions = calendarTypeOptions;
    sortOptions: any[] = [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}];
    statusOptions: string[] = ['published', 'draft', 'deleted'];
    showReviewer: boolean = false;
    temp: ITemp = {
      id: 0,
      importance: 1,
      remark: '',
      timestamp: new Date(),
      title: '',
      type: '',
      status: 'published',
      author: ''
    };
    dialogFormVisible: boolean = false;
    dialogStatus: string = '';
    textMap: object = {
      update: 'Edit',
      create: 'Create'
    };
    dialogPvVisible: boolean = false;
    pvData: any[] = [];
    rules: object = {
      type: [{required: true, message: 'type is required', trigger: 'change'}],
      timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
      title: [{required: true, message: 'title is required', trigger: 'blur'}]
    };
    downloadLoading: boolean = false;

    $refs!: {
      dataForm: ElForm
    };

    created() {
      this.getList();
    }

    getList() {
      this.listLoading = true;
      this.$services.articleList({method: 'get', data: this.listQuery}).then((response) => {
        console.log('response', response);
        const {code, data} = response;
        if (code === SUCCESS_STATUS) {
          this.list = data.items;
          this.total = data.total;
        } else {
          this.list = [];
          this.total = 0;
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    }

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }

    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
      row.status = status;
    }

    sortChange(data) {
      const {prop, order} = data;
      if (prop === 'id') {
        this.sortByID(order);
      }
    }

    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id';
      } else {
        this.listQuery.sort = '-id';
      }
      this.handleFilter();
    }

    resetTemp() {
      this.temp = {
        id: 0,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: '',
        author: ''
      };
    }

    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    }

    createData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.temp.id = Math.round(Math.random() * 100) + 1024;
          this.temp.author = 'vue-element-admin';
          this.$services.articleCreate({data: this.temp}).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          });
        }
      });
    }

    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    }

    updateData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.timestamp = new Date(tempData.timestamp);
          this.$services.articleUpdate({data: tempData}).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v);
                this.list.splice(index, 1, this.temp);
                break;
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            });
          });
        }
      });
    }

    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    }

    handleFetchPv(pv) {
      this.$services.articlePv({data: pv}).then((response) => {
        const {code, data} = response;
        if (code === SUCCESS_STATUS) {
          this.pvData = data.pvData;
        }

        this.dialogPvVisible = true;
      });
    }

    handleDownload() {
      this.downloadLoading = true;
      import('@/assets/js/export2Excel.js').then((excel) => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status'];
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status'];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        });
        this.downloadLoading = false;
      });
    }

    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => {
        if (j === 'timestamp') {
          return parseTime(v[j], null);
        } else {
          return v[j];
        }
      }));
    }
  }
</script>
