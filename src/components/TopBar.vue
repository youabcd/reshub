<template>
  <div v-if="isReNew">
    <div style="width:100%;height: 55px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top: 0px;" :style="{background: colour[clickNum]}">
      <van-row></van-row>
      <van-row>
        <van-col span="3" style="margin-top: 5px;">
          <van-image src="./static/logo4.png" width="145" height="45" clickable @click="changeColour">
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
          <van-col span="6">
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
            <el-popover placement="bottom" width="20" trigger="click">
              <van-cell clickable @click="goSearchRecord"><el-link :underline="false"><i class="el-icon-edit-outline"/> 搜索记录</el-link></van-cell>
              <van-cell clickable @click="goBrowseRecord"><el-link :underline="false"><i class="el-icon-edit-outline"/> 浏览记录</el-link></van-cell>
              <van-cell clickable @click="goMyCollection"><el-link :underline="false"><i class="el-icon-star-off" /> 我的收藏</el-link></van-cell>
              <van-cell clickable @click="Quit"><el-link :underline="false"><i class="el-icon-warning-outline"/> 退出</el-link></van-cell>
              <van-image slot="reference" round fit="cover" width="45px" height="45px" :src="userImage" clickable>
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </el-popover>
          </van-col>
        </div>
      </van-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TopBar",
      data(){
          return{
            userId:localStorage.getItem("myId"),
            userImage:require('../../static/logo2.png'),
            colour:['#e6f1f4','#D5F4D5','#F4DCDF','#E3E3E3'],
            clickNum:0,
            isReNew:true,
          }
      },
      methods:{
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
        goPersonalPortal(){
          this.$router.push({
            path:'/PersonalPortal',
          })
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
        localStorage.setItem("myId",this.userId);

      },
    }
</script>

<style scoped>

</style>
