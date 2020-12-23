<template>
  <div>
    <TopBar></TopBar>
    <!--    <SearchBox v-on:searchEvent="search" style="position: relative;top: -15px"></SearchBox>-->
      <div style="width: 100%;margin-top: 30px">

        <div style="position: relative">
          <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 10%;width: 80%;position: relative;">
<!--            <div>-->
<!--              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"-->
<!--                       active-text-color="#0079fe" >-->
<!--                <el-menu-item index="0" style="width: 120px">●论文({{tableData0.length}})</el-menu-item>-->
<!--                <el-menu-item index="1" style="width: 120px">●项目({{tableData1.length}})</el-menu-item>-->
<!--                <el-menu-item index="2" style="width: 120px">●专利({{tableData2.length}})</el-menu-item>-->
<!--              </el-menu>-->
<!--            </div>-->
            <el-dialog
              title="使用微信扫一扫"
              :visible.sync="dialogVisible"
              v-if="dialogVisible"
              show-close="false"
              width="30%">
              <div>
                <img :src="'https://www.lofter.com/genBitmaxImage?url='+QRlink" alt="" width="150" height="150">
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
              </span>
            </el-dialog>
            <div>
              <!--论文-->
              <el-card shadow="hover" v-for="(item,index) in tableData0.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span v-if="item.title.length<=40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link[0])">
                    {{item.title}}
                  </span>
                  <span v-if="item.title.length>40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link[0])">
                    {{item.title.substring(0,40)+'...'}}
                  </span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <span style="cursor: pointer">
                    <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection0(index, item.paperId)"></i>
                    </el-tooltip>
                  </span>
                  <span style="cursor: pointer">
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(item.link[0],item.title)" style="height: 20px;">
                  </span>
                  <span style="margin-left: 5px;margin-right: 2px;cursor: pointer">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(item.link[0])" style="height: 20px;">
                  </span>
                  <span style="cursor: pointer">
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="item.link[0]" @click="Copy"></i>
                    </el-tooltip>
                  </span>
                </div>

                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(tableData0[index])">
                  <p style="height: 20px" v-if="item.msg.length<=120">{{item.msg}}</p>
                  <p style="height: 20px" v-if="item.msg.length>120">{{item.msg.substring(0,120)+'...'}}</p>
                </div>

<!--                <div style="position: absolute;left: 5px;top: 115px;text-align: left;" v-bind:style="{width: commentWidth+'px'}" class="van-ellipsis">-->
<!--                    <span style="font-weight: 700;margin-left: 15px">-->
<!--                      关键词:-->
<!--                    </span>-->
<!--                  <span>{{item.keywords}}</span>-->
<!--                </div>-->

                <div>
                  <div style="position: absolute;left: 5px;top: 140px;text-align: left;" v-bind:style="{width: 620+'px'}" class="van-ellipsis">
                    <span v-for="(author_item,author_index) in item.author" :key="author_index" style="margin-left: 15px;">
                        {{author_item}}
                    </span>
<!--                    <span style="margin-left: 15px;">-->
<!--                        {{item.author}}-->
<!--                    </span>-->
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                    <span v-if="item.type==='1'">论文</span>
                    <span v-if="item.type==='2'">专利</span>
                    <span v-if="item.type==='3'">项目</span>
                  </el-tag>
                  <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                    <span> {{item.collectionSum}}</span>
                  </i>
                  <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                    <span> {{item.viewSum}}</span>
                  </i>
                </div>
              </el-card>
            </div>

            <!--论文页码-->
            <div style="margin-top: 30px;margin-bottom: 30px" v-if="menuIndex === '0'">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="tableData0.length"
                prev-text="上一页"
                next-text="下一页">
              </el-pagination>
            </div>

          </div>
          <div>
            <div class="back-top-circle" @click="backTop" v-if="btnFlag">
              <i class="el-icon-caret-top" ></i>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import TopBar from "./TopBar";
  import Clipboard from 'clipboard';
  import axios from 'axios';
  import baseUrl from "./baseUrl";
  import webUrl from "./webUrl";
  export default {
    name: "SearchResult",
    components:{
      TopBar,
    },
    data() {
      return {
        QRlink:'',
        drawer: false,
        direction: 'rtl',
        currentPage: 1,
        pageSize: 10,
        btnFlag: false,
        dialogVisible: false,
        keyWords:'',
        activeIndex: "0",
        menuIndex: "0",
        subjectOptions : ['🤺', '👨‍❤️‍👨', '你🐎呢？'],
        authorOptions : ['Zhang San', 'Li Ming'],
        timeOptions : ['1990', '2000', '2010', '2020'],
        checkedSubject: [],
        checkedAuthor: [],
        checkedTime: [],
        tableData0: [//全部
          {
            paperId:'',
            title:'',
            msg:'',
            author: '',
            type:'',
            collectionSum:0,
            viewSum:0,
            link:'',
            collectTime:'',
          },
        ],
      }
    },
    created() {
    },
    mounted () {
      this.getMyCollection()
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      getMyCollection () {
        let _this=this;
        // console.log(localStorage.getItem('myId'))
        axios.get(baseUrl+'/getMyCollection',{
          params:{
            userId:localStorage.getItem('myId')
          }
        }).then(function (response) {
          // console.log(response.data.list)
          _this.tableData0=response.data.list;
        })
      },

      handleSizeChange: function(size) {
        this.pageSize = size;
      },
      //点击第几页
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
      },
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
        that.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.btnFlag = that.scrollTop > 50;
      },

      handleSelect (key) {
        this.menuIndex = key;
        this.currentPage = 1;
      },

      gotoPaper(url) {
        //发送点击数据
        window.open(url)
      },

      gotoAuthor(authorId) {
        window.open(webUrl+'PersonalPortal');
        localStorage.setItem('authorId',authorId);
      },

      gotoInstitution(institutionId){
        window.open(webUrl+'ResearchInstitute');
        localStorage.setItem('institutionId',institutionId);
      },

      deleteCollection0 (index, paperId) {
        //发送请求
        let _this=this;
        console.log(paperId)
        console.log(_this.tableData0[index].type)
        axios.get(baseUrl+'/cancelCollection',{
          params:{
            paperId: paperId,
            type:_this.tableData0[index].type,
            userId:localStorage.getItem('myId'),
          }
        }).then(function (response) {
          if (response.data.succeed===true) {
            _this.$message({
              showClose: true,
              message: '取消收藏成功',
              type: 'success'
            });
            _this.tableData0.splice(index, 1);
          } else {
            _this.$message({
              showClose: true,
              message: '取消收藏失败，请重试',
              type: 'error'
            });
          }
        })
        // this.reload();
      },

      deleteCollection1 (index, paperId) {
        //发送请求
        axios.get(baseUrl+'/cancelCollection',{
          params:{
            paperId: paperId,
            type:'project',
            userId:localStorage.getItem('myId'),
          }
        }).then(function (response) {
          if (response.data.succeed===true) {
            _this.$message({
              showClose: true,
              message: '取消收藏成功',
              type: 'success'
            });
            _this.tableData1.splice(index, 1);
          } else {
            _this.$message({
              showClose: true,
              message: '取消收藏失败，请重试',
              type: 'error'
            });
          }
        })
        // this.reload();
      },

      deleteCollection2 (index, paperId) {
        //发送请求
        axios.get(baseUrl+'/cancelCollection',{
          params:{
            paperId: paperId,
            type:'patent',
            userId:localStorage.getItem('myId'),
          }
        }).then(function (response) {
          if (response.data.succeed===true) {
            _this.$message({
              showClose: true,
              message: '取消收藏成功',
              type: 'success'
            });
            _this.tableData2.splice(index, 1);
          } else {
            _this.$message({
              showClose: true,
              message: '取消收藏失败，请重试',
              type: 'error'
            });
          }
        })
      },

      Copy() {
        let clipboard = new Clipboard('.el-icon-document-copy');
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

      open(list) {
        if(this.menuIndex==='0'){
          this.tableData00=list;
        }
        else if(this.menuIndex==='1'){
          this.tableData01=list;
        }
        else if(this.menuIndex==='2'){
          this.tableData02=list;
        }
        // console.log(this.tableData);
        this.drawer=true;
      },

      clearList() {
        this.checkedSubject = [];
        this.checkedAuthor = [];
        this.checkedTime = [];
      },

      filter() {

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

<style >
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 100%;
  }

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

  .checkBox{
    text-align: left;
    margin-left: 40px;
    margin-bottom: 10px;
    /*height: 30px;*/
  }

  .card{
    width: 49.7%;
    float: left;
    text-align: left
  }
</style>
