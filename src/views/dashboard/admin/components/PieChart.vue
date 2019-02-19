<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import echarts from 'echarts';
import { debounce } from '@/utils';
// echarts theme
require('echarts/theme/macarons');

@Component
export default class PieChart extends Vue {
  @Prop({default: 'chart'}) public className!: string;
  @Prop({default: '100%'}) public width!: string;
  @Prop({default: '300px'}) public height!: string;

  public chart: any = null;

  public mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener('resize', this.__resizeHandler);
  }

  public beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  }

  public initChart() {
    this.chart = echarts.init(this.$el as any, 'macarons');

    this.chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
      },
      calculable: true,
      series: [
        {
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            {value: 320, name: 'Industries'},
            {value: 240, name: 'Technology'},
            {value: 149, name: 'Forex'},
            {value: 100, name: 'Gold'},
            {value: 59, name: 'Forecasts'}
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ]
    });
  }
}
</script>

