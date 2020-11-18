<template>
  <div>
    <div class="background" v-bind:style="{backgroundImage:'url('+back[whichPic]+')'}">
    </div>
    <div>
      <TopBar></TopBar>
    </div>

    <div>
      <SearchBox></SearchBox>
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
  export default {
    name: "Home",
    data() {
      return {
        back:[
          require('../assets/bing01.jpg'),
          require('../assets/bing02.jpg'),
          require('../assets/bing03.jpg'),
          require('../assets/bing04.jpg'),
          require('../assets/bing05.jpg'),
          require('../assets/bing06.jpg'),
          require('../assets/bing07.jpg'),
          require('../assets/bing08.jpg'),
        ],
        whichPic:parseInt(Math.random()*7),
      }
    },
    methods:{
      nextPic(){
        if(this.whichPic<7){
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
          this.whichPic=7;
        }
      }
    },
    components: {
      TopBar,SearchBox,
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
    background-size: 100%;
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

 
