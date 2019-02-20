<template>
  <div :class="{active:isActive}" class="share-dropdown-menu">
    <div class="share-dropdown-menu-wrapper">
      <span class="share-dropdown-menu-title" @click.self="clickTitle">{{ title }}</span>
      <div v-for="(item,index) of items" :key="index" class="share-dropdown-menu-item">
        <a v-if="item.href" :href="item.href" target="_blank">{{ item.title }}</a>
        <span v-else>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DropdownMenu extends Vue {
  @Prop({default: () => []}) public items!: any;
  @Prop({default: 'vue'}) public title!: string;

  public isActive: boolean = false;

  public clickTitle() {
    this.isActive = !this.isActive;
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
