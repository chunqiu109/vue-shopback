<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片区域  -->
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
  // 导入echarts组件
  import echarts from 'echarts'
  import _ from 'lodash'

  export default {
    data() {
      return {
        // 需要合并的数据
        options: {
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
      }
    },
    created() {
    },

    // 当页面准备好dom，元素已经渲染完毕之后才会执行这个函数，而echarts需要等元素渲染之后才开始初始化，所以
    // 初始化的方法需要放在这里
    async mounted() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))

      const { data: res } = await this.$http.get('reports/type/1')
      if (res.meta.status !== 200) {
        return this.$message.error('获取折线图数据失败！')
      }
      console.log(res)

      // 指定图表的配置项和数据  数据合并
      _.merge(res.data, this.options)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(res.data)
    },
    methods: {}
  }
</script>

<style scoped>

</style>
