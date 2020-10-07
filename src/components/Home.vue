<template>
  <div>
    <TopBar></TopBar>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <!--<div style="margin-top: 50px;width: 60%;margin-left: 20%">
      <van-row type="flex" justify="center">
        <van-col span="4">
          <el-select v-model="select" style="width: 100%;" :popper-append-to-body="false" popper-class="selectinfo">
            <el-option label="搜索全部" value="1"></el-option>
            <el-option label="搜索文献资料" value="2"></el-option>
            <el-option label="搜索学者" value="3"></el-option>
          </el-select>
        </van-col>
        <van-col span="19">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows:1,maxRows:2}" v-model="searchKey" style="width: 100%;font-size:50px" @keyup.enter="search">
          </el-input>
        </van-col>
        <van-col span="1">
          <el-button icon="el-icon-search" style="height: 60px;font-size: 25px;background:#fff" @click="search"></el-button>
        </van-col>
      </van-row>
    </div>-->
    <div>
      <SearchBox></SearchBox>
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
        imgSrc:require('../assets/watchSky01.jpeg'),
      }
    },
    methods:{
    },
    components: {
      TopBar,SearchBox,
    },
  }
</script>

<style>
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
  //opacity:0.9;
    position: fixed;
  }
</style>
