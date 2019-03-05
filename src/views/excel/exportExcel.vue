<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename"/>
      <AutoWidthOption v-model="autoWidth"/>
      <BookTypeOption v-model="bookType"/>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document"
                 @click="handleDownload">{{ $t('excel.export') }} Excel
      </el-button>
      <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank"
         style="margin-left:15px;">
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { parseTime } from '@/utils';
// options components
import FilenameOption from './components/FilenameOption.vue';
import AutoWidthOption from './components/AutoWidthOption.vue';
import BookTypeOption from './components/BookTypeOption.vue';

@Component({
  components: {
    FilenameOption,
    AutoWidthOption,
    BookTypeOption
  }
})
export default class ExportExcel extends Vue {
  list: any[] = [];
  listLoading: boolean = true;
  downloadLoading: boolean = false;
  filename: string = '';
  autoWidth: boolean = true;
  bookType: string = 'xlsx';

  created() {
    this.fetchData();
  }

  fetchData() {
    this.listLoading = true;
    this.$services.articleList({method: 'get'}).then((response) => {
      this.list = response.items;
      this.listLoading = false;
    });
  }

  handleDownload() {
    this.downloadLoading = true;
    import('@/assets/js/export2Excel.js').then((excel) => {
      const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
      const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time'];
      const list = this.list;
      const data = this.formatJson(filterVal, list);
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: this.filename,
        autoWidth: this.autoWidth,
        bookType: this.bookType
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

<style>
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
</style>
