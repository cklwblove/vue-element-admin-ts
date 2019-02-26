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

