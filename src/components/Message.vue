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
                    最近消息
                  </div>
                  <div>
                    <van-cell v-for="(item,index) in recentMessage" :key="index" clickable @click="openChats(item)">
                      {{item.friendName}}
                    </van-cell>
                  </div>
                </el-aside>
                <el-main>
                  <el-container style="height: 550px;">
                    <el-main style="height: 80%;width: 100%">
                      <div v-for="(item,index) in chats" :key="index">
                        <!--自己发的消息-->
                        <van-row v-if="item.sender==userId">
                          <van-col span="20">
                            <div class="message1">
                              {{item.msg}}
                            </div>
                          </van-col>
                          <van-col span="4">
                            <van-image round fit="cover" width="35px" height="35px" :src="userImage" clickable>
                              <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                              </template>
                            </van-image>
                          </van-col>
                        </van-row>
                        <!--别人发的消息-->
                        <van-row v-if="item.sender!=userId">
                          <van-col span="4">
                            <van-image round fit="cover" width="35px" height="35px" :src="userImage" clickable>
                              <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                              </template>
                            </van-image>
                          </van-col>
                          <van-col span="20">
                            <div class="message2">
                              {{item.msg}}
                            </div>
                          </van-col>
                        </van-row>
                      </div>
                    </el-main>
                    <el-footer style="height: 20%;">
                      <div style="width: 100%;height: 70%;">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容"
                          v-model="textarea">
                        </el-input>
                      </div>
                      <!--<div style="width: 100%;height: 30%;margin-top: 15px;">
                        <el-button @click="sendMessage">提交对方ip</el-button>
                      </div>-->
                    </el-footer>
                  </el-container>
                </el-main>
              </el-container>
            </div>
          </el-main>
        </el-container>

      </el-container>

      <div style="width: 50%;">
        <el-input v-model="checkIp1"></el-input>
        <el-button @click="sendMessage1">提交自己ip</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";
    import baseUrl from "./baseUrl";

    export default {
      name: "Message",
      data(){
          return{
            checkIp1:'',
            textarea:'',
            websock: null,
            userId:'aaa',
            userImage:require('../../static/logo2.png'),
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
        sendMessage(){//发送对方ip

        },
        sendMessage1(){//发送自己ip

        },

        // websocket 相关
        initWebSocket() {//初始化websocket
          const wsuri = "ws://127.0.0.1:8000/websocketTest/"+this.checkIp1;//用自己的id构成websock链接
          this.websock = new WebSocket(wsuri);
          this.websock.onopen = this.websocketopen;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onerror = this.websocketerror;
        },
        websocketopen(){//打开
          console.log("WebSocket连接成功")
        },
        websocketonmessage(e){ //数据接收
          let data = JSON.parse(e.data);
          console.log(data);
        },
        websocketclose(){ //关闭
          console.log("WebSocket关闭");
        },
        websocketerror(){ //失败
          console.log("WebSocket连接失败");
        },
      },
      mounted() {
        if (this.websock!==null) {
          this.websock.close(); // 关闭websocket连接
        }
        this.initWebSocket();
      },
      destroyed() {
        //页面销毁时关闭ws连接
        if (this.websock) {
          this.websock.close(); // 关闭websocket
        }
      },
    }
</script>

<style>
  .message2 {
    float:left;
    background-color: skyblue;
    border-bottom-color: skyblue;
    color: black;
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
    left: -4px;
    width: 8px;
    height: 8px;
    margin-top: 3px;
    background: inherit;
    transform: rotate(45deg);
  }
  .message1 {
    float:right;
    background-color: lightgrey;
    border-bottom-color: skyblue;
    color: black;
    font-size: 12px;
    line-height: 18px;
    padding: 5px 12px 5px 12px;
    box-sizing: border-box;
    border-radius: 6px;
    position: relative;
    word-break: break-all;
  }
  .message1::before {
    content: '';
    position: absolute;
    right: -4px;
    width: 8px;
    height: 8px;
    margin-top: 3px;
    background: inherit;
    transform: rotate(45deg);
  }

</style>
