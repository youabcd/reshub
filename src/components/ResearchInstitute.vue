<template>
  <div style="background-color:white;">
    <TopBar></TopBar>
    <el-container  v-loading="loading" style="width: 1152px;margin:0 auto">
      <el-header height=283px>
        	<div id="author_intro_wr">
        		<div class="person_baseinfo">
        			<div class="p_name">
        				{{insName}}
                <!-- <el-popover
                    placement="bottom"
                    title="邮箱"
                    width="200"
                    trigger="hover"
                    :content="mail">
                <el-button class="commun" slot="reference" type="info" icon="el-icon-message" :data-clipboard-text="mail" @click="Copy" circle></el-button>
                </el-popover> -->
        			</div>
        			<!-- <div class="p_volume">
        				{{visitNum}}人看过
        			</div> -->
        			<div class="p_affiliate">
        				
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
                    <p class="p_ach_num">{{paperNum}}</p>
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
          <el-card class="box-card" shadow="never">
            <!-- <div slot="header" style="display:inline-block"> -->
            <div style="display:inline-block">
              <div class="pie" ref="uPie" id="une"></div>
              <!-- <div class="pie" ref="dPie" id="deux"></div> -->
              <div class="pie" ref="tPie" id="trois"></div>
              <div class="textinpie">
                共</br>
                <font style="font:  bold italic 27px  arial">{{paperNum}}</font><font>篇</font>
              </div>
            </div>
            <!-- </div>
            <div style="display:inline-block">
              <div class="charts" ref="fChart" id="first"></div>
              <div class="charts" ref="sChart" id="second"></div>
            </div> -->
          </el-card>
          <el-divider content-position="left">部分合作专家</el-divider>
          <el-card shadow="hover" v-if="!loading" v-for="(item,index) in resData" :key="index" class="box-res">
            <div style="display: inline;position: absolute;left: 95px;top: 20px;text-align: left;">
              <span style="font-family: '微软雅黑', sans-serif;overflow: hidden;font-size: 20px;font-weight: bold">{{item.name}}</span>
              <el-popover
                placement="right"
                title="邮箱"
                trigger="hover"
                :content="item.mail">
                <i class="el-icon-message" slot="reference" type="info" icon="el-icon-message" :data-clipboard-text="item.mail" @click="CopyResMail" circle></i>
              </el-popover>
            </div>
            <!-- <div style="display: inline;position: absolute;right: 10px;top: 5px">
              <span>
                <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                  <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="item.link" @click="Copy"></i>
                </el-tooltip>
              </span>
            </div> -->
            <div style="text-align: left;position: absolute;left:95px;top: 44px;">
              <p style="height: 7px" >领域：{{item.domain}}</p>
            </div>
            <div style="display:inline;text-align: left;position: absolute;left:20px;top: 103px;">
              <el-button style="width: 79px;" size="mini" type="primary" @click="gotoAuthor(item.resId)" round>查看详情</el-button>
              <!-- <el-button v-if="item.collectStatus === false" style="width: 79px;" size="mini" type="primary" round plain>关注</el-button>
              <el-button v-if="item.collectStatus === true" style="width: 79px;" size="mini" type="primary" round plain>取消关注</el-button> -->
            </div>
            <div style="text-align: left;position: absolute;">
              <img class="avatar" :src="require('../assets/Head/'+item.avatar)" ></img>
            </div>
            <div>
              <i class="el-icon-star-on" style="position: absolute;right: 65px;top: 110px">
                <span> {{item.collectionSum}}</span>
              </i>
              <i class="el-icon-view" style="position: absolute;right: 15px;top: 110px">
                <span> {{item.viewSum}}</span>
              </i>
            </div>
          </el-card>
          <div>
          </div>
        </el-col>
        <el-col :span="7">
          <p style="font-family: '微软雅黑', sans-serif;font-weight: bold;margin-bottom: 23px">部分作品</p>
          <el-card class="box-card" shadow="never" v-for="(item,index) in hotData" :key="index" >
            <div style="text-align: left;margin-top: -20px;cursor: pointer">
              <p style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</p>
            </div>
          
            <div style="text-align: left" @click="open(hotData[index])">
              <p style="height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;cursor: pointer;">{{item.msg}}</p>
            </div>
          
            <div>
              <div style="margin-top: 30px;text-align: left">
                  <span v-for="(author_item,author_index) in item.author" :key="author_index" style="margin-left: 15px;position: relative;right: 15px">
                    <el-link :underline="false" @click="gotoAuthor(item.authorId[author_index])">
                      {{author_item}}
                    </el-link>
                  </span>
              </div>
            </div>
          </el-card>
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
      name: "ResearchInstitute",
      data() {
        return {
          // currentPage: 1,
          // pageSize: 10,
          // totalPage: 100,
          menuIndex: '0',
          // avatar:require('../assets/white.jpg'),
          // visitNum:'1400',
          loading:true,
          insName:'研究机构',
          insId:1,
          // institute:'America名字可以很长很长很长很长很长很长很长很长最多可以这么长',
          mail:'1@2.3',
          quoted:'0',
          paperNum:'0',
          researchers:'0',
          domain:'未知',
          resCount:['3', '5', '4', '2', '3', '9', '2','3'],
          quoCount:['47', '72', '38', '64', '36', '23', '86','23'],
          magCount:50,
          magPar:'50%',
          confCount:30,
          confPar:'30%',
          resData: [
            {
              resId:'0',
              name:'研究员',
              avatar:'head00.jpg',
              mail:'romeo.yang.zheng@centralepekin.cn',
              domain:'未知',
              collectStatus:true,
              collectionSum:0,
              viewSum:0,
            },
            {
              resId:'0',
              name:'研究员',
              avatar:'head00.jpg',
              mail:'romeo.yang.zheng@centralepekin.cn',
              domain:'未知',
              collectStatus:true,
              collectionSum:0,
              viewSum:0,
            },
            
          ],
          hotData: [
            {
              paperId:'1',
              title:'文章标题',
              msg:'摘要',
              author: ['作者'],
              authorId: ['1'],
              link:'https://www.google.com.hk/',
            },
            {
              paperId:'1',
              title:'文章标题',
              msg:'摘要',
              author: ['作者'],
              authorId: ['1'],
              link:'https://www.google.com.hk/',
            },
            
          ],
        }
      },
      components:{
        TopBar
      },
      mounted() {
        this.userId=localStorage.getItem('myId');
        this.insId=localStorage.getItem('institutionId');
        this.getResearchInstitute();
      },
      methods:{
       gotoAuthor(authorId) {
         localStorage.setItem('authorId',authorId);
         window.open(webUrl+'PersonalPortal');
       },
       gotoInstitution(institutionId){
         localStorage.setItem('institutionId',institutionId);
         this.$router.push({
           path:'/ResearchInstitute',
         });
         window.location.reload()
       },
        getResearchInstitute() {
          var that = this;
          this.$axios.get(baseUrl+'/getResearchInstitute?instituteId='+localStorage.getItem('institutionId')
          ).then(function (response) {
            console.log(response);
            that.loading=false;
            console.log(that.loading);
            // that.visitNum=response.data.visitnum;
            that.realName=response.data.realname;
            that.insName=response.data.insname;
            //that.mail=response.data.mail;
            that.quoted=response.data.quoted;
            that.paperNum=response.data.papernum;
            that.researchers=response.data.researchers;
            that.domain=response.data.domain;
           
            that.resCount=response.data.rescount;
            that.quoCount=response.data.quocount;
            that.magCount=response.data.magcount;
            that.magPar=response.data.magpar;
            that.confCount=response.data.confcount;
            that.confPar=response.data.confpar;
            
            that.resData=response.data.resdata;
            that.hotData=response.data.hotdata; 
            console.log(response);
            that.drawLine();
          })
        },
        drawLine(){
          // let fChart=echarts.init(document.getElementById('first'))
          // let sChart=echarts.init(document.getElementById('second'))
          let uPie=echarts.init(document.getElementById('une'))
          //let dPie=echarts.init(document.getElementById('deux'))
          let tPie=echarts.init(document.getElementById('trois'))
          var xd=['1980-1985', '1985-1990', '1990-1995','1995-2000', '2000-2005', '2005-2010', '2010-2015','2015-2020'];
          // fChart.setOption({
          //   backgroundColor:"",
          //   tooltip: {              //设置tip提示
          //     trigger: 'axis',
          //     alwaysShowContent: true ,
          //     formatter: function (params, ticket, callback) {
          //       var htmlStr = '';
          //       for(var i=0;i<params.length;i++){
          //       	var param = params[i];
          //         var xName = param.name;//x轴的名称
          //         var seriesName = param.seriesName;//图例名称
          //         var value = param.value;//y轴值
          //         var color = param.color;//图例颜色
          //         if(i===0){
          //           htmlStr += xName + '年';//x轴的名称
          //         }
          //         htmlStr += seriesName + '</br>'
          //         htmlStr += '<div style="float:left;font:  bold italic 27px  arial">';
          //         htmlStr += value;
          //         htmlStr += '</div>';
          //       }
          //       return htmlStr;
          //     }
          //   },
          //   grid: {
          //     x:5,
          //     y:0,
          //     x2:5,
          //     y2:1
          //   },
          //   color: ['#59c4e6'],
          //   xAxis: {                //设置x轴
          //     boundaryGap: false,     //坐标轴两边不留白
          //     data: xd,
          //     type: 'category',
          //     axisLine: {             //坐标轴轴线相关设置。
          //       show: true,
          //       lineStyle: {
          //         color: '#e2e2e2',
          //       }
          //     },
          //     axisLabel: {
          //       show: false,
          //     },
          //     axisTick: {
          //       show: false
          //     },
          //     splitline: {
          //       show: true,
          //     }
          //   },
          //   yAxis: {
          //     type: 'value',
          //     axisLine: {             //坐标轴轴线相关设置。
          //       show: false,
          //     },
          //     axisLabel: {
          //       show: false,
          //     },
          //     axisTick: {
          //       show: false
          //     },
          //     splitLine:{
          //       show:false//不显示网格线
          //     },
          //   },
          //   series: [
          //     {
          //       name: '期刊数',
          //       type: 'line',
          //       data: this.resCount,
          //       smooth: true,
          //       areaStyle: {
          //         normal: {
          //           color: {
          //             x: 0,
          //             y: 0,
          //             x2: 0,
          //             y2: 1,
          //             colorStops: [{
          //               offset: 0,
          //               color: "#59c4e6" // 0% 处的颜色
          //             }, {
          //               offset: 1,
          //               color: "rgba(89,196,230,0)" // 100% 处的颜色
          //             }],
          //             globalCoord: false // 缺省为 false
          //           }
          //         }
          //       },
          //       lineStyle: {                // 线条样式 => 必须使用normal属性
          //         normal: {
          //           color: '#59c4e6',
          //         }
          //       },
          //     }
          //   ]
          // });
          // sChart.setOption({
          //   backgroundColor:"",
          //   tooltip: {              //设置tip提示
          //     trigger: 'axis',
          //     alwaysShowContent: true ,
          //     formatter: function (params, ticket, callback) {
          //       var htmlStr = '';
          //       for(var i=0;i<params.length;i++){
          //       	var param = params[i];
          //         var xName = param.name;//x轴的名称
          //         var seriesName = param.seriesName;//图例名称
          //         var value = param.value;//y轴值
          //         var color = param.color;//图例颜色
          //         if(i===0){
          //           htmlStr += xName + '年';//x轴的名称
          //         }
          //         htmlStr += seriesName + '</br>'
          //         htmlStr += '<div style="float:left;font:  bold italic 27px  arial">';
          //         htmlStr += value;
          //         htmlStr += '</div>';
          //       }
          //       return htmlStr;
          //     }
          //   },
          //   grid: {
          //     x:5,
          //     y:0,
          //     x2:5,
          //     y2:1
          //   },
          //   color: ['#59c4e6'],
          //   xAxis: {                //设置x轴
          //     boundaryGap: false,     //坐标轴两边不留白
          //     data: xd,
          //     type: 'category',
          //     axisLine: {             //坐标轴轴线相关设置。
          //       show: true,
          //       lineStyle: {
          //         color: '#e2e2e2',
          //       }
          //     },
          //     axisLabel: {
          //       show: false,
          //     },
          //     axisTick: {
          //       show: false
          //     },
          //     splitline: {
          //       show: true,
          //     }
          //   },
          //   yAxis: {
          //     type: 'value',
          //     axisLine: {             //坐标轴轴线相关设置。
          //       show: false,
          //     },
          //     axisLabel: {
          //       show: false,
          //     },
          //     axisTick: {
          //       show: false
          //     },
          //     splitLine:{
          //       show:false//不显示网格线
          //     },
          //   },
          //   series: [
          //     {
          //       name: '被引数',
          //       type: 'line',
          //       data: this.quoCount,
          //       smooth: true,
          //       areaStyle: {
          //         normal: {
          //           color: {
          //             x: 0,
          //             y: 0,
          //             x2: 0,
          //             y2: 1,
          //             colorStops: [{
          //               offset: 0,
          //               color: "#59c4e6" // 0% 处的颜色
          //             }, {
          //               offset: 1,
          //               color: "rgba(89,196,230,0)" // 100% 处的颜色
          //             }],
          //             globalCoord: false // 缺省为 false
          //           }
          //         }
          //       },
          //       lineStyle: {                // 线条样式 => 必须使用normal属性
          //         normal: {
          //           color: '#59c4e6',
          //         }
          //       },
          //     }
          //   ]
          // });
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
                  value:this.confCount, 
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
                  value:this.magCount, 
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
        Copy() {
          let clipboard = new Clipboard('.commun');
          clipboard.on('success', e => {
            this.$message({
              showClose: true,
              message: '复制邮箱成功',
              type: 'success',
            });
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            this.$message({
              showClose: true,
              message: '复制邮箱失败，请重试',
              type: 'error',
            });
            
            clipboard.destroy()
          })
        },
        CopyResMail() {
          let clipboard = new Clipboard('.el-icon-message');
          clipboard.on('success', e => {
            this.$message({
              showClose: true,
              message: '复制邮箱成功',
              type: 'success',
            });
            clipboard.destroy()
          })
          clipboard.on('error', e => {
            this.$message({
              showClose: true,
              message: '复制邮箱失败，请重试',
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
        gotoPortal(url) {
          //发送点击数据
          window.open(url,url)
        },
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
    margin-top: 53px;
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
  .avatar{
  	position:relative;
  	display:inline-block;
  	width:58px;
  	height:58px;
  	border:3px solid #fff;
  	overflow:hidden;
  	-webkit-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-moz-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-ms-box-shadow:0 1px 6px rgba(0,0,0,.25);
  	box-shadow:0 1px 6px rgba(0,0,0,.25);
  	-webkit-border-radius:50%;
  	-moz-border-radius:50%;-ms-border-radius:50%;
  	border-radius:50%
  }
  .box-res {
    display:inline-block;
    position: relative;
    float:left;
    margin-top: 2px;
    margin-left: 2.5px;
    margin-right: 2.5px;
    height: 140px;
    width: calc(50% - 10px);
  }
  .box-card {
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    float: none;
    width: calc(98% + 2px);
  }

</style>
