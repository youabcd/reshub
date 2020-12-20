<template>
  <div>
    <TopBar></TopBar>
    <div class="background"></div>
    <div style="background-color: #f4f5f7">
      <el-container style="height: 680px; border: 1px solid #eee;width: 64%;margin-left: 13%;">
        <el-aside width="150px" style="">
          <div style="margin-top: 10px;font-size: 20px;">
            <i class="el-icon-s-promotion"></i>我的关注
          </div>
          <el-menu :default-active="nowActive">
            <el-menu-item index="1" @click="nowActive='1'">
              <span style="">●</span>
              <span slot="title">全部关注</span>
            </el-menu-item>
            <el-menu-item index="2" @click="nowActive='2'">
              <span style="">●</span>
              <span slot="title">我的粉丝</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <div v-if="nowActive=='1'" style="margin-top: 17px;">
            <van-cell v-for="(item,index) in myConcern" :key="index" title-style="text-align: left; margin-left: 20px">
              <template #title>
                <el-link :underline="false" @click="toPersonalPortal(item)">{{item.name}}</el-link>
              </template>
              <template #icon>
                <van-image
                  @click="toPersonalPortal(item)"
                  round
                  width="40"
                  height="40"
                  style="cursor: pointer"
                  v-bind:src="require('../assets/'+item.headImg)">
                </van-image>
              </template>
              <template #default>
                <el-tooltip class="item" effect="dark" content="更多操作" placement="top">
                <el-popover
                  placement="bottom"
                  width="100"
                  trigger="click">
                  <span slot="reference" style="font-size: 25px;"><i class="el-icon-more"></i></span>
                  <div style="text-align: center;"></div>
                  <van-cell clickable @click="cancelConcern(item)"><i class="el-icon-delete"></i> 取消关注</van-cell>
                  <van-cell clickable @click="sendMessage(item)"><i class="el-icon-message"></i> 发送消息</van-cell>
                </el-popover>
                </el-tooltip>
              </template>
              <template #label>
                <div v-bind:style="{width:textLength+'px'}"><div class="van-ellipsis">{{item.label}}</div></div>
              </template>
            </van-cell>
          </div>

          <div v-if="nowActive=='2'" style="margin-top: 17px;">
            <van-cell v-for="(item,index) in myFans" :key="index" title-style="text-align: left; margin-left: 20px">
              <template #title>
                <el-link :underline="false" @click="toPersonalPortal(item)">{{item.name}}</el-link>
              </template>
              <template #icon>
                <van-image
                  @click="toPersonalPortal(item)"
                  round
                  width="40"
                  height="40"
                  style="cursor: pointer"
                  v-bind:src="require('../assets/'+item.headImg)">
                </van-image>
              </template>
              <template #default>
                <el-tooltip class="item" effect="dark" content="更多操作" placement="top">
                  <el-popover
                    placement="bottom"
                    width="100"
                    trigger="click">
                    <span slot="reference" style="font-size: 25px;"><i class="el-icon-more"></i></span>
                    <div style="text-align: center;"></div>
                    <van-cell clickable @click="sendMessage(item)"><i class="el-icon-message"></i> 发送消息</van-cell>
                  </el-popover>
                </el-tooltip>
              </template>
              <template #label>
                <div v-bind:style="{width:textLength+'px'}"><div class="van-ellipsis">{{item.label}}</div></div>
              </template>
            </van-cell>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";
    import axios from "axios";
    import baseUrl from "./baseUrl";
    export default {
        name: "MyConcern",
      data(){
          return{
            nowActive:'1',
            textLength:'450',

            myConcern:[
              {name:'youabcd',headImg:'background01.jpg',state:'已关注',label:'这是一个人',id:'123'},
              {name:'youabcd',headImg:'background01.jpg',state:'已关注',label:'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',id:'123'},
            ],

            myFans:[
              {headImg:'background01.jpg',name:'youabcd_fans',state:'已关注',label:'这是一个人',id:'123'},
              {headImg:'background01.jpg',name:'youabcd_fans',state:'已关注',label:'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',id:'123'},
            ]
          }
      },
      components: {TopBar},
      methods:{
        toPersonalPortal(item){
          this.$router.push({
            path:'/PersonalPortal',
          });
        },
        getConcern(){
          let _this=this;
          axios.get(baseUrl+'/getMyConcern',{
            params:{
              userId:localStorage.getItem("myId"),
            }
          })
            .then(function (response) {
              console.log(response);
              _this.myConcern=response.data.myConcern;
              _this.myFans=response.data.myFans;
            })
        },
        cancelConcern(item){//取关
          let _this=this;
          let data = new FormData();
          data.append('UserEmail', localStorage.getItem('myId'));
          data.append('ResearchId', item.id);
          axios.post(baseUrl+'/getMyConcern',data).
          then(function (response) {
              console.log(response);
              if(response.data.status==1){
                this.myConcern.splice(item.index,1);
                this.$message({
                  message:response.data.message,
                  type:'success'
                });
              }
              else{
                this.$message.error('出错啦！');
              }
            })
        },
        sendMessage(item){//发消息
          this.$router.push({
            path:'/Message',
            name:'Message',
            params:{newFriendId:item.id,newFriendName:item.name,newFriendHead:item.headImg},
          });
          localStorage.setItem("nowActive",'2');
          localStorage.setItem("whichFriend",'-1');
        },
      },
      mounted() {
          this.getConcern();
      }
    }
</script>

<style>
  .background{
    background-image: url("../assets/greyBackground.png");
  }
</style>
