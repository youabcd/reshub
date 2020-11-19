<template>
  <div>
    <TopBar></TopBar>
    认领门户

    <el-container style="width: 60%;margin:0 auto">
      <el-header  height=20px>  <!--需要这么高吗？-->
        
      </el-header>

      <el-main>
        <!--输入信息框-->
        <div id="insert_information">
          <!--真实姓名-->
          <div class="real_name">
            <label><span style="color: red">*</span>真实姓名：</label>     <!--需要加id吗？-->
            <el-input style="width: 300px" v-model="input" placeholder="请输入您的真实姓名"></el-input>
            <br><br>
          </div>
          <!--身份证号-->
          <div class="identity_number">
            <label><span style="color: red">*</span>身份证号：</label>     <!--需要加id吗？ 另外v-model还是input吗-->
            <el-input style="width: 300px" v-model="input" placeholder="请输入身份证号"></el-input>
            <br><br>
          </div>
          <!--所属机构-->
          <div class="research_institute">
            <label><span style="color: red">*</span>所属机构：</label>     <!--需要加id吗？-->
            <el-input style="width: 300px" v-model="input" placeholder="请输入您目前所在的单位名称"></el-input>
            <br><br>
          </div>
          <!--联系方式-->
          <div class="communicate_email">
            <label><span style="color: red">*</span>联系方式：</label>     <!--需要加id吗？-->
            <el-input style="width: 300px" v-model="input" placeholder="请输入可以联系到您的电子邮箱"></el-input>
            <br><br>
          </div>
          <!--验证码-->
          <div class="identify_code">
            <label>邮箱验证码：</label>
            <el-input style="width: 300px" v-model="input" placeholder="请输入验证码"></el-input>
            <el-button onclick="sendCode()" type="primary" round>发送验证码</el-button>
            <!--需要加入一个“发送成功”和“等待发送  ”-->
          </div>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>



  </div>
</template>

<script>
  import TopBar from "./TopBar";
    export default {
        name: "CatchPortal",
      data(){
          return{
            input: ''
          }
      },

      methods:{
        //发送验证码
        sendCode(){}
      },

      components:{
          TopBar
      },
    }
</script>

<style scoped>

</style>
