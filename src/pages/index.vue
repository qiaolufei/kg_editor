<template>
    <div id="d" class="d">
        <headpage></headpage>
        hello world!
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>
<script>
import headpage from '@/components/header'
import { login } from '../utils/api'
export default {
  data () {
    return {
    }
  },
  components: {
    headpage
  },
  methods: {
    drawLine () {
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  },
  mounted () {
    // 接口调用示例
    login().then(res => {})
    this.drawLine()
  }
}
</script>
<style lang="less" scoped>
</style>
