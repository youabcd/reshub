<template>
  <el-container style="height: 100vh;background-color: #545c64;">
    <el-aside width="200px">
      <div style="height: 50px;margin-top: 10px;font-size: 20px">
        <img src="../../static/logo4.png" alt="" width="80%">
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 25%;text-align: left;margin-top: 10px">
        <el-menu-item index="1">
          <i class="el-icon-document" style="margin-left: 25px"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-s-check" style="margin-left: 25px"></i>
          <span slot="title">审核</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-chat-dot-round" style="margin-left: 25px"></i>
          <span slot="title">申诉</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Administrator",
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height:100%
  }

  /*.el-aside {*/
  /*  background-color: #545c64;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 100vh;*/
  /*}*/

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-menu {
    border-right: solid 0 #e6e6e6!important;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 100%;
  }
</style>
