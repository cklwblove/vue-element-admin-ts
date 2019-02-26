<template>
  <div>
    <div style="margin-bottom:15px;">{{ $t('permission.roles') }}： {{ roles }}</div>
    {{ $t('permission.switchRoles') }}：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor"/>
      <el-radio-button label="admin"/>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class SwitchRoles extends Vue {
  @Getter roles;
  @Action('ChangeRoles') actionChangeRoles;

  get switchRoles() {
    return this.roles[0];
  }

  set switchRoles(val) {
    this.actionChangeRoles(val).then(() => {
       this.handleChange(val);
    });
  }

  @Emit('change')
  handleChange(val) {
    return val;
  }

}
</script>
