<template>
  <div style="background-color:rgba(233,233,233,0.1);">
    <TopBar></TopBar>

    <!--热门搜索-->
    <div style="margin-top: 60px;width: 86%;margin-left: 7%;">
      <van-row></van-row>
      <van-row>
        <van-col span="14">
          <van-row>
            <van-col span="5" style="height: 50px;font-size: 25px;background-color:rgba(233,233,233,1);">
              <div style="border: #2c3e50;margin-top: 12px;">热门文献</div>
            </van-col>
            <van-col span="19"></van-col>
          </van-row>
          <div style="background: #e9e9e9;height: 400px;width: 100%;" >
            <div v-for="(item,index) in paperTable" :key="index"
                 style="vertical-align: top;padding: 10px;width: 40%;height: 20px;
                 text-align: left;display:inline-block;margin-top: 15px;">
              <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom-start">
              <div class="van-ellipsis" style="width: 270px;">
                <el-link :href="item.link" target="_blank">
                  <span style="font-size: 20px;">
                    <i class="el-icon-s-promotion"></i>
                    {{item.title}}
                  </span>
                </el-link>
              </div>
              </el-tooltip>
            </div>
          </div>
        </van-col>
        <van-col span="2"></van-col>
        <van-col span="8">
          <van-row>
            <van-col span="7" style="height: 50px;font-size: 25px;background-color:rgba(233,233,233,1);">
              <div style="border: #2c3e50;margin-top: 12px;">热搜词</div>
            </van-col>
            <van-col span="17"></van-col>
          </van-row>
          <div style="height: 400px;width: 100%;">
            <WordCloudChart
              v-if="isFinish"
              height="100%" width="100%"
              title="" id="01"
              :data="hotSearch"></WordCloudChart>
          </div>
        </van-col>
      </van-row>
    </div>

    <!--热门学者-->
    <div style="margin-top: 60px;width: 86%;margin-left: 7%;margin-bottom: 30px;">
      <van-row></van-row>
      <van-row>
        <van-col span="24">
          <van-row>
            <van-col span="3" style="height: 50px;font-size: 25px;background-color:rgba(233,233,233,1);">
              <div style="border: #2c3e50;margin-top: 12px;">热门学者</div>
            </van-col>
            <van-col span="21"></van-col>
          </van-row>
          <div class="charts1" ref="myChart" id="main"></div>
        </van-col>
      </van-row>
    </div>

    <van-row></van-row>

  </div>
</template>

<script>
    import TopBar from "./TopBar";
    import baseUrl from "./baseUrl";
    import axios from 'axios';
    import WordCloudChart from "./WordCloudChart";
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
          isFinish:false,
          paperTable: [
          ],
          hotSearch:[
          ],
          scholarName:['y1','y2','y3','y4','y5','y6','y7','y8','y9','y10','y11'],
          scholarCited:[120,110,100,90,80,70,60,50,80,60,100,90],//发文数量
          scholarUsed:[120, 200, 150, 80, 70, 110, 130,260,80,60,100,90],//被引次数
        }
      },
      mounted() {
        this.getHot();
      },
      methods: {
        drawLine(){
          let myChart=echarts.init(document.getElementById('main'))
          var xd=this.scholarName;
          var scholarCited=this.scholarCited;//发文数量
          var scholarUsed=this.scholarUsed;//被引次数
          myChart.setOption({
            title:{text:''},
            backgroundColor:"",

            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            legend: {               //设置区分（哪条线属于什么）
              data:['发文数量','被引次数']
            },
            color: ['#8AE09F', '#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data: xd,
              name: 'Scholar',           //X轴 name
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
              name: 'Quantity',
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
                name: '发文数量',
                data:  scholarCited,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#8AE09F',
                  }
                },
              },
              {
                name: '被引次数',
                data: scholarUsed,
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
        getHot(){
          let _this=this;
          axios.get(baseUrl+"/getHotSpot")
              .then(function (response) {
                console.log(response);
                _this.scholarUsed=response.data.scholarUsed;//被引次数
                _this.scholarCited=response.data.scholarCited;//发文数量
                _this.scholarName=response.data.scholarName;//学者姓名
                _this.paperTable=response.data.paperTable;//热门文章
                _this.hotSearch=response.data.hotSearach;//热门搜索词
                _this.isFinish=true;
                _this.drawLine();
              })
        },
      },
      components:{
        TopBar,WordCloudChart,
      },
    }
</script>

<style>
  .charts1{
    width: 100%;
    height:400px;
    background: #e9e9e9;
    margin: 0 auto;
  }

  .card{
    width: 49.7%;
    float: left;
    text-align: left;
    background-color:rgba(233,233,233,1);
    border-radius: 0px;
  }
</style>
