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
              <span style="">●</span>
              <span slot="title">系统消息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="nowActive='2'">
              <span style="">●</span>
              <span slot="title">我的消息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <div v-if="nowActive=='1'">
              <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);border-radius: 8px;">
                <van-row></van-row>
                <van-row>
                  <van-col span="18" style="margin-left:15px;margin-bottom: 10px;margin-top: 10px;text-align:left;font-size: 18px;">
                    系统消息
                  </van-col>
                  <van-col span="6"></van-col>
                </van-row>
                <van-row></van-row>
              </div>
              <div v-for="(item,index) in systemMessage" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);border-radius: 5px;">
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
              <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);border-radius: 8px;">
                <van-row></van-row>
                <van-row>
                  <van-col span="18" style="margin-left:15px;margin-bottom: 10px;margin-top: 10px;text-align:left;font-size: 18px;">
                    我的消息
                  </van-col>
                  <van-col span="6"></van-col>
                </van-row>
                <van-row></van-row>
              </div>
              <el-container style="height: 590px;">
                <el-aside width="220px" style="">
                  <div style="margin-top: 10px;font-size: 20px;">
                    消息中心
                  </div>
                  <div>
                    <van-cell v-for="(item,index) in recentMessage" :key="index" clickable @click="openChats(item)">
                      {{item.friendName}}
                    </van-cell>
                  </div>
                </el-aside>
                <el-main>
                  <div class="message2">
                    大家好，我是小胡<br>个人主页：hlz.space<br>个人服务网站：www.loveconvert.com
                  </div>
                </el-main>
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

            recentMessage:[
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
              {friendName:'youabcd'},
            ],
            chats:[
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:11'},
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:12'},
              {sender:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:13'},
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:14'},
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:15'},
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:16'},
              {sender:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:17'},
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:18'},
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:19'},
              {sender:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:20'},
              {sender:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:21'},
              {sender:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:22'},
            ]
          }
      },
      components:{
        TopBar
      },
      methods:{
        openChats(item){

        },
      }
    }
</script>

<style>
  .message2 {
    float:left;
    width: 200px;
    height: 80px;
    margin: 50px;
    background-color: skyblue;
    border-bottom-color: skyblue;
    color: #fff;
    font-size: 12px;
    line-height: 18px;
    padding: 5px 12px 5px 12px;
    box-sizing: border-box;
    border-radius: 6px;
    position: relative;
    word-break: break-all;
  }
  .message2::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -5px;
    width: 10px;
    height: 10px;
    margin-top: -10px;
    background: inherit;
    transform: rotate(45deg);
  }

</style>
