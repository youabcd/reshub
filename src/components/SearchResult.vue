<template>
  <div>
    <!--    <el-container>-->
    <TopBar></TopBar>
    <SearchBox v-on:searchEvent="search" style="position: relative;top: -15px"></SearchBox>

    <el-container style="height: 100%" >
      <!--        style="background-color: #f0f2f5"-->
      <el-aside width="15%">
        <div style=";background-color: white;width: 12%;display: inline;">
          <!--            border: solid 2px #666666-->
          <h5>专业分类（没调好）</h5>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
            <el-menu-item index="1">计算机科学</el-menu-item>
            <el-submenu index="2">
              <template slot="title">人工智能</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">软件工程</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main style="width: 85%">
        <div style="position: relative">
          <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 0;width: 75%;position: relative">
            <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                       active-text-color="#0079fe" >
                <el-menu-item index="0" style="width: 120px">●全部</el-menu-item>
                <el-menu-item index="1" style="width: 120px">●期刊</el-menu-item>
                <el-menu-item index="2" style="width: 120px">●会议</el-menu-item>
                <el-menu-item index="3" style="width: 120px">●报告</el-menu-item>
<!--                <el-menu-item index="5" style="width: 120px">●专利</el-menu-item>-->
<!--                <el-menu-item index="6" style="width: 120px">●成果</el-menu-item>-->
<!--                <el-menu-item index="7" style="width: 120px">●代码</el-menu-item>-->
              </el-menu>
            </div>
            <div>
              <!--              <el-card class="box-card" shadow="never">-->
              <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in tableData0" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
                <!--                    {{'列表内容 ' + o }}-->
                <!--                  <div style="height: 40px;margin-top: 10px">-->
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom" @click="addCollection(index)">
                    <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                    <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <!--                      <el-tooltip class="item" effect="dark" content="举报" placement="bottom">-->
                  <!--                        <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>-->
                  <!--                      </el-tooltip>-->
                  <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px" data-clipboard-text="Copy" @click="Copy"></i>
                  </el-tooltip>
                </div>
                <!--                  </div>-->


                <div style="text-align: left;position: absolute;top: 60px;width: 96%">
                  <p style="height: 20px" >{{item.msg}}</p>
                </div>

                <div>
                  <div v-for="(author_item,author_index) in item.author" :key="author_index" style="position: absolute;left: 20px;top: 130px;width: 60%;text-align: left;">
                    <span >{{author_item}}</span>
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0px">
                    <span>{{item.type}}</span>
                  </el-tag>
                  <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                    <span> {{item.collectionSum}}</span>
                  </i>
                  <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                    <span> {{item.viewSum}}</span>
                  </i>
                </div>
              </el-card>

              <el-card shadow="hover" v-if="menuIndex === '1'" v-for="(item,index) in tableData1" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
                <!--                    {{'列表内容 ' + o }}-->
                <!--                  <div style="height: 40px;margin-top: 10px">-->
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom" @click="addCollection(index)">
                    <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                    <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <!--                      <el-tooltip class="item" effect="dark" content="举报" placement="bottom">-->
                  <!--                        <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>-->
                  <!--                      </el-tooltip>-->
                  <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px" data-clipboard-text="Copy" @click="Copy"></i>
                  </el-tooltip>
                </div>
                <!--                  </div>-->


                <div style="text-align: left;position: absolute;top: 60px;width: 96%">
                  <p style="height: 20px" >{{item.msg}}</p>
                </div>

                <div>
                  <div v-for="(author_item,author_index) in item.author" :key="author_index" style="position: absolute;left: 20px;top: 130px;width: 60%;text-align: left;">
                    <span >{{author_item}}</span>
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0px">
                    <span>{{item.type}}</span>
                  </el-tag>
                  <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                    <span> {{item.collectionSum}}</span>
                  </i>
                  <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                    <span> {{item.viewSum}}</span>
                  </i>
                </div>
              </el-card>

              <el-card shadow="hover" v-if="menuIndex === '2'" v-for="(item,index) in tableData2" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
                <!--                    {{'列表内容 ' + o }}-->
                <!--                  <div style="height: 40px;margin-top: 10px">-->
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom" @click="addCollection(index)">
                    <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                    <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <!--                      <el-tooltip class="item" effect="dark" content="举报" placement="bottom">-->
                  <!--                        <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>-->
                  <!--                      </el-tooltip>-->
                  <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px" data-clipboard-text="Copy" @click="Copy"></i>
                  </el-tooltip>
                </div>
                <!--                  </div>-->


                <div style="text-align: left;position: absolute;top: 60px;width: 96%">
                  <p style="height: 20px" >{{item.msg}}</p>
                </div>

                <div>
                  <div v-for="(author_item,author_index) in item.author" :key="author_index" style="position: absolute;left: 20px;top: 130px;width: 60%;text-align: left;">
                    <span >{{author_item}}</span>
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0px">
                    <span>{{item.type}}</span>
                  </el-tag>
                  <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                    <span> {{item.collectionSum}}</span>
                  </i>
                  <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                    <span> {{item.viewSum}}</span>
                  </i>
                </div>
              </el-card>

              <el-card shadow="hover" v-if="menuIndex === '3'" v-for="(item,index) in tableData3" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
                <!--                    {{'列表内容 ' + o }}-->
                <!--                  <div style="height: 40px;margin-top: 10px">-->
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom" @click="addCollection(index)">
                    <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                    <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
                  </el-tooltip>
                  <!--                      <el-tooltip class="item" effect="dark" content="举报" placement="bottom">-->
                  <!--                        <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>-->
                  <!--                      </el-tooltip>-->
                  <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                    <i class="el-icon-share" style="font-size: 25px;width: 30px" data-clipboard-text="Copy" @click="Copy"></i>
                  </el-tooltip>
                </div>
                <!--                  </div>-->


                <div style="text-align: left;position: absolute;top: 60px;width: 96%">
                  <p style="height: 20px" >{{item.msg}}</p>
                </div>

                <div>
                  <div v-for="(author_item,author_index) in item.author" :key="author_index" style="position: absolute;left: 20px;top: 130px;width: 60%;text-align: left;">
                    <span >{{author_item}}</span>
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0px">
                    <span>{{item.type}}</span>
                  </el-tag>
                  <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                    <span> {{item.collectionSum}}</span>
                  </i>
                  <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                    <span> {{item.viewSum}}</span>
                  </i>
                </div>
              </el-card>
                            <!--              </el-card>-->
            </div>
            <div>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="800"
                style="margin-top: 10px;height: 100px">
              </el-pagination>
            </div>
          </div>

          <div style="position: absolute;left: 77%;top: 0;width: 23%;display: inline;">
            <p style="font-family: '微软雅黑', sans-serif;font-weight: bold">🔥热点</p>
            <el-card class="box-card" shadow="hover">
              <div v-for="o in 5" :key="o" class="text item" style="height: 120px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4">
                <div style="text-align: left;margin-top: -10px">
                  <p style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold">标题</p>
                </div>

                <div style="text-align: left">
                  <p style="height: 20px">字文字字文</p>
                </div>

                <div>
                  <div style="width: 30%;text-align: left;margin-top: 8px"><span>Me</span></div>
                  <!--                    <el-tag type="info" style="position: absolute;right: 10%;width: 50px;text-align: center">-->
                  <!--                      <span>期刊</span>-->
                  <!--                    </el-tag>-->
                  <!--                    <i class="el-icon-view" style="position: absolute;right: 2%">-->
                  <!--                      <span>66666</span>-->
                  <!--                    </i>-->
                </div>
              </div>
            </el-card>
          </div>

          <div>
            <div class="back-top-circle" @click="backTop" v-if="btnFlag">
              <i class="el-icon-caret-top" ></i>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import TopBar from "./TopBar";
  import BottomBar from "./BottomBar";
  import SearchBox from "./SearchBox";
  import Clipboard from 'clipboard';
  export default {
    name: "SearchResult",
    components:{
      TopBar,
      BottomBar,
      SearchBox
    },
    data() {
      return {
        btnFlag: false,
        keyWords:'',
        activeIndex: "0",
        menuIndex: "0",
        tableData0: [{
          paperId:'1',
          title:'Google1',
          msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
          author: ['Li Ming','Zhang San'],
          type:"期刊",
          collectStatus: true,
          collectionSum:6,
          viewSum:7,
          link:'https://www.google.com.hk/',
          collectTime:'2016-05-04'
        },
          {
            paperId:'2',
            title:'Google2',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字2',
            author:['Li Ming','Zhang San'],
            type:"会议",
            collectStatus: false,
            collectionSum:66,
            viewSum:77,
            link:'https://www.youtube.com/',
            collectTime:'2016-05-04'
          },
          {
            paperId:'3',
            title:'BILIBILI3',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字3',
            author:['Li Ming','Zhang San'],
            type:"期刊",
            collectStatus: false,
            collectionSum:666,
            viewSum:777,
            link:'https://www.bilibili.com/',
            collectTime:'2016-05-04'
          },
          {
            paperId:'4',
            title:'Google4',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字4',
            author:['Li Ming','Zhang San'],
            type:"报告",
            collectStatus: false,
            collectionSum:6666,
            viewSum:7777,
            link:'https://www.google.com/',
            collectTime:'2016-05-04'
          }],
        tableData1: [{
          paperId:'1',
          title:'Google1',
          msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
          author:['Li Ming','Zhang San'],
          type:"期刊",
          collectStatus: true,
          collectionSum:666,
          viewSum:777,
          link:'https://www.google.com.hk/',
          collectTime:'2016-05-04'
        },
          {
            paperId:'3',
            title:'BILIBILI3',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字3',
            author:['Li Ming','Zhang San'],
            type:"期刊",
            collectStatus: false,
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
            author:['Li Ming','Zhang San'],
            type:"会议",
            collectStatus: false,
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
            author:['Li Ming','Zhang San'],
            type:"报告",
            collectStatus: false,
            collectionSum:666,
            viewSum:777,
            link:'https://www.google.com/',
            collectTime:'2016-05-04'
          }],
      }
    },
    created() {
    },
    mounted () {
      window.addEventListener('scroll', this.scrollToTop);
      this.search(localStorage.getItem("keyWords"));
      this.keyWords=localStorage.getItem("keyWords");
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
      //搜索
      search(keyWords){
        this.keyWords = keyWords;
        if(keyWords.length>0) {
          this.$message({
            message: keyWords,
            type: 'success'
          });
        }
      },

      handleSelect (key) {
        this.menuIndex = key;
      },

      gotoPaper(url) {
        //发送点击数据
        window.open(url,url)
      },

      addCollection() {
        //发送数据

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
    }
  }
</script>

<style >
  .result{
    min-height: calc(100vh - 75px);
  }
  /*.el-select .el-input {*/
  /*  width: 100px;*/
  /*  height: 75px;*/
  /*}*/
  /*.input-with-select .el-input-group__prepend {*/
  /*  background-color: #fff;*/
  /*  width: 100px;*/
  /*  height: 75px;*/
  /*}*/
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 100%;
  }
  .icon{
    height: 60px;
    width: 55px;
    position: fixed;
    bottom: 35px;
    right: 15px;
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
</style>
