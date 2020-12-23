<template>
  <div>
    <TopBar></TopBar>
    <h1 style="font-family:Helvetica;margin-top: 100px">认领门户</h1>

    <el-container style="width: 60%;margin:0 auto">
      <el-header  height=5px>  <!--需要这么高吗？-->

      </el-header>

      <el-main>
        <!--输入信息框-->
        <div id="insert_information" style="">
          <!--联系方式-->
          <div class="communicate_email" style="margin-left: -80px;">
            <label><span style="color: red">*</span>教育邮箱：</label>
            <el-input style="width: 300px" v-model="PortalForm.ProEmail" placeholder="请输入您的教育邮箱" ></el-input>
            <br><br>
          </div>

          <!--验证码-->
          <div class="identify_code" style="margin-left: 20px">
            <label><span style="color: red">*</span>邮箱验证码：</label>
            <el-input style="width: 300px" v-model="auth_code" placeholder="请输入验证码"></el-input>
            <el-button @click="askVerificationCode()" type="primary" plain style="width: 112px" :disabled="disabled||PortalForm.ProEmail.length===0">
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

            </label>
          </div>

          <!--认证按钮-->
          <br>
          <div class="form-group">
            <el-button type="success" round @click="submit()">认证门户</el-button>
          </div>

          <br>
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
        //自定义的邮箱和手机验证规则
        var checkEmail = (rule, value, callback) => {
          //var email = $(".email").val();
          const regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          //if(!email.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/) || email.indexOf('edu')==-1){
          //  callback(new Error("请输入正确的教育邮箱！"));
          ///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          // }
          if (regEmail.test(value) && value.indexOf('.edu.cn')!==-1) {
            return callback();
          }
          callback(new Error("请输入正确的教育邮箱！"));
        };


          return{
            resId:'',
            dialogVisible: false,
            timeContent: '发送验证码',
            disabled:false,
            PortalForm:{
              ProEmail:''
            },
            sendAuthCode:true,
              auth_time:0,
              auth_code:"",

            rule:{
              ProEmail:[
                {
                  validator:checkEmail,
                  required:true,
                  message:'请输入教育邮箱！',
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
          if(this.timeContent==='发送验证码'){
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
              mailAddress:this.PortalForm.ProEmail
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

        //用户创建门户
        create(){
          let _this=this;
          let data=new FormData();
          data.append('UserEmail',localStorage.getItem('myId'));
          data.append('ResEmail',_this.PortalForm.ProEmail);
          data.append('ResId',_this.resId);
          axios.post(baseUrl+'/newPortal',data)
            .then(function (res){
            console.log(res);
            console.log(res.data.status);
            if(res.data.status === 2){
              _this.$notify({
                title: '提示',
                message: '门户创建成功',
                duration: 3000
              });
            }else{
              _this.$notify({
                title: '提示',
                message: '门户创建失败',
                duration: 3000
              });
            }
          }).catch(err=>{
            _this.$notify({
              title: '提示',
              message: '门户创建出现错误',
              duration: 3000
            });
            console.log(err)
          })
        },

        //用户申诉门户
        appeal(){
          let _this=this;
          let data=new FormData();
          data.append('UserEmail',localStorage.getItem('myId'));
          data.append('ResEmail',_this.PortalForm.ProEmail);
          data.append('ResId',_this.resId);
          axios.post(baseUrl+'/appealPortal',data)
            .then(function (res){
            console.log(res.data.status);
            if(res.data.status === 4){
              _this.$notify({
                title: '提示',
                message: '提交门户申诉成功',
                duration: 3000
              });
            }else{
              _this.$notify({
                title: '提示',
                message: '提交申诉失败',
                duration: 3000
              });
            }
          })
        },

        //上传信息，用户认领门户
        submit(){
          let _this=this;
          console.log(_this.PortalForm.ProEmail);
          let data=new FormData();
          data.append('UserEmail',localStorage.getItem('myId'));
          data.append('ResEmail',_this.PortalForm.ProEmail);
          data.append('ResId',_this.resId);
          axios.post(baseUrl+'/CatchPortal',data)
            .then(res =>{
            console.log(res.data.status);
            console.log(_this.resId);
           if(res.data.status === 1){
             localStorage.setItem('portalId',_this.resId);
             _this.$notify({
               title: '提示',
               message: '提交门户认领申请成功',
               duration: 3000,
             });
             _this.$router.push({
               path:'/PersonalPortal',
             })
           }else{
             _this.$notify({
               title: '提示',
               message: '提交门户认领失败',
               duration: 3000
             });
           }
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



      },

      components:{
          TopBar
      },

      created() {
          this.resId=this.$route.query.resId;
          console.log(this.$route.query.resId)
      }
    }
</script>

<style scoped>

</style>
