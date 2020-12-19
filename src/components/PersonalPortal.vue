<template>
  <div style="background-color:white;">
    <TopBar></TopBar>
    <el-container style="width: 1152px;margin:0 auto">
      <el-header height=283px>
        	<div id="author_intro_wr">
            <div v-if="isMyPortal" class="person_image">
        			<a href="#" class="my_portraitwr">
        				<img :src="require('../assets/Head/'+avatar)" alt="学者头像" class="" width="112" height="112">
        			</a>
        		</div>
            <div v-if="!isMyPortal" class="person_image">
            	<a href="#" class="person_portraitwr">
            		<img :src="require('../assets/Head/'+avatar)" alt="学者头像" class="" width="112" height="112">
            	</a>
            	<div style="margin: auto;">
                <el-button v-if= "isClaimed == true" style="text-align:center;margin-top: 10px;margin-bottom: 10px;" type="primary">我要申诉</el-button>
                <el-button v-if= "isClaimed == false" style="text-align:center;margin-top: 10px;margin-bottom: 10px;" type="primary">我要认证</el-button></br>
            	  <el-button v-if="this.isFollowing == false" style="width: 70%;" size="mini" type="primary" round plain>关注</el-button>
                <el-button v-if="this.isFollowing == true" style="width: 70%;" size="mini" type="primary" round plain>取消关注</el-button>
            	</div>
            </div>
        		<div class="person_baseinfo">
        			<div class="p_name">
        				{{realName}}
                <el-popover
                    placement="bottom"
                    title="邮箱"
                    width="250"
                    trigger="hover"
                    :content="mail">
                  <el-button class="commun" slot="reference" type="info" icon="el-icon-message" :data-clipboard-text="mail" @click="Copy" circle></el-button>
                </el-popover>
                <el-tooltip class="item" effect="dark" content="私信ta" placement="bottom">
                  <el-button type="info" icon="el-icon-chat-dot-square" circle ></el-button>
                </el-tooltip>
        			</div>
        			<div class="p_volume">
        				{{visitNum}}人看过|{{followNum}}人正在关注
        			</div>
        			<div class="p_affiliate">
                <el-link :underline="false" @click="gotoInstitution(this.insId)">
                  {{insName}}
                </el-link>
        			</div>
              </br>
        			<div class="p_ach_wr">
                <ul>
                  <li class="p_ach_item">
                    <p class="p_ach_type c_gray">被引频次</p>
                    <p class="p_ach_num">{{quoteNum}}</p>
                  </li>
                  <li class="p_ach_item">
                    <p class="p_ach_type c_gray">成果数</p>
                    <p class="p_ach_num">{{paperNum}}</p>
                  </li>
                </ul>
            </div>
            </br>
            <div class="person_editinfo">
              <span class="c_gray prefix_label">领域：</span>
              <span class="person_domain person_text">{{resField}}</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-col :span="17">
          <el-card class="box-card" shadow="never">
            <div slot="header" style="display:inline-block">
              <div class="pie" ref="uPie" id="une"></div>
              <!-- <div class="pie" ref="dPie" id="deux"></div> -->
              <div class="pie" ref="tPie" id="trois"></div>
              <div class="textinpie">
                共</br>
                <font style="font:  bold italic 27px  arial">{{paperNum}}</font>篇
              </div>
            </div>
            <div style="display:inline-block">
              <div class="charts" ref="fChart" id="first"></div>
              <div class="charts" ref="sChart" id="second"></div>
            </div>
          </el-card>
          <el-divider content-position="left">发表作品</el-divider>
          <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in tableData" :key="index" class="text-item" >
            <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
              <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
            </div>
            <div style="display: inline;position: absolute;right: 20px;top: 5px">
              <span>
                <el-tooltip v-if="item.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom">
                  <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="addCollection(index)"></i>
                </el-tooltip>
              </span>
              <span>
                <el-tooltip v-if="item.collectStatus === true" class="item" effect="dark" content="已收藏" placement="bottom">
                  <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
                </el-tooltip>
              </span>
              <span>
                <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(item.link,item.title)" style="height: 20px;">
              </span>
              <span style="margin-left: 5px;margin-right: 2px">
                <img src="../assets/WeChat.png" alt="" @click="openQRcode(item.link)" style="height: 20px;">
              </span>
              <span>
                <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                  <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="item.link" @click="Copy"></i>
                </el-tooltip>
              </span>
            </div>
            <div style="text-align: left;position: absolute;top: 43px;width: 96%">
              <p style="line-height: 27px;" >{{item.msg}}<a :href="item.link" target="_blank">>>查看详情</a></p>

            </div>
            <div>
              <el-tag type="info" style="position: absolute;right: 80px;top: 100px;width: 50px;text-align: center;margin-top: 0px">
                <span>{{item.type}}</span>
              </el-tag>
              <i class="el-icon-star-on" style="position: absolute;right: 20px;top: 110px">
                <span> {{item.collectionSum}}</span>
              </i>
              <!-- <i class="el-icon-view" style="position: absolute;right: 20px;top: 110px">
                <span> {{item.viewSum}}</span>
              </i> -->
            </div>
          </el-card>
          <!-- <div>
            <div style="margin-top: 30px;margin-bottom: 30px" v-if="menuIndex === '0'">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                hide-on-single-page = true
                layout="total, prev, pager, next, jumper"
                :total="totalPage"
                prev-text="上一页"
                next-text="下一页">
              </el-pagination>
            </div>
          </div> -->
        </el-col>
        <el-col :span="7">
          <p style="font-family: '微软雅黑', sans-serif;font-weight: bold;margin-bottom: 23px">作者关系</p>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>合作作者</span>
            </div>
            <div v-for="(item,index) in coopData" :key="index" class="coop-item" >
              <div style="text-align: left;position: absolute;">
                <img :src="require('../assets/Head/'+item.avatar)" class="avatar"></img>
              </div>
              <el-link :underline="false" @click="gotoAuthor(item.link)">
                <div style="font:  bold 14px arial;color: #0000FF;height: 12px;padding-left: 42px;">{{item.name}}</div>
              </el-link>
              <div style="font:  7px  arial;color:#9a9a9a;padding-top: 9px;padding-left: 42px;">{{item.institute}}</div>
            </div>
          </el-card>
<!--         <el-card class="box-card" shadow="never">
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
    import baseUrl from "./baseUrl";
    import webUrl from "./webUrl";
    import axios from 'axios';
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/pie')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/graphic')
    export default {
      name: "PersonalPortal",
      data() {
        return {
          // currentPage: 1,
          // pageSize: 5,
          // totalPage: 100,
          userId:1,
          resId:2,
          menuIndex: '0',
          isHave: true,
          avatar:'trump.jpg',
          isHave: true,
          isClaimed: true,
          isFollowing: true,
          isMyPortal: false,        //如果是我自己的门户则不显示关注取消关注按钮
          visitNum:'1400',
          followNum:'0',
          realName:'Trump名字最多可以这么长',
          insName:'White House名字可以很长很长很长很长很长很长很长很长最多可以这么长',
          insId:1,
          mail:'邮箱大概也就这么@长吧.别太长了',
          quoteNum:'132',
          paperNum:'321',
          resField:'吹牛',
          coopList:['Nissa','Gedion','Jaca','Liliana','Chandra'],
          resCount:['3', '5', '4', '2', '3', '9', '2','3'],
          quoCount:['47', '72', '38', '64', '36', '23', '86','23'],
          magCount:50,
          magPar:'50%',
          patCount:20,
          patPar:'20%',
          confCount:30,
          confPar:'30%',
          coopData:[
            {
              name:'钱诚',
              institute:'中国科学院计算技术研究所微处理器中心',
              avatar:'head01.png',
              link:'https://trump.com/', //resid门户id
            },
            {
              name:'钱诚',
              institute:'中国科学院计算技术研究所微处理器中心',
              avatar:'head01.png',
              link:'https://trump.com/',
            },
            {
              name:'钱诚',
              institute:'中国科学院计算技术研究所微处理器中心',
              avatar:'head07.png',
              link:'https://trump.com/',
            },
            {
              name:'钱诚',
              institute:'中国科学院计算技术研究所微处理器中心',
              avatar:'head01.png',
              link:'https://trump.com/',
            },
            {
              name:'钱诚',
              institute:'中国科学院计算技术研究所微处理器中心',
              avatar:'head01.png',
              link:'https://trump.com/',
            }
          ],
          tableData: [
            {
              paperId:'0',
              title:'MAGA',
              msg:'Make America Great Again的简介可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长最多这么长',
              type:"扯淡",
              collectStatus:true,
              collectionSum:666,
              link:'https://trump.com/',
            },
            {
              paperId:'1',
              title:'MAGA',
              msg:'Make America Great Again1',
              type:"扯淡",
              collectStatus:true,
              collectionSum:666,
              link:'https://trump.com/',
            },
            {
              paperId:'2',
              title:'MAGA',
              msg:'Make America Great Again2',
              type:"扯淡",
              collectStatus:true,
              collectionSum:666,
              link:'https://trump.com/',
            },
            {
              paperId:'3',
              title:'MAGA',
              msg:'Make America Great Again3',
              type:"扯淡",
              collectStatus:true,
              collectionSum:666,
              link:'https://trump.com/',
            },
            {
              paperId:'4',
              title:'MAGA',
              msg:'Make America Great Again4',
              type:"扯淡",
              collectStatus:true,
              collectionSum:666,
              link:'https://trump.com/',
            }
          ],
        }
      },
      mounted() {
        this.userId=localStorage.getItem('myId');
        this.resId=localStorage.getItem('authorId');
        this.getPersonalPortal();
      },
      methods:{
        gotoAuthor(authorId) {
          window.open(webUrl+'PersonalPortal');
          localStorage.setItem('authorId',authorId);
        },
        gotoInstitution(institutionId){
          window.open(webUrl+'ResearchInstitute');
          localStorage.setItem('institutionId',institutionId);
        },
        getPersonalPortal() {
          var that = this;
          this.$axios.get(baseUrl+'/getPersonalPortal?userId='+this.userId+'&resId='+this.resId
          ).then(function (response) {
            that.isHave=response.data.ishave;
            that.avatar=response.data.avatar;
            that.isClaimed=response.data.isclaimed;
            that.isFollowing=response.data.isfollowing;
            that.isMyPortal=response.data.ismyportal;        //如果是我自己的门户则不显示关注取消关注按钮
            that.visitNum=response.data.visitnum;
            that.followNum=response.data.follownum;
            that.realName=response.data.realname;
            that.insName=response.data.insname;
            that.insId=response.data.insid;
            that.mail=response.data.mail;
            that.quoteNum=response.data.quotenum;
            that.paperNum=response.data.papernum;
            that.resField=response.data.resfield;
            that.coopList=response.data.cooplist;
            that.resCount=response.data.rescount;
            that.quoCount=response.data.quocount;
            // that.tableData=response.data.tabledata;
            
            that.magCount=response.data.magcount;
            that.magPar=response.data.magpar;
            that.confCount=response.data.confcount;
            that.confPar=response.data.confpar;
            
            that.coopData=response.data.coopdata;
            that.drawLine();
          })
        },
        drawLine(){
          let fChart=echarts.init(document.getElementById('first'))
          let sChart=echarts.init(document.getElementById('second'))
          let uPie=echarts.init(document.getElementById('une'))
          // let dPie=echarts.init(document.getElementById('deux'))
          let tPie=echarts.init(document.getElementById('trois'))
          var xd=['2013', '2014', '2015', '2016', '2017', '2018', '2019','2020'];
          fChart.setOption({
            backgroundColor:"",
            tooltip: {              //设置tip提示
              trigger: 'axis',
              alwaysShowContent: true ,
              formatter: function (params, ticket, callback) {
                var htmlStr = '';
                for(var i=0;i<params.length;i++){
                	var param = params[i];
                  var xName = param.name;//x轴的名称
                  var seriesName = param.seriesName;//图例名称
                  var value = param.value;//y轴值
                  var color = param.color;//图例颜色
                  if(i===0){
                    htmlStr += xName + '年';//x轴的名称
                  }
                  htmlStr += seriesName + '</br>'
                  htmlStr += '<div style="float:left;font:  bold italic 27px  arial">';
                  htmlStr += value;
                  htmlStr += '</div>';
                }
                return htmlStr;
              }
            },
            grid: {
              x:5,
              y:0,
              x2:5,
              y2:1
            },
            color: ['#59c4e6'],
            xAxis: {                //设置x轴
              boundaryGap: false,     //坐标轴两边不留白
              data: xd,
              type: 'category',
              axisLine: {             //坐标轴轴线相关设置。
                show: true,
                lineStyle: {
                  color: '#e2e2e2',
                }
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false
              },
              splitline: {
                show: true,
              }
            },
            yAxis: {
              type: 'value',
              axisLine: {             //坐标轴轴线相关设置。
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false
              },
              splitLine:{
                show:false//不显示网格线
              },
            },
            series: [
              {
                name: '成果数',
                type: 'line',
                data: this.resCount,
                smooth: true,
                areaStyle: {
                  normal: {
                    color: {
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: "#59c4e6" // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: "rgba(89,196,230,0)" // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#59c4e6',
                  }
                },
              }
            ]
          });
          sChart.setOption({
            backgroundColor:"",
            tooltip: {              //设置tip提示
              trigger: 'axis',
              alwaysShowContent: true ,
              formatter: function (params, ticket, callback) {
                var htmlStr = '';
                for(var i=0;i<params.length;i++){
                	var param = params[i];
                  var xName = param.name;//x轴的名称
                  var seriesName = param.seriesName;//图例名称
                  var value = param.value;//y轴值
                  var color = param.color;//图例颜色
                  if(i===0){
                    htmlStr += xName + '年';//x轴的名称
                  }
                  htmlStr += seriesName + '</br>'
                  htmlStr += '<div style="float:left;font:  bold italic 27px  arial">';
                  htmlStr += value;
                  htmlStr += '</div>';
                }
                return htmlStr;
              }
            },
            grid: {
              x:5,
              y:0,
              x2:5,
              y2:1
            },
            color: ['#59c4e6'],
            xAxis: {                //设置x轴
              boundaryGap: false,     //坐标轴两边不留白
              data: xd,
              type: 'category',
              axisLine: {             //坐标轴轴线相关设置。
                show: true,
                lineStyle: {
                  color: '#e2e2e2',
                }
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false
              },
              splitline: {
                show: true,
              }
            },
            yAxis: {
              type: 'value',
              axisLine: {             //坐标轴轴线相关设置。
                show: false,
              },
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false
              },
              splitLine:{
                show:false//不显示网格线
              },
            },
            series: [
              {
                name: '被引数',
                type: 'line',
                data: this.quoCount,
                smooth: true,
                areaStyle: {
                  normal: {
                    color: {
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: "#59c4e6" // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: "rgba(89,196,230,0)" // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#59c4e6',
                  }
                },
              }
            ]
          });
          uPie.setOption({
            title: {//标题组件
              textStyle: {
                color: "#333333",
                fontSize: 12,
              }
            },
            graphic:[
            {
              type: 'text',
              top: '37%',
              left: 'center',
              style: {
                text: this.magPar,
                fill: '#333333',
                fontSize: 20,
                fontWeight: 'normal'
              }
            },{
              type: 'text',
              top: '50%',
              left: 'center',
              style: {
                text: '期刊',
                fill: '#A6A8B6',
                fontSize: 12,
                fontWeight: 'normal'
              }
            },
            ],
            //圆环的颜色
            color:['#66b1ff','#dfe6ee'],
            series: [
            {
              name:'工资占比图',//代表a的值，系列名称
              type:'pie',
              center:['50%','45%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
              radius: ['45%', '60%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                normal: {
                	show: false  //视觉引导项第二段的长度。
                }
              },
              // 系列中的数据内容数组。
              data:[
                {
                  value:this.magCount,
                  name:'期刊',
                  itemStyle: {normal: {color: '#66b1ff'},emphasis: {color: '#66b1ff'}}
                },
                {
                  value:this.patCount+this.confCount,
                  name:'其他',
                  itemStyle: {normal: {color: '#dfe6ee'},emphasis: {color: '#dfe6ee'}}
                },
              ]
            }
            ]
          });
          // dPie.setOption({
          //   title: {//标题组件
          //     textStyle: {
          //       color: "#333333",
          //       fontSize: 12,
          //     }
          //   },
          //   graphic:[
          //   {
          //     type: 'text',
          //     top: '37%',
          //     left: 'center',
          //     style: {
          //       text: this.patPar,
          //       fill: '#333333',
          //       fontSize: 20,
          //       fontWeight: 'normal'
          //     }
          //   },{
          //     type: 'text',
          //     top: '50%',
          //     left: 'center',
          //     style: {
          //       text: '专利',
          //       fill: '#A6A8B6',
          //       fontSize: 12,
          //       fontWeight: 'normal'
          //     }
          //   },
          //   ],
          //   //圆环的颜色
          //   color:['#66b1ff','#dfe6ee'],
          //   series: [
          //   {
          //     name:'工资占比图',//代表a的值，系列名称
          //     type:'pie',
          //     center:['50%','45%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
          //     radius: ['45%', '60%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
          //     avoidLabelOverlap: false,
          //     hoverAnimation: false,
          //     label: {
          //       normal: {
          //       	show: false  //视觉引导项第二段的长度。
          //       }
          //     },
          //     // 系列中的数据内容数组。
          //     data:[
          //       {
          //         value:this.patCount,
          //         name:'专利',
          //         itemStyle: {normal: {color: '#66b1ff'},emphasis: {color: '#66b1ff'}}
          //       },
          //       {
          //         value:this.confCount+this.magCount,
          //         name:'其他',
          //         itemStyle: {normal: {color: '#dfe6ee'},emphasis: {color: '#dfe6ee'}}
          //       },
          //     ]
          //   }
          //   ]
          // });
          tPie.setOption({
            title: {//标题组件
              textStyle: {
                color: "#333333",
                fontSize: 12,
              }
            },
            graphic:[
            {
              type: 'text',
              top: '37%',
              left: 'center',
              style: {
                text: this.confPar,
                fill: '#333333',
                fontSize: 20,
                fontWeight: 'normal'
              }
            },{
              type: 'text',
              top: '50%',
              left: 'center',
              style: {
                text: '项目',
                fill: '#A6A8B6',
                fontSize: 12,
                fontWeight: 'normal'
              }
            },
            ],
            //圆环的颜色
            color:['#66b1ff','#dfe6ee'],
            series: [
            {
              name:'工资占比图',//代表a的值，系列名称
              type:'pie',
              center:['50%','45%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
              radius: ['45%', '60%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                normal: {
                	show: false  //视觉引导项第二段的长度。
                }
              },
              // 系列中的数据内容数组。
              data:[
                {
                  value:this.confCount,
                  name:'项目',
                  itemStyle: {normal: {color: '#66b1ff'},emphasis: {color: '#66b1ff'}}
                },
                {
                  value:this.magCount+this.patCount,
                  name:'其他',
                  itemStyle: {normal: {color: '#dfe6ee'},emphasis: {color: '#dfe6ee'}}
                },
              ]
            }
            ]
          });
          setTimeout(function(){
            fChart.dispatchAction({
              type: 'showTip',
              seriesIndex:0,  // 显示第几个series
              dataIndex:7
            });
          });
          setTimeout(function(){
            sChart.dispatchAction({
              type: 'showTip',
              seriesIndex:0,  // 显示第几个series
              dataIndex:7
            });
          });
        },
        handleSizeChange: function(size) {
          this.pageSize = size;
        },
        //点击第几页
        handleCurrentChange: function(currentPage) {
          this.currentPage = currentPage;
        },
        gotoPaper(url) {
          window.open(url,url)
        },
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
        },
        
        gotoWeibo(url,title) {
          window.open("http://service.weibo.com/share/share.php?url="+url+"&sharesource=weibo&title="+title);
        },
        
        openQRcode(url) {
          this.QRlink=url;
          this.dialogVisible=true;
        },
      },
      components:{
        TopBar
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
  #author_intro_wr .my_portraitwr{
  	position:relative;
  	display:inline-block;
  	width:112px;
  	height:112px;
  	border:6px solid #fff;
  	overflow:hidden;
    margin-top: 53px;
  	-webkit-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-moz-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-ms-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-webkit-border-radius:50%;
  	-moz-border-radius:50%;-ms-border-radius:50%;
  	border-radius:50%
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
  	margin:9px 0 0 12px;vertical-align:top
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
  .charts{
    float:left;
    position: relative;
    width: 360px;
    height: 150px;
    background: #ffffff;
    margin: 10 10 10 10 auto;
  }
  .pie{
    float:left;
    position: relative;
    width: 150px;
    height: 150px;
    background: #ffffff;
    margin: 0 auto;
  }
  .textinpie{
    float:left;
    position: relative;
    font: bold 27px  arial;
    width: 130px;
    height: 115px;
    background: #ffffff;
    margin-top: 32px;
    margin-left: 20px;
  }
  .text-item{
    display:inline-block;
    position: relative;
    margin-top: 2px;
    height: 140px;
    width:calc(98% + 2px);
  }
  .coop-item{
    text-align: left;
    height: 42px;
    width:100%;
  }
  .avatar{
  	position:relative;
  	display:inline-block;
  	width:33px;
  	height:33px;
  	border:2px solid #fff;
    margin-top: 5px;
  	overflow:hidden;
  	-webkit-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-moz-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-ms-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-webkit-border-radius:50%;
  	-moz-border-radius:50%;-ms-border-radius:50%;
  	border-radius:20%
  }
  .box-card {
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    float: none;
    width: calc(98% + 2px);
  }

</style>
