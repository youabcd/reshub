<template>
  <div style="background-color:white;">
    <TopBar></TopBar>
    <el-container style="width: 60%;margin:0 auto">
      <el-header height=180px>
        
      </el-header>
      <el-main>
        <el-col :span="17">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>可视化</span>
            </div>
            图图图图图</br>图图图图图
          </el-card>
          <el-divider content-position="left">发表作品</el-divider>
          <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in tableData0" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
            <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
              <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
            </div>
            <div style="display: inline;position: absolute;right: 20px;top: 5px">
              <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom" @click="addCollection(index)">
                <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
              </el-tooltip>
              <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                <i class="el-icon-share" style="font-size: 25px;width: 30px" data-clipboard-text="Copy" @click="Copy"></i>
              </el-tooltip>
            </div>
            <div style="text-align: left;position: absolute;top: 60px;width: 96%">
              <p style="height: 20px" >{{item.msg}}</p>
            </div>         
            <div>
              <el-tag type="info" style="position: absolute;right: 170px;top: 100px;width: 50px;text-align: center;margin-top: 0px">
                <span>{{item.type}}</span>
              </el-tag>
              <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 110px">
                <span> {{item.collectionSum}}</span>
              </i>
              <i class="el-icon-view" style="position: absolute;right: 20px;top: 110px">
                <span> {{item.viewSum}}</span>
              </i>
            </div>
          </el-card>
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="800"
              style="margin-top: 10px;height: 100px">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="7">
          <el-card class="box-card" shadow="hover" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>合作作者</span>
            </div>
            <div v-for="o in 2" :key="o" class="text item">
              {{'路人' + o }}
            </div>
          </el-card>
          
          <el-card class="box-card" shadow="hover" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>合作机构</span>
            </div>
            <div v-for="o in 2" :key="o" class="text item">
              {{'机构' + o }}
            </div>
          </el-card>
          
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import TopBar from "./TopBar";
    import Clipboard from 'clipboard';
    export default {
      name: "PersonalPortal",
      data() {
        return {
          menuIndex: "0",
          tableData0: [
            {
              paperId:'0',
              title:'Youtube',
              msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字2',
              type:"会议",
              collectStatus:true,
              collectionSum:666,
              viewSum:777,
              link:'https://www.youtube.com/',
              collectTime:'2016-05-04'
            }],
        }
      },
      components:{
        TopBar
      },
    }
</script>

<style scoped>
  
  .box-card {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
  }
</style>
