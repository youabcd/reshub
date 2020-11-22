<template>
  <div style="background-color:white;">
    <TopBar></TopBar>
    <el-container style="width: 1152px;margin:0 auto">
      <el-header height=283px>
        	<div id="author_intro_wr">
            <div class="person_image">
        			<a href="#" class="person_portraitwr">
        				<img :src="avatar" alt="学者头像" class="" width="112" height="112">
        			</a>
        			<div style="margin: auto;">
                <el-button style="text-align:center;margin-top: 10px;margin-bottom: 10px;" type="primary">我要加入</el-button></br>
        			  <el-button v-if="this.isFollowing === false" style="width: 70%;" size="mini" type="primary" round plain>关注</el-button>
                <el-button v-if="this.isFollowing === true" style="width: 70%;" size="mini" type="primary" round plain>取消关注</el-button>
        			</div>
        		</div>
        		<div class="person_baseinfo">
        			<div class="p_name">
        				{{name}}
                <el-popover
                    placement="bottom"
                    title="邮箱"
                    width="200"
                    trigger="hover"
                    :content="mail">
                <el-button class="commun" slot="reference" type="info" icon="el-icon-message" :data-clipboard-text="mail" @click="Copy" circle></el-button>
                </el-popover>
                <!-- <el-popover
                    placement="bottom"
                    title="电话"
                    width="200"
                    trigger="hover"
                    :content="phone">
                <el-button class="commun" slot="reference" type="info" icon="el-icon-phone-outline" :data-clipboard-text="phone" @click="Copy" circle></el-button>
                </el-popover> -->
        			</div>
        			<div class="p_volume">
        				{{visitNum}}人看过|{{followNum}}人正在关注
        			</div>
        			<div class="p_affiliate">
        				{{institute}}
        			</div>
              </br>
        			<div class="p_ach_wr">
                <ul>
                  <li class="p_ach_item">
                    <p class="p_ach_type c_gray">被引频次</p>
                    <p class="p_ach_num">{{quoted}}</p>
                  </li>
                  <li class="p_ach_item">
                    <p class="p_ach_type c_gray">成果数</p>
                    <p class="p_ach_num">{{products}}</p>
                  </li>
                  <li class="p_ach_item">
                    <p class="p_ach_type c_gray">专家数</p>
                    <p class="p_ach_num">{{researchers}}</p>
                  </li>
                </ul>
            </div>
            </br>
            <div class="person_editinfo">
              <span class="c_gray prefix_label">领域：</span>
              <span class="person_domain person_text">{{domain}}</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-col :span="17">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>可视化</span>
            </div>
            图图图图图</br>图图图图图
          </el-card>
          <el-divider content-position="left">旗下作者</el-divider[4]>
          <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in resData" :key="index" class="box-res">
            <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
              <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
            </div>
            <div style="display: inline;position: absolute;right: 20px;top: 5px">
              <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom" @click="addCollection(index)">
                <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
              </el-tooltip>
              <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                <i class="el-icon-share" style="font-size: 25px;width: 30px" data-clipboard-text="Copy" @click="CopyLink"></i>
              </el-tooltip>
            </div>
            <div style="text-align: left;position: absolute;top: 60px;width: 96%">
              <p style="height: 20px" >{{item.msg}}</p>
            </div>
            <div>
              <el-tag type="info" style="position: absolute;right: 170px;top: 100px;width: 50px;text-align: center;margin-top: 0px">
                <span>{{item.type}}</span>
              </el-tag>
              <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 110px">
                <span> {{item.collectionSum}}</span>
              </i>
              <i class="el-icon-view" style="position: absolute;right: 20px;top: 110px">
                <span> {{item.viewSum}}</span>
              </i>
            </div>
          </el-card>
          <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in resData1" :key="index" class="box-res">
            <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
              <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
            </div>
            <div style="display: inline;position: absolute;right: 20px;top: 5px">
              <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom" @click="addCollection(index)">
                <i class="el-icon-star-off" style="font-size: 25px;width: 30px"></i>
              </el-tooltip>
              <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
                <i class="el-icon-share" style="font-size: 25px;width: 30px" data-clipboard-text="Copy" @click="CopyLink"></i>
              </el-tooltip>
            </div>
            <div style="text-align: left;position: absolute;top: 60px;width: 96%">
              <p style="height: 20px" >{{item.msg}}</p>
            </div>
            <div>
              <el-tag type="info" style="position: absolute;right: 170px;top: 100px;width: 50px;text-align: center;margin-top: 0px">
                <span>{{item.type}}</span>
              </el-tag>
              <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 110px">
                <span> {{item.collectionSum}}</span>
              </i>
              <i class="el-icon-view" style="position: absolute;right: 20px;top: 110px">
                <span> {{item.viewSum}}</span>
              </i>
            </div>
          </el-card>
          
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="100"
              style="margin-top: 10px;height: 100px">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="7">
          <el-card class="box-card" shadow="hover" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>核心作品</span>
            </div>
            <div v-for="o in resList" :key="o">
              {{o}}
            </div>
          </el-card>
          
          <!-- <el-card class="box-card" shadow="hover" style="float: right;width: 95%;">
            <div slot="header" class="clearfix">
              <span>合作机构</span>
            </div>
            <div v-for="o in coopList" :key="o">
              {{o}}
            </div>
          </el-card> -->
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import TopBar from "./TopBar";
    import Clipboard from 'clipboard';
    export default {
      name: "ResearchInstitute",
      data() {
        return {
          menuIndex: '0',
          avatar:require('../assets/white.jpg'),
          isFollowing: true,
          visitNum:'1400',
          followNum:'0',
          name:'White House名字最多可以这么长',
          institute:'America名字可以很长很长很长很长很长很长很长很长最多可以这么长',
          mail:'1@2.3',
          quoted:'132',
          products:'321',
          researchers:'32123',
          domain:'政治',
          resList:['BiliBili','NicoNico','Acfun','Pixiv','Patreoon'],
          resData: [
            {
              paperId:'0',
              title:'MAGA',
              msg:'Make America Great Again',
              type:"扯淡",
              collectStatus:true,
              collectionSum:666,
              viewSum:777,
              link:'https://trump.com/',
              collectTime:'2016-05-04'
            },
          ],
          resData1: [
            {
              paperId:'1',
              title:'KAG',
              msg:'Keep America Great',
              type:"扯淡",
              collectStatus:true,
              collectionSum:888,
              viewSum:999,
              link:'https://trump.com/',
              collectTime:'0202-05-04'
            },
          ],
        }
      },
      components:{
        TopBar
      },
      methods:{
        Copy() {
          let clipboard = new Clipboard('.commun');
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
        CopyLink() {
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
        }
      }
    }
</script>

<style scoped>
  li{list-style:none}
  #author_intro_wr{
  	border-bottom:1px solid #e3e3e3;
  	padding:32px 0 43px;
  	overflow:hidden;
  	zoom:1
  }
  #author_intro_wr .person_baseinfo{
  	margin-right:65px
  }h3,
  .c_gray{
  	color:#999
  }
  #author_intro_wr .person_image{
  	width:125px;
  	float:left;
  	text-align:center;
    margin: auto;
  	margin-right:35px;
  	margin-left:5px;
  }
  #author_intro_wr .person_portraitwr{
  	position:relative;
  	display:inline-block;
  	width:112px;
  	height:112px;
  	border:6px solid #fff;
  	overflow:hidden;
  	-webkit-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-moz-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-ms-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-webkit-border-radius:50%;
  	-moz-border-radius:50%;-ms-border-radius:50%;
  	border-radius:50%
  }
  #author_intro_wr .person_portraitwr .edit_portraitbtn{
  	_display:none;
  	position:absolute;
  	bottom:0;
  	left:0;
  	color:#fff;
  	cursor:pointer;
  	text-align:center;
  	font-size:12px;
  	height:30px;
  	line-height:26px;
  	width:100%;
  	background:#000;
  	background:rgba(0,0,0,.6);
  	filter:alpha(opacity=80);
  	transition:all .2s
  }
  #author_intro_wr .person_portraitwr:hover{
  	text-decoration:none
  }
  #author_intro_wr .person_portraitwr:hover .edit_portraitbtn{
  	height:112px;
  	line-height:112px
  }
  
  #author_intro_wr .person_baseinfo{
  	float:left;
  	width:700px;
  	margin-right:30px;
  	margin-top:20px
  }
  #author_intro_wr .p_name{
  	font-size:28px;
  	line-height:30px;
  	color:#333;
    margin-left: 15px;
  	margin-bottom:8px;
  	float:left
  }
  #author_intro_wr .p_name .c-icon{
  	margin:9px 0 0 12px;
    vertical-align:top
  }
  #author_intro_wr .p_volume{
  	font-size:14px;
    color:#999;
    margin-top:10px;
    margin-left:20px;
    float:left
  }
  #author_intro_wr .p_scholarID{
  	width:192px;
  	height:24px;
  	background-color:#fafafa;
  	padding:3px;float:right
  }
  #author_intro_wr .p_scholarID .p_scholarID_all .p_scholarID_id{
  	font-size:13px;
  	color:#06c
  }
  #author_intro_wr .p_affiliate{
  	margin-left: 15px;
    float:left;
    clear:left;
  }
  #author_intro_wr .p_mail{
  	margin-left: 15px;
    float:left;
    clear:left;
  }
  #author_intro_wr .p_ach_wr{
    clear: left;
    float: left;
  	width:355px;
  	display:inline-block;
  	margin:20px 0 18px;
  	overflow:hidden;
  	height:70px
  }
  #author_intro_wr .p_ach_item{
  	float:left;
  	border-right:1px solid #efefef;
  	margin-right:10px;
  	font-size:20px;
  	width:78px
  }
  #author_intro_wr .p_ach_item:last-child{border:0}
  #author_intro_wr .p_ach_type{font-size:12px}
  #author_intro_wr .p_ach_num{}
  #author_intro_wr .person_domain a{
    float: left;
  	text-decoration:underline;
  	display:inline-block
  }
  #author_intro_wr .prefix_label{
    float:left
  }
  #author_intro_wr .person_editinfo{
    clear: left;
    float: left;
    margin-left: 15px;
    word-break:break-all;
    line-height:25px
  }
  .box-res {
    display:inline-block;
    position: relative;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 140px;
    width: 49%;
  }
  .box-card {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
  }

</style>
