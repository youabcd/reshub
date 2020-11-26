<template>
  <div>
    <TopBar></TopBar>
    <div style="margin-top: 60px;width: 1100px;margin-left: 100px;">
      <van-row>
        <van-col span="16">
          <div style="background: #e9e9e9;height: 400px;width: 100%;" >
            <el-card class="card" shadow="never" v-for="(item,index) in paperTable" :key="index">
              <div class="van-ellipsis" style="width: 300px">
                <el-link :href="item.link" target="_blank">
                  <i class="el-icon-s-promotion"></i>
                  {{item.title}}
                </el-link>
              </div>
            </el-card>
          </div>
        </van-col>
        <van-col span="8">
          <div style="height: 400px;width: 100%;background: lightgrey">

          </div>
        </van-col>
      </van-row>
    </div>
    <div class="charts1" ref="myChart" id="main"></div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";
    let echarts = require('echarts/lib/echarts')
    // 引入折线图组件
    require('echarts/lib/chart/line')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
      name: "HotspotAnalysis",
      data(){
        return{
          paperTable: [{
            id:'1',
            title: 'kasdlflkas11',
            link: 'https://www.bilibili.com',
          },{
            id:'2',
            title: 'kasdlflkas1111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },{
            id:'3',
            title: 'kasdlflkas11111',
            link: 'https://www.bilibili.com',
          },

          ],
        }
      },
      mounted() {
        this.drawLine();
      },
      methods: {
        drawLine(){
          let myChart=echarts.init(document.getElementById('main'))
          var xd=['2019-1-1', '2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1','2019-8-1'];
          var watchTimes=[220, 232, 201, 234, 290, 230, 220,250];
          myChart.setOption({
            title:{text:''},
            backgroundColor:"",

            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            legend: {               //设置区分（哪条线属于什么）
              data:['平均成绩','学生成绩']
            },
            color: ['#8AE09F', '#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data: xd,
              name: 'DATE',           //X轴 name
              nameTextStyle: {        //坐标轴名称的文字样式
                color: '#FA6F53',
                fontSize: 9,
                padding: [0, 0, 0, 0]//上下左右间距
              },
              axisLine: {             //坐标轴轴线相关设置。
                lineStyle: {
                  color: '#FA6F53',
                }
              }
            },
            yAxis: {
              name: 'Grade',
              nameTextStyle: {
                color: '#FA6F53',
                fontSize: 9,
                padding: [0, 0, 0, 0]
              },
              axisLine: {
                lineStyle: {
                  color: '#FA6F53',
                }
              },
              type: 'value'
            },
            series: [
              {
                name: '平均成绩',
                data:  watchTimes,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#8AE09F',
                  }
                },
              },
              {
                name: '学生成绩',
                data: [120, 200, 150, 80, 70, 110, 130,260],
                type: 'line',
                lineStyle: {
                  normal: {
                    color: '#FA6F53',
                  }
                },
              }
            ]
        });
        },
      },
      components:{
        TopBar
      },
    }
</script>

<style>
  .charts1{
    width: 400px;
    height:200px;
    //background: #cce6f0;
    margin: 0 auto;
  }

  .card{
    width: 49.7%;
    float: left;
    text-align: left
  }
</style>
