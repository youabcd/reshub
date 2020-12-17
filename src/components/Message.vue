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
            <el-menu-item index="1" @click="setNowActive('1')">
              <span style="">●</span>
              <span slot="title">系统消息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="setNowActive('2')">
              <span style="">●</span>
              <span slot="title">我的消息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>

            <!--系统消息-->
            <div v-if="nowActive=='1'">
              <el-scrollbar style="height:100%;">
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
              <div v-for="(item,index) in systemMessage" :key="index" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);border-radius: 5px;cursor: pointer;">
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
              </el-scrollbar>
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
                <el-aside width="220px" style="margin-top: 10px;">
                  <div style="font-size: 20px;">
                    最近消息
                  </div>
                  <div>
                    <el-menu :default-active="whichFriend">

                        <el-menu-item v-for="(item,index) in recentMessage" :key="index" :index="index" @click="openChats(item, index)" style="height: 60px;">
                          <van-row></van-row>
                          <van-row>
                            <van-col style="margin-top: 0px;">
                              <van-image round fit="cover" width="35px" height="35px" :src="item.friendHead">
                                <template v-slot:loading>
                                  <van-loading type="spinner" size="20" />
                                </template>
                              </van-image>
                            </van-col>
                            <van-col style="margin-left: 6px;text-align: left;">
                              <div v-bind:style="{width: commentWidth+'px'}" class="van-ellipsis">
                                  {{item.friendName}}
                              </div>
                            </van-col>
                            <van-col>
                              <div>
                                <el-badge v-if="item.newMessage>0" :value=item.newMessage />
                              </div>
                            </van-col>
                          </van-row>
                          <van-row></van-row>
                        </el-menu-item>
                    </el-menu>
                  </div>
                </el-aside>
                <el-main>
                  <el-container style="height: 550px;">
                    <el-main style="height: 80%;width: 100%" class="scrollBall">
                      <div v-for="(item,index) in chats" :key="index">
                        <!--自己发的消息-->
                        <van-row v-if="item.sendId==userId">
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
                        <van-row v-if="item.sendId!=userId">
                          <van-col span="4">
                            <van-image round fit="cover" width="35px" height="35px" :src="chatImage" clickable>
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
                      <div id="bottomMsg"></div>
                    </el-main>
                    <el-footer style="height: 20%;">
                      <div></div>
                      <div style="width: 100%;height: 70%;margin-top: 5px;">
                        <el-input
                          type="textarea"
                          @keydown.native="listen($event)"
                          resize="none"
                          :autosize="{ minRows: 3, maxRows: 3}"
                          placeholder="请输入内容"
                          v-model="textarea">
                        </el-input>
                      </div>
                      <div style="width: 100%;height: 30%;margin-top: 8px;text-align: right">
                        <el-button type="primary" style="" @click="sendMessage">发送</el-button>
                      </div>
                    </el-footer>
                  </el-container>
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
    import baseUrl from "./baseUrl";
    import axios from 'axios';

    export default {
      name: "Message",
      data(){
          return{
            checkIp1:'',
            textarea:'',
            websock: null,
            userId: localStorage.getItem('myId'),
            userImage:require('../../static/logo2.png'),
            chatImage:require('../../static/logo2.png'),
            nowActive:'1',
            newChatWindows:{friendName:'',newMessage:'',friendHead:''},
            whichFriend:'',
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

            commentWidth:'80',

            recentMessage:[
              {chatId: '1', friendId: '456', friendName:'456',newMessage:'1',friendHead:require('../../static/logo2.png')},
              {chatId: '', friendId: '123', friendName:'youabcd',newMessage:'1',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcd名字特别长sjfksjdlkfjklfds',newMessage:'2',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdasdfgfgf',newMessage:'3',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdasdfggf',newMessage:'4',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdagffgg',newMessage:'5',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdfdsfg',newMessage:'0',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdefgh',newMessage:'7',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdefg',newMessage:'8',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdfg',newMessage:'9',friendHead:require('../../static/logo2.png')},
              {friendName:'youabcdf',newMessage:'10',friendHead:require('../../static/logo2.png')},
              {friendName:'youacd',newMessage:'11',friendHead:require('../../static/logo2.png')},
              {friendName:'abcde',newMessage:'12',friendHead:require('../../static/logo2.png')},
              {friendName:'abcd',newMessage:'13',friendHead:require('../../static/logo2.png')},
              {friendName:'abc',newMessage:'14'},
              {friendName:'ab',newMessage:'15'},
              {friendName:'a',newMessage:'16'},
            ],
            chats:[
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:11'},
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:12'},
              {sendId:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:13'},
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:14'},
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:15'},
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:16'},
              {sendId:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:17'},
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:18'},
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:19'},
              {sendId:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:20'},
              {sendId:'ccc',msg:'吃饭',sendTime:'2020/10/29 17:21'},
              {sendId:'aaa',msg:'吃饭',sendTime:'2020/10/29 17:22'},
            ]
          }
      },
      components:{
        TopBar
      },
      methods:{
        openChats(item, index){
          this.scrollToBottom();
          this.whichFriend=index;

          localStorage.setItem("whichFriend",this.whichFriend.toString());

          console.log(localStorage.getItem("whichFriend"));

          this.recentMessage[index].newMessage='0';

          let _this = this;
          axios.get(baseUrl+'/getChats',{
            params:{
              myId: _this.userId,
              friendId: _this.recentMessage[index].friendId,
            }
          })
          .then(function (res) {
            _this.chats = res.data.list;
            setTimeout(() => {
              document.getElementById('bottomMsg').scrollIntoView();
            }, 50);
          })

        },
        scrollToBottom(){
          this.$nextTick(()=>{
            let scrollBall = this.$el.querySelector(".scrollBall")
            scrollBall.scrollTop = scrollBall.scrollHeight
          })
        },
        listen (event) {
          if (event.keyCode === 13&&!event.shiftKey) {
            this.sendMessage() // 发送文本
            event.preventDefault() // 阻止浏览器默认换行操作
            return false
          }
        },
        sendMessage(){ // 发送一条消息
          let data = {
            'state': 'sendMessage',
            'myId': this.userId,
            'friendId': this.recentMessage[this.whichFriend].friendId,
            'content': this.textarea,
            'chatId': this.recentMessage[this.whichFriend].chatId,
          };
          this.websock.send(JSON.stringify(data));
          console.log("send")
        },

        setNowActive(id){
          this.nowActive=id;
          localStorage.setItem("nowActive",id);
        },

        // websocket 相关
        initWebSocket() {//初始化websocket
          const wsuri = "ws://121.196.149.183/websocket"+this.userId;//用自己的id构成websock链接 改
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
          console.log("收到消息");
          let data = JSON.parse(e.data);
          this.chats.push(data);
          this.textarea = '';
          console.log(data);
          setTimeout(() => {
            document.getElementById('bottomMsg').scrollIntoView();
          }, 50);
        },
        websocketclose(){ //关闭
          console.log("WebSocket关闭");
        },
        websocketerror(){ //失败
          console.log("WebSocket连接失败");
        },
        getChatFriends(){
          let _this = this;
          axios.get(baseUrl+'/recentUsers', {
            params: {
              userId: localStorage.getItem('myId'),
            }
          })
          .then(function (res) {
              _this.recentMessage = res.data.list;

          })
        }

      },
      created(){
        this.nowActive=localStorage.getItem("nowActive");
        this.whichFriend=parseInt(localStorage.getItem("whichFriend"));
        this.newChatWindows.friendHead=require('../assets/'+this.$route.params.newFriendHead);
        this.newChatWindows.friendName=this.$route.params.newFriendName;
        this.newChatWindows.newMessage='0';
        this.recentMessage.splice(0,0,this.newChatWindows);
        this.openChats(this.recentMessage[this.whichFriend],this.whichFriend);
        this.scrollToBottom()
      },
      mounted() {
        if (this.websock!==null) {
          this.websock.close(); // 关闭websocket连接
        }
        this.initWebSocket();
        this.getChatFriends();
        this.scrollToBottom()
      },
      destroyed() {
        //页面销毁时关闭ws连接
        if (this.websock) {
          this.websock.close(); // 关闭websocket
        }
        localStorage.setItem("whichFriend",this.whichFriend.toString());
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
  .el-scrollbar_wrap {
    overflow-x: hidden;
  }
  .scrollBall{
    height: 200px;
    overflow-y:auto;
  }

</style>
