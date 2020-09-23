<template>
    <div id="d" class="d">
        <headpage></headpage>
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        <el-button  v-print="'#table'">打印</el-button>
        <el-table
          id="table"
          border
          :data="tableData"
          style="width: 50%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="exportInfo" >导出EXCEL</el-button>
    </div>
</template>
<script>
import headpage from '@/components/header'
import { login } from '../utils/api'
import { exportToExcel, isNullAndEmpty, timeJS, arrayJS, objectJS } from '../utils/commen'
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  components: {
    headpage
  },
  methods: {
    exportInfo () {
      exportToExcel('#table', '样例')
    },
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
    let a = 'null'
    console.log(isNullAndEmpty(a))
    console.log(timeJS.countdown('2020-8-6 15:10'))
    console.log(arrayJS.arrOperation([1, 2, 3], [2, 5, 6], 4))
    let obj1 = {
      name: '小明',
      age: 23,
      other: [1, 2, 3],
      height: false,
      info: {
        height: 100,
        weight: 64
      }
    }
    let obj2 = objectJS.deepClone(obj1)
    console.log(obj2)
  }
}
</script>
<style lang="less" scoped>
</style>
