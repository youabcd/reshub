<template>
  <div v-if="isReNew">
    <div style="width:100%;height: 55px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top: 0px;" :style="{background: colour[clickNum]}">
      <van-row></van-row>
      <van-row>
        <van-col span="3" style="margin-top: 5px;">
          <van-image v-if="showPic" :src="require('../assets/logo4.jpg')" width="145" height="45" style="cursor: pointer;" @click="changeColour">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </van-col>
        <van-col span="2" style="margin-top:15px;">
          <el-link :underline="false"><span style="font-size: 20px" clickable @click="goHome"><i class="el-icon-s-home"/>首页</span></el-link>
        </van-col>
        <van-col span="2" style="margin-top:15px;">
          <el-link :underline="false"><span style="font-size: 20px" clickable @click="goHotspotAnalysis"><i class="el-icon-s-flag"/>热点分析</span></el-link>
        </van-col>

        <div v-if="userId.length==0">
          <van-col span="14">
          </van-col>
          <van-col span="1" style="margin-top:18px;">
            <el-link :underline="false"><span style="font-size: 16px" clickable @click="goLogin"><i class="el-icon-user"/>登录</span></el-link>
          </van-col>
          <van-col span="1" style="margin-top:18px;">
            <el-link :underline="false"><span style="font-size: 16px" clickable @click="goRegister"><i class="el-icon-edit"/>注册</span></el-link>
          </van-col>
          <van-col span="1"></van-col>
        </div>

        <div v-if="userId.length>0">
          <van-col span="6" style="margin-top:15px;text-align: left">
            <el-link v-if="userId==='root@root'" :underline="false"><span style="font-size: 20px" clickable @click="goAd"><i class="el-icon-s-home"/>管理员</span></el-link>
          </van-col>
          <van-col span="10" style="margin-top:18px;text-align: right;">
            <el-link :underline="false"><span style="font-size: 16px;margin-left: 20px;" clickable @click="goPersonalPortal"><i class="el-icon-paperclip"/>个人门户</span></el-link>
            <el-link :underline="false"><span style="font-size: 16px;margin-left: 20px;" clickable @click="goSearchRecord"><i class="el-icon-edit-outline"/>搜索记录</span></el-link>
            <el-link :underline="false"><span style="font-size: 16px;margin-left: 20px;" clickable @click="goBrowseRecord"><i class="el-icon-edit-outline"/>浏览记录</span></el-link>
            <el-link :underline="false"><span style="font-size: 16px;margin-left: 20px;" clickable @click="goMyCollection"><i class="el-icon-star-off" />收藏</span></el-link>
            <el-link :underline="false"><span style="font-size: 16px;margin-left: 20px;" clickable @click="goMyConcern"><i class="el-icon-user"/>关注</span></el-link>
            <el-link :underline="false"><span style="font-size: 16px;margin-left: 20px;" clickable @click="goMessage"><i class="el-icon-bell"/>消息&nbsp&nbsp&nbsp</span></el-link>
          </van-col>
          <van-col span="1" style="margin-top:5px;">
            <el-popover ref="popoverx" placement="bottom" width="20" trigger="click">
              <van-cell clickable @click="goSearchRecord"><el-link :underline="false"><i class="el-icon-edit-outline"/> 搜索记录</el-link></van-cell>
              <van-cell clickable @click="goBrowseRecord"><el-link :underline="false"><i class="el-icon-edit-outline"/> 浏览记录</el-link></van-cell>
              <van-cell clickable @click="changeMyHead"><el-link :underline="false"><i class="el-icon-edit"/> 修改头像</el-link></van-cell>
              <van-cell clickable @click="goMyCollection"><el-link :underline="false"><i class="el-icon-star-off" /> 我的收藏</el-link></van-cell>
              <van-cell clickable @click="Quit"><el-link :underline="false"><i class="el-icon-warning-outline"/> 退出</el-link></van-cell>

              <van-image slot="reference" round fit="cover" width="45px" height="45px" :src="require('../assets/Head/'+userImage)" style="cursor: pointer;">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>

            </el-popover>
          </van-col>
        </div>
      </van-row>
    </div>
    <div style="z-index: 999999999999999;position: absolute;">
      <van-popup v-model="showChangeHead" closeable style="width: 500px;height: 500px;border-radius: 10px;">
        <div style="margin-top: 15px;font-size: 20px;">请选择头像</div>
        <div v-for="(item,index) in headImage" :key="index" @click="changeHead(item)" style="display:inline-block;margin-top: 10px;padding: 10px;border-radius: 5px;cursor: pointer;">
          <van-image fit="cover" width="100px" height="100px" :src="require('../assets/Head/'+item)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </van-popup>
    </div>
    <div style="z-index: 999999999999999;position: absolute;">
      <van-popup v-model="showGotoPortal" closeable style="width: 500px;height: 300px;border-radius: 10px;">
        <div style="margin-top: 15px;font-size: 20px;">您还没有个人门户，您可以选择</div>
        <div style="margin-top: 30px;">
          <el-button type="primary" @click="newPortal">新建门户</el-button>
        </div>
        <div style="margin-top: 30px;">
          <el-button type="primary" @click="catchPortal">认领门户</el-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import baseUrl from "./baseUrl";
    export default {
      name: "TopBar",
      data(){
          return{
            userId:localStorage.getItem("myId"),//'123',
            userImage:localStorage.getItem("userHead"),
            colour:['#e6f1f4','#D5F4D5','#F4DCDF','#E3E3E3'],
            clickNum:0,
            showPic:false,
            isReNew:true,
            showChangeHead:false,
            headImage:[
              'head01.png',
              'head02.png',
              'head03.png',
              'head04.png',
              'head05.png',
              'head06.png',
              'head07.png',
              'head08.png',
              'head09.jpg',
              'head10.jpg',
              'head11.jpg',
              'head12.jpg',
              'head13.jpg',
              'head14.jpg',
              'head15.jpg',
              'head16.jpg',
            ],
            showGotoPortal:false,
          }
      },
      methods:{
        goAd(){
          this.$router.push({
            path:'/Administrator'
          })
        },
        newPortal(){
          let _this=this;
          let data=new FormData();
          data.append('UserEmail',localStorage.getItem('myId'));
          axios.post(baseUrl+'/newPortal',data)
          .then(function (response) {
            if(response.data.status===2){
            _this.$message({
              message:'恭喜您有了自己的门户',
              type:'success'
            });
            localStorage.setItem("portalId",response.data.ResId);
            localStorage.setItem("authorId",localStorage.getItem("portalId"));
            _this.$router.push({
              path:'/PersonalPortal'
            })
          }})
        },
        catchPortal(){
          this.showGotoPortal=false;
          this.$message({
            message:'您需要自己搜索想要认领的门户',
            type:'warning'
          });
        },
        goHome(){
          this.$router.push({
            path:'/',
          })
        },
        goHotspotAnalysis(){
          this.$router.push({
            path:'/HotspotAnalysis',
          })
        },

        //修改头像
        changeMyHead(scope){
          this.showChangeHead=true;
          this.$refs.popoverx.showPopper=false;
        },
        changeHead(item){
          /*this.showChangeHead=false;
          this.userImage=item;
          localStorage.setItem("userHead",item);*/
          let _this=this;
          let data = new FormData();
          data.append('userId',localStorage.getItem("myId"));
          data.append('url',item);
          axios.post(baseUrl+'/changeHead',data)
          .then(function (response) {
            console.log(response);
            if(response.data.status===1){
              _this.showChangeHead=false;
              _this.userImage=item;
              localStorage.setItem("userHead",item);
              this.$message({
                message:'修改成功',
                type:'success'
              });
            }
            else{
              this.$message.error('修改失败！');
            }
          })
        },

        goPersonalPortal(){
          if(localStorage.getItem("portalId").length>0){
            localStorage.setItem("authorId",localStorage.getItem("portalId"));
            this.$router.push({
              path:'/PersonalPortal',
            })
          }
          else{
            this.showGotoPortal=true;
          }
        },
        goMessage(){
          this.$router.push({
            path:'/Message',
          })
        },
        goLogin(){
          this.$router.push({
            path:'/Login',
          })
        },
        goRegister(){
          this.$router.push({
            path:'/Register',
          })
        },
        goMyCollection(){
          this.$router.push({
            path:'/MyCollection',
          })
        },
        goSearchRecord(){
          this.$router.push({
            path:'/SearchRecord',
          })
        },
        goMyConcern(){
          this.$router.push({
            path:'/MyConcern',
          })
        },
        goBrowseRecord(){
          this.$router.push({
            path:'/BrowseRecord',
          })
        },
        Quit(){
          localStorage.setItem("myId","");
          this.$router.push({
            path:'/HelloWorld',
            query:{nowPath:this.$router.path}
          });
        },
        changeColour(){
          this.clickNum++;
          this.clickNum=this.clickNum%4;
        }
      },
      mounted() {
        if(localStorage.getItem("myId")==null){
          localStorage.setItem("myId",'');
        }
        if(localStorage.getItem("userHead")==null){
          localStorage.setItem("userHead",'head01.png');
        }
        // this.showPic=true;
        this.showPic=false;
        // window.location.reload();
        this.showPic=true;
      },
      created() {
      }
    }
</script>

<style scoped>

</style>
