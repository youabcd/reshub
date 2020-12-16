<template>
  <div>
    <TopBar></TopBar>
    <!--    <SearchBox v-on:searchEvent="search" style="position: relative;top: -15px"></SearchBox>-->
      <div style="width: 100%;margin-top: 30px">

        <el-drawer
          :visible.sync="drawer"
          :direction="direction"
          size=750px
          v-if="drawer">
          <div v-if="menuIndex==='0'">
            <!--期刊 期号+文献操作（分享等）-->
            <div style="margin-top: -40px;">
              <van-row>
                <van-col span="6">
                  <span>{{tableData00.paperIssue}}&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tableData00.paperVolume}}&nbsp;&nbsp;</span>
                  <span>{{tableData00.paperStart}}-{{tableData00.paperEnd}}</span>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="10" style="margin-top: -8px;">
                  <!--收藏-->
<!--                  <span>-->
<!--                    <el-tooltip v-if="tableData00.collectStatus === false" class="item" effect="dark" content="收藏">-->
<!--                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="addCollection(tableData00.paperId)"></i>-->
<!--                    </el-tooltip>-->
<!--                </span>-->
<!--                  <span>-->
<!--                    <el-tooltip v-if="tableData00.collectStatus === true" class="item" effect="dark" content="已收藏">-->
<!--                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>-->
<!--                    </el-tooltip>-->
<!--                </span>-->
                  <!--微博-->
                  <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(tableData00.link[0],tableData00.title)" style="height: 20px;">
                </span>
                  <!--微信-->
                  <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(tableData00.link[0])" style="height: 20px;">
                </span>
                  <!--复制连接-->
                  <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="tableData00.link[0]" @click="Copy"></i>
                    </el-tooltip>
                </span>
                </van-col>
              </van-row>
            </div>
            <!--文章标题-->
            <div style="margin-top: 10px;font-size: 30px;font-weight: 500;">
              {{tableData00.title}}
            </div>
            <!--作者 可点击-->
            <div style="margin-top: 15px;">
              <el-link v-for="(item,index) in tableData00.author" :key="index" type="primary" :underline="false" @click="gotoAuthor(tableData00.authorId[index])">
                {{item}}&nbsp;&nbsp;&nbsp;
              </el-link>
            </div>
            <!--机构 可点击-->
            <div style="margin-top: 10px;">
              <el-link v-for="(item,index) in tableData00.institution" :key="index" type="primary" :underline="false" @click="gotoInstitution(tableData00.institutionId[index])">
                {{item}}&nbsp;&nbsp;&nbsp;
              </el-link>
            </div>
            <!--摘要-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;margin-right: 5px;">
              <span style="font-family: 黑体;font-weight: 700">摘要：</span>
              <span>{{tableData00.msg}}</span>
            </div>
            <!--关键词-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">关键词：</span>
              <span>{{tableData00.keyword}}</span>
            </div>
            <!--DOI-->
            <div v-if="tableData00.paperDoi.length>0" style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">DOI：</span>
              <span>{{tableData00.paperDoi}}</span>
            </div>
            <!--基金资助-->
            <div v-if="tableData00.fund.length>0" style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">基金资助：</span>
              <span>{{tableData00.fund}}</span>
            </div>
            <!--学科-->
            <div v-if="tableData00.paperFos.length>0" style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">学科：</span>
              <span><el-link v-for="(item,index) in tableData00.paperFos" :key="index" type="primary" :underline="false">
              {{item}}&nbsp;&nbsp;&nbsp;
            </el-link></span>
            </div>
            <!--会议-->
            <div v-if="tableData00.paperVenue.length>0" style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">会议：</span>
              <span>{{tableData00.paperVenue}}</span>
            </div>
            <!--各类次数-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">被引次数：</span>
              <span>{{tableData00.citation}}</span>
              <span style="font-family: 黑体;font-weight: 700;margin-left: 10px;">收藏次数：</span>
              <span>{{tableData00.collectionSum}}</span>
              <span style="font-family: 黑体;font-weight: 700;margin-left: 10px;">浏览次数：</span>
              <span>{{tableData00.viewSum}}</span>
            </div>
            <!--出版-->
            <div v-if="tableData00.paperPublisher.length>0" style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">出版社：</span>
              <span>{{tableData00.paperPublisher}}</span>
            </div>
            <!--参考文献 clickable-->
            <div  style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">参考文献：</span>
              <span><el-link v-for="(item,index) in tableData00.reference" :key="index" type="primary" :underline="false" @click="gotoPaper(tableData00.referenceLink[index])">
              {{item}}&nbsp;&nbsp;&nbsp;
            </el-link></span>
            </div>
            <!--文献查看  分享推荐等图标  可点击-->
            <div style="margin-top: 24px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">查看原文：</span>
              <el-link v-for="(item,index) in tableData00.link" :key="index" type="primary" :underline="false" @click="gotoPaper(tableData00.link[index])">
                {{item}}&nbsp;&nbsp;&nbsp;
              </el-link>
            </div>
          </div>
          <div v-if="menuIndex==='1'">
            <!--项目类型+发表年份+文献操作（分享等）-->
            <div style="margin-top: -40px;">
              <van-row>
                <van-col span="6">
                  <span>{{tableData01.category}}&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tableData01.year}}</span>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="10" style="margin-top: -8px;">
                  <!--收藏-->
<!--                  <span>-->
<!--                    <el-tooltip v-if="tableData01.collectStatus === false" class="item" effect="dark" content="收藏">-->
<!--                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="addCollection(tableData01.paperId)"></i>-->
<!--                    </el-tooltip>-->
<!--                </span>-->
<!--                  <span>-->
<!--                    <el-tooltip v-if="tableData01.collectStatus === true" class="item" effect="dark" content="已收藏">-->
<!--                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>-->
<!--                    </el-tooltip>-->
<!--                </span>-->
                  <!--微博-->
                  <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(tableData01.link,tableData01.title)" style="height: 20px;">
                </span>
                  <!--微信-->
                  <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(tableData01.link)" style="height: 20px;">
                </span>
                  <!--复制连接-->
                  <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="tableData01.link" @click="Copy"></i>
                    </el-tooltip>
                </span>
                </van-col>
              </van-row>
            </div>
            <!--文章标题-->
            <div style="margin-top: 10px;font-size: 30px;font-weight: 500;">
              {{tableData01.title}}
            </div>
            <!--作者 可点击-->
            <div style="margin-top: 15px;">
              <el-link type="primary" :underline="false" @click="gotoAuthor(tableData01.authorId)">
                {{tableData01.author}}
              </el-link>
            </div>
            <!--机构-->
            <div style="margin-top: 10px;">
              {{tableData01.support}}
            </div>
            <!--摘要-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;margin-right: 5px;">
              <span style="font-family: 黑体;font-weight: 700">摘要：</span>
              <span>{{tableData01.zhAbstract}}</span>
            </div>
            <!--english摘要-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;margin-right: 5px;">
              <span style="font-family: 黑体;font-weight: 700">Abstract:</span>
              <span>{{tableData01.enAbstract}}</span>
            </div>
            <!--结题摘要-->
            <div v-if="tableData01.finalAbstract.length>0" style="margin-top: 15px;text-align: left;margin-left: 8px;margin-right: 5px;">
              <span style="font-family: 黑体;font-weight: 700">结题摘要：</span>
              <span>{{tableData01.finalAbstract}}</span>
            </div>
            <!--关键词-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">关键词：</span>
              <span>{{tableData01.zhKeywords}}</span>
            </div>
            <!--关键词-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">Keywords:</span>
              <span>{{tableData01.enKeywords}}</span>
            </div>
            <!--基金资助-->
            <div v-if="tableData01.fund.length>0" style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700">基金资助：</span>
              <span>{{tableData01.fund}}</span>
            </div>
            <!--各类次数-->
            <div style="margin-top: 15px;text-align: left;margin-left: 8px;">
              <span style="font-family: 黑体;font-weight: 700;">收藏次数：</span>
              <span>{{tableData01.collectionSum}}</span>
              <span style="font-family: 黑体;font-weight: 700;margin-left: 10px;">浏览次数：</span>
              <span>{{tableData01.viewSum}}</span>
            </div>

            <!--文献查看   可点击-->
            <div style="margin-top: 24px;text-align: left;margin-left: 8px;">
              <el-button type="primary" plain @click="gotoPaper(tableData01.link)">查看原文</el-button>
            </div>
          </div>
        </el-drawer>

        <div style="position: relative">
          <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 10%;width: 80%;position: relative;">
            <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                       active-text-color="#0079fe" >
                <el-menu-item index="0" style="width: 120px">●论文</el-menu-item>
                <el-menu-item index="1" style="width: 120px">●项目</el-menu-item>
                <el-menu-item index="2" style="width: 120px">●专利</el-menu-item>
              </el-menu>
            </div>
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
              <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in tableData0.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
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

                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(tableData0[index])">
                  <p style="height: 20px" >{{item.msg}}</p>
                </div>

                <div>
                  <div style="position: absolute;left: 5px;top: 130px;">
                    <span v-for="(author_item,author_index) in item.author" :key="author_index" style="margin-left: 15px;">
                      <el-link :underline="false" @click="gotoAuthor(item.authorId[author_index])">
                        {{author_item}}
                      </el-link>
                    </span>
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                    <span>论文</span>
                  </el-tag>
                  <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                    <span> {{item.collectionSum}}</span>
                  </i>
                  <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                    <span> {{item.viewSum}}</span>
                  </i>
                </div>
              </el-card>

              <!--项目-->
              <el-card shadow="hover" v-if="menuIndex === '1'" v-for="(item,index) in tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
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


                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(tableData1[index])">
                  <p style="height: 20px" >{{item.zhAbstract}}</p>
                </div>

                <div>
                  <div style="position: absolute;left: 5px;top: 130px;">
                    <span style="margin-left: 15px;">
                      <el-link :underline="false" @click="gotoAuthor(tableData1[index].authorId)">
                        {{tableData1[index].author}}
                      </el-link>
                    </span>
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                    <span>项目</span>
                  </el-tag>
                  <i class="el-icon-star-on" style="position: absolute;right: 95px;top: 130px">
                    <span> {{item.collectionSum}}</span>
                  </i>
                  <i class="el-icon-view" style="position: absolute;right: 20px;top: 130px">
                    <span> {{item.viewSum}}</span>
                  </i>
                </div>
              </el-card>

              <!--专利-->
              <el-card shadow="hover" v-if="menuIndex === '2'" v-for="(item,index) in tableData2.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
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


                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(tableData2[index])">
                  <p style="height: 20px" >{{item.msg}}</p>
                </div>

                <div>
                  <div style="position: absolute;left: 5px;top: 130px;">
                    <span v-for="(author_item,author_index) in item.author" :key="author_index" style="margin-left: 15px;">
                      <el-link :underline="false" @click="gotoAuthor(item.authorId[author_index])">
                        {{author_item}}
                      </el-link>
                    </span>
                  </div>
                  <el-tag type="info" style="position: absolute;right: 170px;top: 120px;width: 50px;text-align: center;margin-top: 0">
                    <span>专利</span>
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

            <!--专利页码-->
            <div style="margin-top: 30px;margin-bottom: 30px" v-if="menuIndex === '1'">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="tableData1.length"
                prev-text="上一页"
                next-text="下一页">
              </el-pagination>
            </div>

            <!--项目页码-->
            <div style="margin-top: 30px;margin-bottom: 30px" v-if="menuIndex === '2'">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="tableData2.length"
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
        tableData00:{//论文（期刊）
          paperId:'',
          title:'',
          msg:'',
          author: [],
          authorId: [],
          keyword:'',
          fund:'',
          reference:[],
          referenceLink:[],
          institution:[],
          institutionId:[],
          type:"",
          collectStatus: false,
          collectionSum:0,
          viewSum:0,
          link:[],
          collectTime:'',
          paperDoi: '',
          citation: 5, // 引用数量
          paperStart: 0, // 论文开始页
          paperEnd: 4, // 论文结束页
          paperLang: 'en', // 英文
          paperVolume: 3, // 册
          paperIssue: 4, // 期号
          paperPublisher: '',
          paperFos: [], // 学科
          paperVenue: '', // 会议
        },
        tableData01:{//自然基金项目
          paperId:'',
          title:'',
          zhAbstract:'', // 中文摘要
          enAbstract: '', // 英文摘要
          finalAbstract: '结题摘要',
          zhKeywords: '', // 中文关键字
          enKeywords: '', // 英文关键字
          period: '', // 研究期限
          category: '青年科学基金项目', // 项目类别
          year: '', //发表年份
          author: '',
          authorId: '1',
          fund:'', // 基金
          support: '浙江大学', // 支持机构
          collectStatus: true,
          collectionSum:666,
          viewSum:777,
          link:'',
          collectTime:''
        },
        tableData02:{},
        authorTable: [
          {
            name:'Zhang San',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学北京航空航天大学',
            id:'1',
          },{
            name:'Zhang Si',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学1',
            id:'2',
          },{
            name:'Zhang San',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学3',
            id:'3',
          },{
            name:'Zhang San',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学3',
            id:'3',
          },{
            name:'Zhang San',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学3',
            id:'3',
          },{
            name:'Zhang San',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学3',
            id:'3',
          },

        ],
        tableData0: [
          {
            paperId:'1',
            title:'Google1',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            author: ['Li Ming','Zhang San','Clearlove'],
            authorId: ['1','2','3'],
            keyword:'123456',
            fund:'123',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:['北京航空航天大学'],
            institutionId:['1'],
            type:"期刊",
            collectStatus: true,
            collectionSum:6,
            viewSum:7,
            link:['https://www.google.com.hk/','https://www.google.com.hk/'],
            collectTime:'2016-05-04',
            paperDoi: 'doidoi',
            citation: 5, // 引用数量
            paperStart: 0, // 论文开始页
            paperEnd: 4, // 论文结束页
            paperLang: 'en', // 英文
            paperVolume: 3, // 册
            paperIssue: 4, // 期号
            paperPublisher: '工业出版社',
            paperFos: ['1','2'], // 学科
            paperVenue: '456', // 会议
          },
        ],
        tableData1: [ // 国家自然基金项目
          {
            paperId:'1',
            title:'Google1',
            zhAbstract:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            // 中文摘要
            enAbstract: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // 英文摘要
            finalAbstract: '结题摘要',
            zhKeywords: '', // 中文关键字
            enKeywords: '', // 英文关键字
            period: '', // 研究期限
            category: '青年科学基金项目', // 项目类别
            year: '', //发表年份
            author: 'Clearlove',
            authorId: '1',
            fund:'23万', // 基金
            support: '浙江大学', // 支持机构
            collectStatus: true,
            collectionSum:666,
            viewSum:777,
            link:'https://www.google.com.hk/',
            collectTime:'2016-05-04'
          },
        ],
        tableData2: [
          {
            paperId:'2',
            title:'Google2',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字2',
            author:['Li Ming','Zhang San'],
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
            type:"会议",
            collectStatus: true,
            collectionSum:666,
            viewSum:777,
            link:'https://www.youtube.com/',
            collectTime:'2016-05-04'
          }],
        hotData: [
          {
            paperId:'1',
            title:'Google1',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            author: ['Li Ming','Zhang San'],
            authorId: ['1','2'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
            type:"期刊",
            collectStatus: true,
            collectionSum:6,
            viewSum:7,
            link:'https://www.google.com.hk/',
            collectTime:'2016-05-04'
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
        axios.post(baseUrl+'/getMyCollection',{
          userId:localStorage.getItem('myId')
        }).then(function (response) {
          this.tableData0=response.data.list0;
          this.tableData1=response.data.list1;
          this.tableData2=response.data.list2;
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
        window.open(url,url)
      },

      gotoAuthor(authorId) {
        window.open(webUrl+'PersonalPortal');
        localStorage.setItem('authorId',authorId);
      },

      gotoInstitution(institutionId){
        window.open(webUrl+'ResearchInstitute');
        localStorage.setItem('institutionId',institutionId);
      },

      deleteCollection (index, paperId) {
        //发送请求
        axios.post(baseUrl+'/cancelCollection',{
          userId:localStorage.getItem('myId'),
          paperId: paperId
        }).then(function (response) {
          if (response.data.succeed===true) {
            this.$message({
              showClose: true,
              message: '取消收藏成功',
              type: 'success'
            });
            if (this.menuIndex === '0') {
              this.tableData1.splice(index, 1);
            } else if (this.menuIndex === '1') {
              this.tableData2.splice(index, 1);
            } else if (this.menuIndex === '2') {
              this.tableData2.splice(index, 1);
            }
          } else {
            this.$message({
              showClose: true,
              message: '取消收藏失败，请重试',
              type: 'error'
            });
          }
        })
        // this.reload();
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
