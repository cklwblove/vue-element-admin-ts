import { Vue, Component } from 'vue-property-decorator';
import { debounce } from '@/utils';

@Component
export default class ResizeMixins extends Vue {
  sidebarElm: any = null;

  resizeHandler = debounce(() => {
    // @ts-ignore
    if (this.chart) {
      // @ts-ignore
      this.chart.resize();
    }
  }, 100);

  mounted() {
    window.addEventListener('resize', this.resizeHandler);

    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
  }

  sidebarResizeHandler(e) {
    if (e.propertyName === 'width') {
      this.resizeHandler();
    }
  }
}
