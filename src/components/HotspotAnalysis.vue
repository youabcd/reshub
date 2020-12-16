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
              <div class="van-ellipsis" style="width: 270px;">
                <el-link :href="item.link" target="_blank">
                  <span style="font-size: 20px;">
                    <i class="el-icon-s-promotion"></i>
                    {{item.title}}
                  </span>
                </el-link>
              </div>
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
          paperTable: [
            {
            id:'1',
            title: 'kasdlflkas11djkfklasjfksjdlkfjksdfskldf车klsjdkfksdfkj',
            link: 'https://www.bilibili.com',
          },{
            id:'2',
            title: 'kasdlflkas1111房价快速搭建安抚看见撒旦分教师',
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
          hotSearch:[
            {name:"人工智能",value:10000},
            {name:"大数据",value:9000},
            {name:"软件工程",value:8000},
            {name:"人工智障",value:7000},
            {name:"大数据泄露",value:6000},
            {name:"假的软件工程",value:5000},
            {name:"人",value:4000},
            {name:"数据",value:3000},
            {name:"没意思",value:2000},
            {name:"搜个锤子",value:1000},
            {name:"无敌",value:900},
            {name:"吃饭",value:800},
            {name:"数据库设计",value:700},
            {name:"编译",value:600},
            {name:"操作系统",value:500},
            {name:"PINTOS",value:400},
            {name:"毕业论文",value:300},
            {name:"求职",value:200},
            {name:"高数",value:100},
            {name:"睡觉",value:90},
            {name:"摸鱼",value:80},
            {name:"打游戏",value:70},
            {name:"reshub",value:60},
            {name:"项目",value: 50},
          ],
          scholarName:['y1','y2','y3','y4','y5','y6','y7','y8',],
          scholarCited:[120,110,100,90,80,70,60,50,],//发文数量
          scholarUsed:[120, 200, 150, 80, 70, 110, 130,260],//被引次数
        }
      },
      mounted() {
        this.getHot();
        this.drawLine();
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
                _this.hotSearch=response.data.hotSearch;//热门搜索词
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
