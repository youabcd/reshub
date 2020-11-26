<template>
  <div style="background: #eeeeee;min-height: 100vh;height: 100%">
    <!--<div class="background" v-bind:style="{backgroundImage:'url('+back[whichPic]+')'}">
    </div>-->
    <div>
      <TopBar></TopBar>
    </div>
    <div>
      <div style="margin-top: 25px;">
        <SearchBox></SearchBox>
      </div>
    </div>

    <div>
      <WordCloudChart
        id="05"
        title="热门搜索词"
        :data="echarts05Data"
        width="500px"
        height="500px"
      />
    </div>

    <div>
      <div class="back-top-circle1" @click="nextPic">
        <i class="el-icon-arrow-right" ></i>
      </div>

      <div class="back-top-circle2" @click="backPic">
        <i class="el-icon-arrow-left" ></i>
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "./TopBar";
  import SearchBox from "./SearchBox";
  import WordCloudChart from "./WordCloudChart";
  export default {
    name: "Home",
    data() {
      return {
        back:[
          require('../assets/bing01.jpg'),
          require('../assets/bing02.jpg'),
          require('../assets/bing03.jpg'),
          require('../assets/bing04.jpg'),
          require('../assets/bing06.jpg'),
          require('../assets/bing07.jpg'),
          require('../assets/bing08.jpg'),
          require('../assets/bing09.jpg'),
          require('../assets/bing10.jpg'),
          require('../assets/bing11.jpg'),
          require('../assets/bing13.jpg'),
        ],
        whichPic:parseInt(Math.random()*11),
        echarts05Data: [
          {
            name: "十九大精神",
            value: 15000
          },
          {
            name: "两学一做",
            value: 10081
          },
          {
            name: "中华民族",
            value: 9386
          },
          {
            name: "马克思主义",
            value: 7500
          },
          {
            name: "民族复兴",
            value: 7500
          },
          {
            name: "社会主义制度",
            value: 6500
          },
          {
            name: "国防白皮书",
            value: 6500
          },
          {
            name: "创新",
            value: 6000
          },
          {
            name: "民主革命",
            value: 4500
          },
          {
            name: "文化强国",
            value: 3800
          },
          {
            name: "国家主权",
            value: 3000
          },
          {
            name: "武装颠覆",
            value: 2500
          },
          {
            name: "领土完整",
            value: 2300
          },
          {
            name: "安全",
            value: 2000
          },
          {
            name: "从严治党",
            value: 1900
          },
          {
            name: "现代化经济体系",
            value: 1800
          },
          {
            name: "国防动员",
            value: 1700
          },
          {
            name: "信息化战争",
            value: 1600
          },
          {
            name: "局部战争",
            value: 1500
          },
          {
            name: "教育",
            value: 1200
          },
          {
            name: "职业教育",
            value: 1100
          },
          {
            name: "兵法",
            value: 900
          },
          {
            name: "一国两制",
            value: 800
          },
          {
            name: "特色社会主义思想",
            value: 700
          },
        ],
      }
    },
    methods:{
      nextPic(){
        if(this.whichPic<this.back.length-1){
          this.whichPic++;
        }
        else{
          this.whichPic=0;
        }
      },
      backPic(){
        if(this.whichPic>0){
          this.whichPic--;
        }
        else{
          this.whichPic=this.back.length-1;
        }
      }
    },
    components: {
      TopBar,SearchBox,WordCloudChart
    },
    created() {

    },
  }
</script>

<style>
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: fixed;
    /*background: url("../assets/bing02.jpg");*/
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .back-top-circle1{
    position: fixed;
    background-color: #fff;
    width: 40px;
    height: 40px;
    bottom: 50px;
    right: 60px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;
  }
  .back-top-circle2{
    position: fixed;
    background-color: #fff;
    width: 40px;
    height: 40px;
    bottom: 50px;
    right: 120px;
    border-radius: 100%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;
  }
</style>


