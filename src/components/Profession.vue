<template>
  <div style="overflow-y:scroll;">
    <TopBar></TopBar>
    <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 15%;margin-top: 2%;width: 70%;float:left;">
      <el-page-header @back="goBack" content="全部学科与领域"></el-page-header>
      <el-card class="box-card" style="float: left;">
        <div slot="header" class="clearfix">
          <span>计算机</span>
        </div>
        <div v-for="o in 5" :key="o" class="text item">
          {{'具体领域 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card" style="float: right;">
        <div slot="header" class="clearfix">
          <span>医学</span>
        </div>
        <div v-for="o in 5" :key="o" class="text item">
          {{'具体领域 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card" style="float: left;">
        <div slot="header" class="clearfix">
          <span>软件</span>
        </div>
        <div v-for="o in 5" :key="o" class="text item">
          {{'具体领域 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card" style="float: right;">
        <div slot="header" class="clearfix">
          <span>哲学</span>
        </div>
        <div v-for="o in 5" :key="o" class="text item">
          {{'具体领域 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
      name: "Profession",
      components:{
        TopBar
      },
    }
</script>

<style scoped>
  .text {
      font-size: 14px;
    }
  
    .item {
      margin-bottom: 18px;
    }
  
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
  
    .box-card {
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
      width: 49%;
    }
</style>
