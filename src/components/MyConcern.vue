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
    export default {
        name: "MyConcern",
      data(){
          return{
            nowActive:'1',
            textLength:'450',

            myConcern:[
              {headImg:'background01.jpg',name:'youabcd',state:'已关注',label:'这是一个人'},
              {headImg:'background01.jpg',name:'youabcd',state:'已关注',label:'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'},
            ],

            myFans:[
              {headImg:'background01.jpg',name:'youabcd_fans',state:'已关注',label:'这是一个人'},
              {headImg:'background01.jpg',name:'youabcd_fans',state:'已关注',label:'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'},
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
      },
    }
</script>

<style>
  .background{
    background-image: url("../assets/greyBackground.png");
  }
</style>
