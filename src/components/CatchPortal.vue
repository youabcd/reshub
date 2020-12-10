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
            <el-input style="width: 300px" v-model="PortalForm.realname" placeholder="请输入您的真实姓名"></el-input>
            <br><br>
          </div>

          <!--身份证号-->
          <div class="identity_number">
            <label><span style="color: red">*</span>身份证号：</label>     <!--需要加id吗？ 另外v-model还是input吗-->
            <el-input style="width: 300px" v-model="PortalForm.idnumber" placeholder="请输入身份证号"></el-input>
            <br><br>
          </div>

          <!--所属机构-->
          <div class="research_institute">
            <label><span style="color: red">*</span>所属机构：</label>     <!--需要加id吗？-->
            <el-input style="width: 300px" v-model="PortalForm.institude" placeholder="请输入您目前所在的单位名称"></el-input>
            <br><br>
          </div>

          <!--联系方式-->
          <div class="communicate_email">
            <label><span style="color: red">*</span>联系邮箱：</label>     <!--需要加id吗？-->
            <el-input style="width: 300px" v-model="PortalForm.cemail" placeholder="请输入可以联系到您的电子邮箱"></el-input>
            <br><br>
          </div>

          <!--验证码-->
          <div class="identify_code">
            <label><span style="color: red">*</span>邮箱验证码：</label>
            <el-input style="width: 300px" v-model="auth_code" placeholder="请输入验证码"></el-input>
            <el-button onclick="getAuthCode()" type="primary" plain>发送验证码</el-button>
            <span v-show="!sendAuthCode"><span>{{auth_time}}</span>秒后重新发送验证码</span>
            <!--需要加入一个“发送成功”和“等待发送  ”-->
          </div>

          <!--协议-->
          <br>
          <div class="form-group">
            <label class="checkbox">
              <input id="read" type="checkbox" name="remember" value="1" /> 我已看过并同意《门户认领用户协议》
              <!--<a class="xy" href="/Agreement/ServiceAgreement" target="_blank">《门户认领用户协议》</a>-->
            </label>
          </div>

          <!--认证按钮-->
          <br>
          <div class="form-group">
            <el-button type="success" round onclick="submit()">认证门户</el-button>
          </div>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>



  </div>
</template>

<script>
  import TopBar from "./TopBar"
  import axios from 'axios'
  import baseUrl from "./baseUrl";
    export default {
        name: "CatchPortal",
      data(){
          //let comfirmpassword =

          //以下内容参考了https://www.php.cn/js-tutorial-401539.html

          return{
            PortalForm:{
              realname:'',
              idnumber:'',
              institude:'',
              cemail:''
            },
            sendAuthCode:true,
              auth_time:0,
              auth_code:"",

            rule:{
              realname:[
                {
                  requied:true,
                  message:'请输入真实姓名！',
                  trigger:'change'         //what is this
                }
              ],
              idnumber:[
                {
                  requied:true,
                  message:'请输入身份证号！',
                  trigger:'change'         //what is this
                }
              ],
              institude:[
                {
                  requied:true,
                  message:'请输入所在机构！',
                  trigger:'change'         //what is this
                }
              ],
              cemail:[
                {
                  requied:true,
                  message:'请输入自己的邮箱！',
                  trigger:'change'         //what is this
                }
              ]
            },

            input: ''
          }
      },

      methods:{
        //发送验证码
        getAuthCode(){
          const verification = this.PortalForm.cemail;
          const url =" "
            console.log("url",url);
          //axios
              this.$http.get(url).then(function(response){
                console.log("请求成功",response)
              },function(error){
              console.log("请求失败",error);
              })
            this.sendAuthCode=false;
          //倒计时
          this.auth_time = 10;
          var auth_timetimer = setInterval(
            ()=>{
              this.auth_time--;
              if(this.auth_time<=0){
                this.sendAuthCode = true;
                clearInterval(auth_timetimer);
              }
            },1000);
        },

        //上传信息
        submit(){
          this.$axios({
            method: 'post',
            url: baseUrl+'/CatchPortal',
            data:{
              name: this.PortalForm.realname,
              id: this.PortalForm.idnumber,
              institude: this.PortalForm.institude,
              email: this.PortalForm.cemail
            }
          }).then(res =>{
           if(res.data.message === 'SUCCESS'){
             this.$notify({
               title: '提示',
               message: '提交门户认领申请成功',
               duration: 3000
             });
           }else{
             this.$notify({
               title: '提示',
               message: '提交失败',
               duration: 3000
             });
           }
          })
          .catch(err=>{
            this.$notify({
              title: '提示',
              message: '提交出现错误',
              duration: 3000
            });
            console.log(err)
          })
        }

        //发送请求认证
        /*
        realname:'',
              idnumber:'',
              institude:'',
              cemail:''
         */
        /*thisAjax(){
          const realnameData = this.PortalForm.realname;
          const idnumberData = this.PortalForm.idnumber;
          const institudeData = this.PortalForm.institude;
          const cemailData = this.PortalForm.cemail;

          //网上写的注册
          //emulateJSON:true 设置后post可跨域？
          const url=" 填接口"
            this.$http.post(url,{传入的参数},{emulateJSON:true}).then(function (response)
              {

              }
            )
        }*/
      },

      components:{
          TopBar
      },
    }
</script>

<style scoped>

</style>
