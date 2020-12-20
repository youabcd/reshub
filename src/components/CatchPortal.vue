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
            <el-button @click="askVerificationCode()" type="primary" plain>
              {{timeContent}}
            </el-button>

            <!--需要加入一个“发送成功”和“等待发送  ”-->
          </div>

          <!--协议-->
          <br>
          <div class="form-group">
            <label class="checkbox">
              <input id="read" type="checkbox" onclick="confirmBox()" value="1" checked="checked"/> 我已看过并同意
              <el-button type="text" @click="dialogVisible = true">《门户认领用户协议》</el-button>

              <el-dialog
                title="门户认领用户协议"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>请仔细阅读以下内容......</span>
                <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
              </el-dialog>

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
  import TopBar from "./TopBar";
  import axios from 'axios';
  import baseUrl from "./baseUrl";
    export default {
        name: "CatchPortal",
      data(){
          //let comfirmpassword =

          //以下内容参考了https://www.php.cn/js-tutorial-401539.html
          //https://blog.csdn.net/qq_41800649/article/details/106507224

        //自定义的邮箱和手机验证规则
        var checkEmail = (rule, value, callback) => {
          //var email = $(".email").val();
          const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          //if(!email.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/) || email.indexOf('edu')==-1){
          //  callback(new Error("请输入正确的教育邮箱！"));
          //}
          if (regEmail.test(value) && value.indexOf('edu')!=-1) {
            return callback();
          }
          callback(new Error("请输入正确的教育邮箱！"));
        };


          return{

            dialogVisible: false,
            timeContent: '发送验证码',

            PortalForm:{
              realname:'',
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
                  trigger:'blur'
                }
              ],
              institude:[
                {
                  requied:true,
                  message:'请输入所在机构！',
                  trigger:'blur'
                }
              ],
              cemail:[
                {
                  validator:checkEmail,
                  requied:true,
                  message:'请输入自己的邮箱！',
                  trigger:'blur'
                },

              ]
            },

            input: ''
          }
      },

      methods:{
        confirmBox(){
          var confirmbox = this.getElementById("read");
          if(!confirmbox.checked){
            alert("请阅读用户协议并同意");
          }
        },

        //发送验证码        感谢登录界面的验证码接口
        askVerificationCode() {
          let _this = this;
          //计时器
          if(this.timeContent=='发送验证码'){
            let time=59;
            let timer=setInterval(()=>{
              if(time>0){
                this.timeContent=time+'s';
                this.disabled=true;
                time--;
              }
              else{
                window.clearInterval(timer);
                this.disabled=false;
                this.timeContent='发送验证码';
              }
            },1000);
          }
          console.log('这个就是Email:'+_this.mail);
          axios.get(baseUrl+'/passwordLost',{// need this?
            params:{
              mailAddress:this.PortalForm.cemail
            }
          })

            .then(function (response){
              //Toast(response.data.message);
              console.log(response);
              //_this.subidcode = response.data.result;
              console.log('askVerificationCode:response.data.result:'+response.data.result);
            })
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });
        },

        //上传信息，用户认领门户
        submit(){
          let _this=this;
          axios.get(baseUrl+'/CatchPortal',{  //按接口列表写的
            realName: this.PortalForm.realname,
            personCommunication: this.PortalForm.cemail,
            researchInstitute: this.PortalForm.institude

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
        },

        //弹窗
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
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
          const usernameData = this.PortalForm.usernamenumber;
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
