<template>
  <div>
    <TopBar></TopBar>
    <div>
      <el-container style="height: 680px; border: 1px solid #eee;width: 64%;margin-left: 13%">
        <el-aside width="150px" style="">
          <div style="margin-top: 10px;font-size: 20px;">
            <i class="el-icon-s-promotion"></i>消息中心
          </div>
          <el-menu :default-active="nowActive">
            <el-menu-item index="1" @click="nowActive='1'">
              <i class="el-icon-menu"></i>
              <span slot="title">系统消息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="nowActive='2'">
              <i class="el-icon-menu"></i>
              <span slot="title">我的消息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <div v-if="nowActive=='1'">
              <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);">
                <van-row></van-row>
                <van-row>
                  <van-col span="18" style="margin-left:15px;margin-bottom: 10px;margin-top: 10px;text-align:left;font-size: 22px;color: lightgrey">
                    系统消息
                  </van-col>
                  <van-col span="2">
                    一键已读
                  </van-col>
                  <van-col span="2">
                    一键清空
                  </van-col>
                  <van-col span="2"></van-col>
                </van-row>
                <van-row></van-row>
              </div>
              <div v-for="(item,index) in systemMessage" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);">
              <van-row></van-row>
              <van-row style="margin-left:15px;margin-top: 10px;">
                <van-col span="12" style="font-size: 20px;text-align: left;">
                  {{item.title}}
                </van-col>
                <van-col span="10" style="font-size: 14px;color: #CCCCCC;margin-top: 5px;text-align: right;">
                  {{item.sendTime}}
                </van-col>
                <van-col span="2"></van-col>
              </van-row>
              <div style="margin-left: 15px;margin-top: 10px;margin-bottom: 10px;font-size: 14px;text-align: left;">
                {{item.texts}}
              </div>
              <van-row></van-row>
            </div>
            </div>

            <!--私信-->
            <div v-if="nowActive=='2'">
              <el-container>
                <el-header></el-header>
              </el-container>
            </div>
          </el-main>
        </el-container>

      </el-container>

    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
      name: "Message",
      data(){
          return{
            nowActive:'1',
            systemMessage:[
              {title:'message1',texts:'这是消息消息太长怎么办ddfsfa的撒发生第三方啊算法撒旦疯狂决定是否接受会计法圣诞节快乐房价快速分开计算框架反抗精神就是克里夫是会计1',sendTime:'2020/10/7 19:53'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title: 'a',texts:'a',sendTime:'2020/10/7 20:14'},
              {title:'message2',texts:'dfhkjdhfjhjhjkfhjghadfkj gj hk shdkjh ahkh ah sahkjsah skjhsjgh kshjhsdkjh khjkdhjkh gkjhdgkjhdfjkgh djkkj',sendTime:'2020/10/7 19:53'},
            ],

          }
      },
      components:{
        TopBar
      },
    }
</script>

<style>

</style>
