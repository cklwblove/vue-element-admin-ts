import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FixiOSBugMixin extends Vue {
  get device() {
    return this.$store.getters.device;
  }

  mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseeleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS();
  }

  fixBugIniOS() {
    const $submenu = this.$refs.submenu;
    if ($submenu) {
      // @ts-ignore
      const handleMouseleave = $submenu.handleMouseleave;
      // @ts-ignore
      $submenu.handleMouseleave = (e) => {
        if (this.device === 'mobile') {
          return;
        }
        handleMouseleave(e);
      };
    }
  }
}
