<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import echarts from 'echarts';
import { debounce } from '@/utils';
// echarts theme
require('echarts/theme/macarons');

@Component
export default class LineChart extends Vue {
  @Prop({default: 'chart'}) className!: string;
  @Prop({default: '100%'}) width!: string;
  @Prop({default: '350px'}) height!: string;
  @Prop({default: true}) autoResize!: boolean;
  @Prop({required: true}) chartData!: any;

  chart: any = null;
  sidebarElm: any = null;
  resizeHandler = debounce(() => {
    if (this.chart) {
      this.chart.resize();
    }
  }, 100);

  @Watch('chartData', {deep: true})
  onChartDataChange(val) {
    this.setOptions(val);
  }

  mounted() {
    this.initChart();
    if (this.autoResize) {
      window.addEventListener('resize', this.resizeHandler);
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0] as HTMLDivElement;
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
  }

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);

    this.chart.dispose();
    this.chart = null;
  }

  sidebarResizeHandler(e) {
    if (e.propertyName === 'width') {
      this.resizeHandler();
    }
  }

  setOptions({expectedData = [], actualData = []} = {}) {
    this.chart.setOption({
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        padding: [5, 10]
      },
      yAxis: {
        axisTick: {
          show: false
        }
      },
      legend: {
        data: ['expected', 'actual']
      },
      series: [{
        name: 'expected', itemStyle: {
          normal: {
            color: '#FF005A',
            lineStyle: {
              color: '#FF005A',
              width: 2
            }
          }
        },
        smooth: true,
        type: 'line',
        data: expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
    });
  }

  initChart() {
    this.chart = echarts.init(this.$el as any, 'macarons');
    this.setOptions(this.chartData);
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
