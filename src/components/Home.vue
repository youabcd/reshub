<template>
  <div style="min-height: 100vh;height: 100%;background-color:rgba(233,233,233,0.1);">
    <div>
      <TopBar v-if="showTopBar"></TopBar>
    </div>
    <div>
      <div style="margin-top: 25px;">
        <SearchBox></SearchBox>
      </div>
    </div>

<!--    <img :src="require('../assets/logo4.jpg')" alt="">-->

    <div v-if="isFinish" style="margin-left: 12%;margin-top: 50px;margin-bottom: 20px;">
      <WordCloudChart
        id="05"
        title="热门搜索词"
        :data="hotWords"
        width="86%"
        height="500px"
      />
    </div>

    <van-row></van-row>

  </div>
</template>

<script>
  import TopBar from "./TopBar";
  import SearchBox from "./SearchBox";
  import WordCloudChart from "./WordCloudChart";
  import axios from "axios";
  import baseUrl from "./baseUrl";
  export default {
    name: "Home",
    data() {
      return {
        showTopBar:false,
        hotWords:[],
        isFinish:false,
      }
    },
    methods:{
      getEhartsData(){
        let _this=this;
        axios.get(baseUrl+"/hotWords")
            .then(function (response) {
              console.log(response);
              _this.hotWords=response.data.hotWords;
              console.log(_this.hotWords);
              _this.isFinish=true;
              _this.showTopBar=true;
            })
      }
    },
    components: {
      TopBar,SearchBox,WordCloudChart
    },
    created() {
      this.getEhartsData();
    },
    mounted() {
      if(localStorage.getItem('myId')===null){
        localStorage.setItem('myId','')
      }
    }
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
