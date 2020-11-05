<template>
  <div style="overflow-y:scroll;">
    <TopBar></TopBar>
    <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 15%;margin-top: 2%;width: 70%;float:left;">
      <el-page-header @back="goBack" content="户门人个的个人门户"></el-page-header>
      <el-row>
        <el-col :span="18">
          <el-card class="box-card" style="float: left;">
            <div slot="header" class="clearfix">
              <span>成果</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'具体领域 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" style="float: left;">
            <div slot="header" class="clearfix">
              <span>户门人个</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'具体领域 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
        name: "PersonalPortal",
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
