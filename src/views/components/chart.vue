<template>
  <div id="container" class="container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['options', 'styles'],
  name: 'container',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    initChart(options) {
      this.$el.style.width = this.styles.width ;
      this.$el.style.height = this.styles.height;
      this.chart = new Highcharts.Chart(this.$el,options);
    }
  }
}
</script>

<style lang="scss">
  .container {
    width: 90%;
    height: 20em;
  }
</style>