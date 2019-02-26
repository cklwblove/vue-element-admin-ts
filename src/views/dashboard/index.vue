<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import adminDashboard from './admin/index.vue';
import editorDashboard from './editor/index.vue';

@Component({
  components: {
    adminDashboard,
    editorDashboard
  }
})
export default class Dashboard extends Vue {
  currentRole: string = 'adminDashboard';

  get roles() {
    return this.$store.getters.roles;
  }

  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard';
    }
  }

}
</script>
