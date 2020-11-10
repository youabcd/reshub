<template>
  <div class="hello">

    <div style="margin-top: 50px">el-ui</div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <div style="margin-top: 50px">vant</div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <div style="margin-top:50px">
      <div id="container"></div>
    </div>
  </div>
</template>
name: 'HelloWorld',
<script>
  import Charts from '@jiaminghi/charts'
  export default {
    data() {
      return {
        option: {
          legend: {
            data: [{
              name: '收费系统',
              color: '#00baff'
            },
              {
                name: '监控系统',
                color: '#ff5ca9'
              },
              {
                name: '通信系统',
                color: '#3de7c9'
              },
              {
                name: '供配电系统',
                color: '#f5d94e'
              }
            ],
            textStyle: {
              fill: '#fff'
            }
          },
          xAxis: {
            data: [
              '10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'
            ],
            axisLine: {
              style: {
                stroke: '#999'
              }
            },
            axisLabel: {
              style: {
                fill: '#999'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            data: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              style: {
                stroke: '#999'
              }
            },
            axisLabel: {
              style: {
                fill: '#999'
              }
            },
            axisTick: {
              show: false
            },
            min: 0,
            max: 8
          },
          series: [{
            name: '收费系统',
            data: [
              2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5
            ],
            type: 'bar',
            barStyle: {
              fill: 'rgba(0, 186, 255, 0.4)'
            }
          },
            {
              name: '监控系统',
              data: [
                2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5
              ],
              type: 'line',
              lineStyle: {
                stroke: '#ff5ca9'
              },
              linePoint: {
                radius: 4,
                style: {
                  fill: '#ff5ca9',
                  stroke: 'transparent'
                }
              }
            },
            {
              name: '通信系统',
              data: [
                1.3, 2.3, 5.3, 5.3, 6.3, 5.3, 1.3
              ],
              type: 'line',
              smooth: true,
              lineArea: {
                show: true,
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
              },
              lineStyle: {
                lineDash: [5, 5]
              },
              linePoint: {
                radius: 4,
                style: {
                  fill: '#00db95'
                }
              }
            },
            {
              data: [
                0.2, 1.2, 4.2, 4.2, 5.2, 4.2, 0.2
              ],
              type: 'line',
              name: '供配电系统',
              lineArea: {
                show: true,
                gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
              },
              lineStyle: {
                stroke: '#f5d94e'
              },
              linePoint: {
                radius: 4,
                style: {
                  fill: '#f5d94e',
                  stroke: 'transparent'
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.charet();
    },
    methods: {
      charet() {
        const container = document.getElementById('container')
        const myChart = new Charts(container)
        myChart.setOption(this.option)
      }
    },
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container {
    width: 500px;
    height: 500px;
    background:#f1f1f1;
  }
</style>
