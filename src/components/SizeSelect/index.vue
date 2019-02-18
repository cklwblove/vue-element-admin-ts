<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value"
                        :command="item.value">{{
        item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {AppModule} from '@/store/modules/app';
import {TagsViewModule} from '@/store/modules/tagsView';

@Component
export default class SizeSelect extends Vue {
  public sizeOptions: any[] = [
    {label: 'Default', value: 'default'},
    {label: 'Medium', value: 'medium'},
    {label: 'Small', value: 'small'},
    {label: 'Mini', value: 'mini'}
  ];

  get size() {
    return this.$store.getters.size;
  }

  public handleSetSize(size) {
    this.$ELEMENT.size = size;
    AppModule.SetSize(size);
    this.refreshView();
    this.$message({
      message: 'Switch Size Success',
      type: 'success'
    });
  }

  public refreshView() {
    // In order to make the cached page re-rendered
    TagsViewModule.DelAllCachedViews(this.$route);

    const {fullPath} = this.$route;

    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + fullPath
      });
    });
  }
}
</script>
