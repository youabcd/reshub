<template>
  <div style="">
    <TopBar></TopBar>
      <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 15%;margin-top: 2%;width: 70%;">
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
            <div v-for="o in 10" :key="o" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative">
              <!--                    {{'列表内容 ' + o }}-->
<!--              <div style="height: 40px;margin-top: 10px">-->
                <div style="text-align: left;display: inline;position: absolute;left: 0;top: 20px">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold">标题</span>
                </div>
                <div style="display: inline;position: absolute;right: 0;top: 0">
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
<!--              </div>-->


              <div style="text-align: left;position: absolute;top: 60px">
                <p style="height: 20px" >文字文字文字文字</p>
              </div>

              <div>
                <div style="position: absolute;left: 0;top: 130px;width: 30%;text-align: left;"><span>Me</span></div>
                <el-tag type="info" style="position: absolute;right: 150px;top: 120px;width: 50px;text-align: center;margin-top: 0px">
                  <span>期刊</span>
                </el-tag>
                <i class="el-icon-star-on" style="position: absolute;right: 75px;top: 130px">
                  <span> 6667</span>
                </i>
                <i class="el-icon-view" style="position: absolute;right: 0;top: 130px">
                  <span> 6666</span>
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

        <div>
          <div class="back-top-circle" @click="backTop" v-if="btnFlag">
            <i class="el-icon-caret-top" ></i>
          </div>
          <!--              <img src="../assets/BacktoTop.jpg" class="icon" v-if="btnFlag" @click="backTop">-->
        </div>
      </div>

  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
        name: "MyCollection",
      components:{
        TopBar
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

<style scoped>
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
