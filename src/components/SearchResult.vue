<template>
  <div>
    <!--    <el-container>-->
    <TopBar></TopBar>
    <SearchBox style="position: absolute;top: 5%;left: 8%;width: 84%;height: 10%"></SearchBox>
    <el-container style="height: 100%" >
      <!--        style="background-color: #f0f2f5"-->
      <el-aside width="20%">
        <div style=";background-color: white;position: fixed;left: 2%;top: 18%;width: 12%;display: inline;">
          <!--            border: solid 2px #666666-->
          <h5>专业分类</h5>
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
      <el-main style="width: 80%">
        <div>
          <div style="background-color: white;border-width: 1px;border-color: #666666;position: absolute;left: 16%;top: 25%;width: 60%;display: inline;">
            <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                       active-text-color="#0079fe" >
                <el-menu-item index="1" style="width: 125px">●全部</el-menu-item>
                <el-menu-item index="2" style="width: 125px">●期刊</el-menu-item>
                <el-menu-item index="3" style="width: 125px">●会议</el-menu-item>
                <el-menu-item index="4" style="width: 125px">●科技报告</el-menu-item>
                <el-menu-item index="5" style="width: 125px">●专利</el-menu-item>
                <el-menu-item index="6" style="width: 125px">●成果</el-menu-item>
                <el-menu-item index="7" style="width: 125px">●代码</el-menu-item>
              </el-menu>
            </div>
            <div>
              <el-card class="box-card" shadow="hover">
                <div v-for="o in 10" :key="o" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4">
                  <!--                    {{'列表内容 ' + o }}-->
                  <div style="height: 40px;margin-top: 10px">
                    <div style="text-align: left;display: inline;position: absolute;left: 20px;">
                      <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold">标题</span>
                    </div>
                    <div style="display: inline;position: absolute;right: 20px;margin-top: -16px">
                      <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                        <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="举报" placement="bottom">
                        <i class="el-icon-warning-outline" style="font-size: 25px;width: 30px"></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                        <i class="el-icon-share" style="font-size: 25px;width: 30px"></i>
                      </el-tooltip>
                    </div>
                  </div>


                  <div style="text-align: left">
                    <p style="height: 20px" >文字文字文字文字</p>
                  </div>

                  <div>
                    <div style="position: absolute;left: 20px;width: 30%;text-align: left;margin-top: 8px"><span>Me</span></div>
                    <el-tag type="info" style="position: absolute;right: 100px;width: 50px;text-align: center;margin-top: 0px">
                      <span>期刊</span>
                    </el-tag>
                    <i class="el-icon-view" style="position: absolute;right: 20px;margin-top: 8px">
                      <span> 66666</span>
                    </i>
                  </div>

                </div>

              </el-card>
            </div>
            <div>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                style="margin-top: 10px;height: 100px">
              </el-pagination>
            </div>
          </div>

          <div style="position: absolute;left: 78%;top: 25%;width: 20%;display: inline;">
            <p style="font-family: '微软雅黑', sans-serif;font-weight: bold">🔥热点</p>
            <el-card class="box-card" shadow="hover">
              <div v-for="o in 5" :key="o" class="text item" style="height: 120px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4">
                <!--                    {{'列表内容 ' + o }}-->
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
            <!--              <img src="../assets/BacktoTop.jpg" class="icon" v-if="btnFlag" @click="backTop">-->
          </div>
        </div>
      </el-main>
    </el-container>
    <!--      <el-footer>-->
    <!--        <div><BottomBar></BottomBar></div>-->

    <!--      </el-footer>-->
    <!--    </el-container>-->

  </div>
</template>

<script>
  import TopBar from "./TopBar";
  import BottomBar from "./BottomBar";
  import SearchBox from "./SearchBox";
  export default {
    name: "SearchResult",
    components:{
      TopBar,
      BottomBar,
      SearchBox
    },
    data() {
      return {
        btnFlag: false
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
      }
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
