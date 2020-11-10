<template>
  <div style="background-color:white;">
    <TopBar></TopBar>
    <el-container>
      <el-header height=200px>
        <div style="width: 70% auto;">
          <figure class="snip0056">
              <figcaption>
                  <h2>江竹溪</h2>
                  <p>问来问去的问题都太简单，有时很幼稚！你们理解不？明白吗？作为一个长者，我必须告诉你们这一点。我不是记者，但是我必须告诉你们生活的真相。</p>
                  <div class="icons">
                    <el-popover
                      placement="bottom"
                      title="联系邮箱"
                      width="200"
                      trigger="hover"
                      content="无可奉告">
                      <el-button slot="reference" type="primary" icon="el-icon-message" circle></el-button>
                    </el-popover>
                    <el-popover
                      placement="bottom"
                      title="联系电话"
                      width="200"
                      trigger="hover"
                      content="谈笑风生">
                      <el-button slot="reference" type="primary" icon="el-icon-phone" circle></el-button>
                    </el-popover>
                    <el-button type="primary" icon="el-icon-star-off" href="#" round plain>关注</el-button>
                  </div>
              </figcaption>
              <img src="../assets/jiang.jpg" alt="sample8" />
          </figure>
        </div>
      </el-header>
      <el-main style="background-color: #F4F4F4;width: 70%;margin:0 auto">
        <el-col :span="18">
          <el-divider content-position="left">简介</el-divider>
          <el-card class="box-card" style="float: left;">
            <font>被引:114 被收藏:514 被雷普:1919810</font>
          </el-card>
          <el-card class="box-card" style="float: left;">
            <div slot="header" class="clearfix">
              <span>研究领域</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'领域 ' + o }}
            </div>
          </el-card>
          
          <span>&nbsp</span>
          <el-divider content-position="left">发表作品</el-divider>
          <el-card class="box-card" style="float: left;">
            <div slot="header" class="clearfix">
              <span>研究成果</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'具体领域 ' + o }}
            </div>
          </el-card>
          
          <span>&nbsp</span>
          <el-divider content-position="left">关系网络</el-divider>
          <el-card class="box-card" style="float: left;">
            <div slot="header" class="clearfix">
              <span>网络</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'网络 ' + o }}
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="6">
          <el-card class="box-card" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>联系方式</span>
            </div>
            <div>
              探探:
            </div>
            <div>
              百合网:
            </div>
            <div>
              P站账号:
            </div>
          </el-card>
          <el-card class="box-card" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>所属机构</span>
            </div>
            <div v-for="o in 2" :key="o" class="text item">
              {{'机构' + o }}
            </div>
          </el-card>
          <el-card class="box-card" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>合作作者</span>
            </div>
            <div v-for="o in 2" :key="o" class="text item">
              {{'路人' + o }}
            </div>
          </el-card>
          <el-card class="box-card" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>广告</span>
            </div>
            <div v-for="o in 15" :key="o" class="text item">
              {{'广告' + o }}
            </div>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
        name: "PersonalPortal",
      components:{
        TopBar
      },
    }
</script>

<style scoped>
  figure.snip0056 {
    font-family: 'Raleway', Arial, sans-serif;
    position: relative;
    overflow: hidden;
    margin: 10px auto;
    width: 71%;
    height: 180px;
    background: #ffffff;
    color: #000000;
  }
  figure.snip0056 * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  figure.snip0056 > img {
    width: 10%;
    border-radius: 50%;
    -webkit-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
    -webkit-transform: scale(1.6);
    transform: scale(1.6);
    position: relative;
    float: right;
    right: 0%;
    z-index: 1;
  }
  figure.snip0056 figcaption {
    padding: 20px 30px 20px 20px;
    position: absolute;
    left: 0;
    width: 50%;
  }
  figure.snip0056 figcaption h2,
  figure.snip0056 figcaption p {
    margin: 0;
    text-align: left;
    padding: 10px 0;
    width: 100%;
  }
  figure.snip0056 figcaption h2 {
    font-size: 1.3em;
    font-weight: 300;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  figure.snip0056 figcaption h2 span {
    font-weight: 800;
  }
  figure.snip0056 figcaption p {
    font-size: 0.9em;
    opacity: 0.8;
  }
  figure.snip0056 figcaption .icons {
    width: 100%;
    text-align: left;
  }
  figure.snip0056 figcaption .icons i {
    font-size: 26px;
    padding: 5px;
    top: 50%;
    color: #000000;
  }
  figure.snip0056 figcaption a {
    opacity: 0.3;
    -webkit-transition: opacity 0.35s;
    transition: opacity 0.35s;
  }
  figure.snip0056 figcaption a:hover {
    opacity: 0.8;
  }
  figure.snip0056:hover > img,
  figure.snip0056.hover > img {
    right: 5%;
  }
  .box-card {
    /* padding-left: -10px;
    padding-right: -10px; */
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
  }
</style>
