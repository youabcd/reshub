<template>
  <div style="">
    <TopBar></TopBar>
      <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 15%;margin-top: 2%;width: 70%;">
        <div style="position: relative;height: 50px;margin-top: 20px">
          <div style="float: left;text-align: left;position: absolute;left: 10px;font-size: 18px;margin-top: 5px">
            <i class="el-icon-star-off"> 我的收藏</i>
          </div>
        </div>
        <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                   active-text-color="#0079fe" >
            <el-menu-item index="0" style="width: 125px">●全部</el-menu-item>
            <el-menu-item index="1" style="width: 125px">●期刊</el-menu-item>
            <el-menu-item index="2" style="width: 125px">●会议</el-menu-item>
            <el-menu-item index="3" style="width: 125px">●报告</el-menu-item>
          </el-menu>
        </div>
        <el-dialog
          title="使用微信扫一扫"
          :visible.sync="dialogVisible"
          v-if="dialogVisible"
          show-close="false"
          width="30%">
          <div>
            <img :src="'https://my.tv.sohu.com/user/a/wvideo/getQRCode.do?text='+QRlink" alt="" width="250" height="250">
          </div>
          <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
                  </span>
        </el-dialog>
        <div>

<!--          <el-card class="box-card" shadow="never">-->
            <el-card  shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in tableData0" :key="index" class="text item" style=";height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
              <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
              </div>
              <div style="display: inline;position: absolute;right: 20px;top: 0">
                <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom">
                  <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(index)"></i>
                </el-tooltip>
                <el-dropdown placement="top">
                  <span class="el-dropdown-link">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><i class="el-icon-share" @click="gotoWeibo(item.link,item.title)"> 分享到微博</i></el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-share" @click="openQRcode(item.link)"> 分享到微信</i></el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-document-copy"> 复制链接</i></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <div style="text-align: left;position: absolute;top: 60px;">
                <p style="height: 20px;" >{{item.msg}}</p>
<!--                overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 900px-->
              </div>

              <div>
                <div style="position: absolute;left: 20px;top: 130px;width: 30%;text-align: left;"><span>{{item.author}}</span></div>
                <el-tag type="info" style="position: absolute;right: 300px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                  <span>{{item.type}}</span>
                </el-tag>
                <i class="el-icon-time" style="position: absolute;right: 170px;top: 130px">
                  <span> {{item.collectTime}}</span>
                </i>
                <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                  <span> {{item.collectionSum}}</span>
                </i>
                <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                  <span> {{item.viewSum}}</span>
                </i>
              </div>
            </el-card>

          <el-card  shadow="hover" v-if="menuIndex === '1' " v-for="(item,index) in tableData1" :key="index" class="text item" style=";height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
            <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
              <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
            </div>
            <div style="display: inline;position: absolute;right: 20px;top: 0">
              <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom">
                <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(index)"></i>
              </el-tooltip>
              <!--                  <el-tooltip class="item" effect="dark" content="举报" placement="bottom">-->
              <!--                    <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>-->
              <!--                  </el-tooltip>-->
              <el-dropdown placement="top">
                  <span class="el-dropdown-link">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class="el-icon-share" @click="gotoWeibo(item.link,item.title)"> 分享到微博</i></el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-share" @click="openQRcode(item.link)"> 分享到微信</i></el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-document-copy"> 复制链接</i></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

<!--              <el-dialog-->
<!--                title="使用微信扫一扫"-->
<!--                :visible.sync="dialogVisible"-->
<!--                v-if="dialogVisible"-->
<!--                show-close="false"-->
<!--                width="30%">-->
<!--                <div>-->
<!--                  <img src="http://chart.apis.google.com/chart?cht=qr&chs=104x104&chld=L|0&chl=http://www.baidu.com" alt="" width="200" height="200">-->
<!--                </div>-->
<!--                <span slot="footer" class="dialog-footer">-->
<!--                    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>-->
<!--                  </span>-->
<!--              </el-dialog>-->
              <!--                  <el-dialog-->
              <!--                    title="点击复制链接或扫描二维码"-->
              <!--                    :visible.sync="dialogVisible"-->
              <!--                    show-close="false"-->
              <!--                    width="30%">-->
              <!--                    <div @click="Copy">-->
              <!--                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" ></i>-->
              <!--                    </div>-->
              <!--                    <span slot="footer" class="dialog-footer">-->
              <!--&lt;!&ndash;                      <el-button @click="dialogVisible = false">取 消</el-button>&ndash;&gt;-->
              <!--                      <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>-->
              <!--                    </span>-->

              <!--                  </el-dialog>-->


            </div>

            <div style="text-align: left;position: absolute;top: 60px;">
              <p style="height: 20px;" >{{item.msg}}</p>
              <!--                overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 900px-->
            </div>

            <div>
              <div style="position: absolute;left: 20px;top: 130px;width: 30%;text-align: left;"><span>{{item.author}}</span></div>
              <el-tag type="info" style="position: absolute;right: 300px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                <span>{{item.type}}</span>
              </el-tag>
              <i class="el-icon-time" style="position: absolute;right: 170px;top: 130px">
                <span> {{item.collectTime}}</span>
              </i>
              <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                <span> {{item.collectionSum}}</span>
              </i>
              <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                <span> {{item.viewSum}}</span>
              </i>
            </div>

          </el-card>

          <el-card  shadow="hover" v-if="menuIndex === '2'" v-for="(item,index) in tableData2" :key="index" class="text item" style=";height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
            <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
              <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
            </div>
            <div style="display: inline;position: absolute;right: 20px;top: 0">
              <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom">
                <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(index)"></i>
              </el-tooltip>
              <!--                  <el-tooltip class="item" effect="dark" content="举报" placement="bottom">-->
              <!--                    <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>-->
              <!--                  </el-tooltip>-->
              <el-dropdown placement="top">
                  <span class="el-dropdown-link">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class="el-icon-share" @click="gotoWeibo(item.link,item.title)"> 分享到微博</i></el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-share" @click="openQRcode(item.link)"> 分享到微信</i></el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-document-copy"> 复制链接</i></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>


            </div>

            <div style="text-align: left;position: absolute;top: 60px;">
              <p style="height: 20px;" >{{item.msg}}</p>
              <!--                overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 900px-->
            </div>

            <div>
              <div style="position: absolute;left: 20px;top: 130px;width: 30%;text-align: left;"><span>{{item.author}}</span></div>
              <el-tag type="info" style="position: absolute;right: 300px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                <span>{{item.type}}</span>
              </el-tag>
              <i class="el-icon-time" style="position: absolute;right: 170px;top: 130px">
                <span> {{item.collectTime}}</span>
              </i>
              <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                <span> {{item.collectionSum}}</span>
              </i>
              <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                <span> {{item.viewSum}}</span>
              </i>
            </div>

          </el-card>

          <el-card  shadow="hover" v-if="menuIndex === '3'" v-for="(item,index) in tableData3" :key="index" class="text item" style=";height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
            <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
              <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
            </div>
            <div style="display: inline;position: absolute;right: 20px;top: 0">
              <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom">
                <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(index)"></i>
              </el-tooltip>
              <!--                  <el-tooltip class="item" effect="dark" content="举报" placement="bottom">-->
              <!--                    <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>-->
              <!--                  </el-tooltip>-->
              <el-dropdown placement="top">
                  <span class="el-dropdown-link">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class="el-icon-share" @click="gotoWeibo(item.link,item.title)"> 分享到微博</i></el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-share" @click="openQRcode(item.link)"> 分享到微信</i></el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-document-copy"> 复制链接</i></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <div style="text-align: left;position: absolute;top: 60px;">
              <p style="height: 20px;" >{{item.msg}}</p>
              <!--                overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 900px-->
            </div>

            <div>
              <div style="position: absolute;left: 20px;top: 130px;width: 30%;text-align: left;"><span>{{item.author}}</span></div>
              <el-tag type="info" style="position: absolute;right: 300px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                <span>{{item.type}}</span>
              </el-tag>
              <i class="el-icon-time" style="position: absolute;right: 170px;top: 130px">
                <span> {{item.collectTime}}</span>
              </i>
              <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                <span> {{item.collectionSum}}</span>
              </i>
              <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                <span> {{item.viewSum}}</span>
              </i>
            </div>

          </el-card>

<!--          </el-card>-->
        </div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000"
            style="margin-top: 10px;height: 100px">
          </el-pagination>
        </div>

        <div>
          <div class="back-top-circle" @click="backTop" v-if="btnFlag">
            <i class="el-icon-caret-top" ></i>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
    import TopBar from "./TopBar";
    import Clipboard from 'clipboard';
    export default {
      name: "MyCollection",
      inject:['reload'],
      components:{
        TopBar
      },
      data() {
        return {
          btnFlag: false,
          dialogVisible: false,
          activeIndex: "0",
          menuIndex: "0",
          QRlink: "",
          tableData: [{
          }],
          tableData0: [{
            paperId:'1',
            title:'Google1',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            author:'Author1',
            type:"期刊",
            collectionSum:6,
            viewSum:7,
            link:'https://www.google.com.hk/',
            collectTime:'2016-05-04'
          },
            {
              paperId:'2',
              title:'Google2',
              msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字2',
              author:'Author2',
              type:"会议",
              collectionSum:66,
              viewSum:77,
              link:'https://www.youtube.com/',
              collectTime:'2016-05-04'
            },
            {
              paperId:'3',
              title:'BILIBILI3',
              msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字3',
              author:'Author3',
              type:"期刊",
              collectionSum:666,
              viewSum:777,
              link:'https://www.bilibili.com/',
              collectTime:'2016-05-04'
            },
            {
              paperId:'4',
              title:'Google4',
              msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字4',
              author:'Author4',
              type:"报告",
              collectionSum:6666,
              viewSum:7777,
              link:'https://www.google.com/',
              collectTime:'2016-05-04'
            }],
          tableData1: [{
            paperId:'1',
            title:'Google1',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            author:'Author1',
            type:"期刊",
            collectionSum:666,
            viewSum:777,
            link:'https://www.google.com.hk/',
            collectTime:'2016-05-04'
          },
          {
            paperId:'3',
            title:'BILIBILI3',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字3',
            author:'Author3',
            type:"期刊",
            collectionSum:666,
            viewSum:777,
            link:'https://www.bilibili.com/',
            collectTime:'2016-05-04'
          }],
          tableData2: [
            {
              paperId:'2',
              title:'Google2',
              msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字2',
              author:'Author2',
              type:"会议",
              collectionSum:666,
              viewSum:777,
              link:'https://www.youtube.com/',
              collectTime:'2016-05-04'
            }],
          tableData3: [
            {
              paperId:'4',
              title:'Google4',
              msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字4',
              author:'Author4',
              type:"报告",
              collectionSum:666,
              viewSum:777,
              link:'https://www.google.com/',
              collectTime:'2016-05-04'
            }],
        }
      },
      mounted () {
        window.addEventListener('scroll', this.scrollToTop)
      },
      destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
      },
      methods: {
        // 点击图片回到顶部方法，加计时器是为了过渡顺滑
        backTop () {
          const that = this
          let timer = setInterval(() => {
            let ispeed = Math.floor(-that.scrollTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
            if (that.scrollTop === 0) {
              clearInterval(timer)
            }
          }, 16)
        },

        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop () {
          const that = this
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          that.scrollTop = scrollTop
          if (that.scrollTop > 50) {
            that.btnFlag = true
          } else {
            that.btnFlag = false
          }
        },

        handleSelect (key) {
          this.menuIndex = key;
        },

        deleteCollection (index) {
          //发送请求

          if (this.menuIndex === '0') {
            let temp = this.tableData0[index];
            if (temp.type === "期刊") {
              for (let i=0; i<this.tableData1.length; i++) {
                if (temp.paperId === this.tableData1[i].paperId) {
                  this.tableData1.splice(i, 1);
                  break;
                }
              }
            } else if (temp.type === "会议") {
              for (let i=0; i<this.tableData2.length; i++) {
                if (temp.paperId === this.tableData2[i].paperId) {
                  this.tableData2.splice(i, 1);
                  break;
                }
              }
            } else if (temp.type === "报告") {
              for (let i=0; i<this.tableData3.length; i++) {
                if (temp.paperId === this.tableData3[i].paperId) {
                  this.tableData3.splice(i, 1);
                  break;
                }
              }
            }
            this.tableData0.splice(index, 1);
          } else if (this.menuIndex === '1') {
            let temp = this.tableData1[index];
            for (let i=0; i<this.tableData0.length; i++) {
              if (temp.paperId === this.tableData0[i].paperId) {
                this.tableData0.splice(i, 1);
                break;
              }
            }
            this.tableData1.splice(index, 1);
          } else if (this.menuIndex === '2') {
            let temp = this.tableData2[index];
            for (let i=0; i<this.tableData0.length; i++) {
              if (temp.paperId === this.tableData0[i].paperId) {
                this.tableData0.splice(i, 1);
                break;
              }
            }
            this.tableData2.splice(index, 1);
          } else if (this.menuIndex === '3') {
            let temp = this.tableData3[index];
            for (let i=0; i<this.tableData0.length; i++) {
              if (temp.paperId === this.tableData0[i].paperId) {
                this.tableData0.splice(i, 1);
                break;
              }
            }
            this.tableData3.splice(index, 1);
          }
          this.$message({
            showClose: true,
            message: '取消收藏成功',
            type: 'success'
          });

          // this.reload();
        },

        Copy() {
          let clipboard = new Clipboard('.el-icon-share');
          clipboard.on('success', e => {
            this.$message({
              showClose: true,
              message: '复制链接成功',
              type: 'success',
            });
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            this.$message({
              showClose: true,
              message: '复制链接失败，请重试',
              type: 'error',
            });
            clipboard.destroy()
          })
        },

        gotoPaper(url) {
          //发送点击数据
          window.open(url,url)
        },

        gotoWeibo(url,title) {
          window.open("http://service.weibo.com/share/share.php?url="+url+"&sharesource=weibo&title="+title);
        },

        openQRcode(url) {
          this.QRlink=url;
          this.dialogVisible=true;
        },

        handleClose(done) {
          Object.assign(this.$data, this.$options.data())
        },


      }
    }

</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  /*.box-card {*/

  /*  width: 100%;*/
  /*}*/

  /*.icon{*/
  /*  height: 60px;*/
  /*  width: 55px;*/
  /*  position: fixed;*/
  /*  bottom: 35px;*/
  /*  right: 15px;*/
  /*}*/

  .back-top-circle{
    position: fixed;
    background-color: #fff;
    width: 40px;
    height: 40px;
    bottom: 80px;
    right: 50px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;
  }


</style>
