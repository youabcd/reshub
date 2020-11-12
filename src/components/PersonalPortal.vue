<template>
  <div style="background-color:white;">
    <TopBar></TopBar>
    <el-container style="width: 60%;margin:0 auto">
      <el-header height=180px>
        
      </el-header>
      <el-main>
        <el-col :span="18">
          <el-card class="box-card" style="float: left;">
            
          </el-card>
          <span>&nbsp</span>
          <span>&nbsp</span>
          <el-divider content-position="left">发表作品</el-divider>
          <el-card class="box-card" style="float: left;">
            <div slot="header" class="clearfix">
              <span>研究成果</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'具体领域 ' + o }}
            </div>
          </el-card>

          <span>&nbsp</span>
          <el-divider content-position="left">关系网络</el-divider>
          <el-card class="box-card" style="float: left;">
            <div slot="header" class="clearfix">
              <span>网络</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'网络 ' + o }}
            </div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>合作作者</span>
            </div>
            <div v-for="o in 2" :key="o" class="text item">
              {{'路人' + o }}
            </div>
          </el-card>
          
          <el-card class="box-card" style="float: right;width: 95%;">
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

    export default {
        name: "PersonalPortal",
      components:{
        TopBar
      },
    }
</script>

<style scoped>
  
  .box-card {
    /* padding-left: -10px;
    padding-right: -10px; */
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
  }
</style>
