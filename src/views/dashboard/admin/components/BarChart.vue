<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import echarts from 'echarts';
import { debounce } from '@/utils';
// echarts theme
require('echarts/theme/macarons');

const animationDuration = 6000;

@Component
export default class BarChart extends Vue {
  @Prop({default: 'chart'}) className!: string;
  @Prop({default: '100%'}) width!: string;
  @Prop({default: '300px'}) height!: string;

  chart: any = null;
  resizeHandler = debounce(() => {
    if (this.chart) {
      this.chart.resize();
    }
  }, 100);

  mounted() {
    this.initChart();

    window.addEventListener('resize', this.resizeHandler);
  }

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.resizeHandler);
    this.chart.dispose();
    this.chart = null;
  }

  initChart() {
    this.chart = echarts.init(this.$el as any, 'macarons');

    this.chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        }
      }],
      series: [{
        name: 'pageA',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [79, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageB',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageC',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration
      }]
    });
  }
}
</script>
