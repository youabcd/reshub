<template>
  <div>
    <TopBar></TopBar>
    <!--    <SearchBox v-on:searchEvent="search" style="position: relative;top: -15px"></SearchBox>-->
    <el-container style="height: 100%" >
      <el-aside width="15%" style="height: 100%">
        <div style="width: 12%;display: inline;">
          <h5>学科</h5>
          <el-menu>
            <el-checkbox-group v-model="checkedSubject" >
              <div class="checkBox">
                <el-checkbox v-for="Subject in subjectOptions" :label="Subject" :key="Subject" class="checkBox">{{Subject}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </el-menu>
        </div>

        <div style="width: 12%;display: inline;">
          <h5>作者</h5>
          <el-menu>
            <el-checkbox-group v-model="checkedAuthor" >
              <div class="checkBox">
                <el-checkbox v-for="Author in authorOptions" :label="Author" :key="Author" class="checkBox">{{Author}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </el-menu>
        </div>
        <div style="width: 12%;display: inline;">
          <h5>年限</h5>
          <el-menu>
            <el-checkbox-group v-model="checkedTime" >
              <div class="checkBox">
                <el-checkbox v-for="Time in timeOptions" :label="Time" :key="Time" class="checkBox">{{Time}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </el-menu>
        </div>
        <div style="margin-top: 30px">
          <el-button type="primary" plain>筛选</el-button>
          <el-button type="danger" :disabled="checkedSubject.length === 0 && checkedAuthor.length === 0 && checkedTime.length === 0" plain @click="clearList">重置</el-button>
        </div>
      </el-aside>

      <div style="width: 85%;margin-left: 7px;margin-top: 30px">

        <el-drawer
          :visible.sync="drawer"
          :direction="direction"
          v-if="drawer">
          <!--文章标题-->
          <div style="margin-top: -10px;font-size: 30px;">
            {{tableData.title}}
          </div>
          <!--作者 可点击-->
          <div style="margin-top: 15px;">
            <el-link v-for="(item,index) in tableData.author" type="primary" :underline="false" @click="gotoAuthor(tableData.authorId[index])">{{item}}&nbsp;&nbsp;&nbsp;</el-link>
          </div>
          <!--机构 可点击-->
          <div style="margin-top: 10px;">
            <el-link type="primary" :underline="false" >{{tableData.title}}</el-link>
          </div>
          <!--摘要-->
          <div style="margin-top: 15px;text-align: left;margin-left: 5px;">
            <span>摘要：</span>
            <span>{{tableData.msg}}</span>
          </div>
          <!--关键词-->
          <div style="margin-top: 15px;text-align: left;margin-left: 5px;">
            <span>关键词：</span>
            <span>{{tableData.paperId}}</span>
          </div>
          <!--基金资助-->
          <div></div>
          <!--文献查看  分享推荐等图标  可点击-->
          <div style="margin-top: 24px;">
            <van-row>
              <van-col span="4">
                <el-button type="primary" style="margin-left: 10px;" plain @click="gotoPaper(tableData.link)">查看原文</el-button>
              </van-col>
              <van-col span="10"></van-col>
              <van-col span="10" style="margin-top: -8px;">
                <!--收藏-->
                <span>
                    <el-tooltip v-if="tableData.collectStatus === false" class="item" effect="dark" content="收藏">
                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="addCollection(tableData.paperId)"></i>
                    </el-tooltip>
                </span>
                <span>
                    <el-tooltip v-if="tableData.collectStatus === true" class="item" effect="dark" content="已收藏">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px"></i>
                    </el-tooltip>
                </span>
                <!--微博-->
                <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(tableData.link,tableData.title)" style="height: 20px;">
                </span>
                <!--微信-->
                <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(tableData.link)" style="height: 20px;">
                </span>
                <!--复制连接-->
                <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="tableData.link" @click="Copy"></i>
                    </el-tooltip>
                </span>
              </van-col>
            </van-row>
          </div>
        </el-drawer>

        <div style="position: relative">
          <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 0;width: 77%;position: relative;">
            <div>
              <div v-if="authorTable.length !== 0"  style="text-align: left;margin-left: 20px">
                <h4>学者推荐</h4>
              </div>
              <div v-if="authorTable.length !== 0"  style="text-align: left;">
                <div v-for="(item,index) in authorTable" :key="index" style="margin-bottom: 10px;margin-right: 10px;vertical-align: top;padding: 10px;width: 200px;height: 90px;text-align: left;border: solid 2px #e9e9e9;border-radius: 10px;display:inline-block;">
                  <div>
                    <el-link :href="item.link" target="_blank">
                      {{item.name}}
                    </el-link>
                  </div>
                  <div style="margin-top: 10px">
                    <el-link :href="item.link" target="_blank">
                      {{item.institution}}
                    </el-link>
                  </div>
                </div>
              </div>
            </div>


            <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                       active-text-color="#0079fe" >
                <el-menu-item index="0" style="width: 120px">●全部</el-menu-item>
                <el-menu-item index="1" style="width: 120px">●论文</el-menu-item>
                <el-menu-item index="2" style="width: 120px">●专利</el-menu-item>
                <el-menu-item index="3" style="width: 120px">●项目</el-menu-item>
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

              <!--全部-->
              <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in tableData0.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
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

              <!--论文-->
              <el-card shadow="hover" v-if="menuIndex === '1'" v-for="(item,index) in tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
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

                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(tableData1[index])">
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

              <!--专利-->
              <el-card shadow="hover" v-if="menuIndex === '2'" v-for="(item,index) in tableData2.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
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

              <!--项目-->
              <el-card shadow="hover" v-if="menuIndex === '3'" v-for="(item,index) in tableData3.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
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


                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(tableData3[index])">
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
            </div>

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

            <div style="margin-top: 30px;margin-bottom: 30px" v-if="menuIndex === '3'">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="tableData3.length"
                prev-text="上一页"
                next-text="下一页">
              </el-pagination>
            </div>

          </div>

          <div style="position: absolute;left: 78%;top: 0;width: 21%;display: inline;">
            <p style="font-family: '微软雅黑', sans-serif;font-weight: bold;margin-bottom: 23px">🔥热点</p>
            <el-card class="box-card" shadow="hover" v-for="(item,index) in hotData" :key="index" style="height: 160px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4">
              <!--              <div >-->
              <div style="text-align: left;margin-top: -20px;cursor: pointer">
                <p style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">{{item.title}}</p>
              </div>

              <div style="text-align: left">
                <p style="height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.msg}}</p>
              </div>

              <div>
                <div style="margin-top: 30px;text-align: left">
                    <span v-for="(author_item,author_index) in item.author" :key="author_index" style="margin-left: 15px;position: relative;right: 15px">
                      <el-link :underline="false">
                        {{author_item}}
                      </el-link>
                    </span>
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
      </div>
    </el-container>
  </div>
</template>

<script>
  import TopBar from "./TopBar";
  import BottomBar from "./BottomBar";
  import SearchBox from "./SearchBox";
  import Clipboard from 'clipboard';
  import axios from 'axios';
  import baseUrl from "./baseUrl";
  import webUrl from "./webUrl";
  export default {
    name: "SearchResult",
    components:{
      TopBar,
      BottomBar,
      SearchBox
    },
    data() {
      return {
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
        tableData:{
          paperId:'',
          title:'',
          msg:'',
          author:[],
          authorId:[],
          keyword:'',
          fund:'',
          reference:[],
          referenceLink:[],
          institution:[],
          institutionId:[],
          type:'',
          collectStatus: false,
          collectionSum:0,
          viewSum:0,
          link:'',
          collectTime:''
        },
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
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
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
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
            type:"报告",
            collectStatus: false,
            collectionSum:6666,
            viewSum:7777,
            link:'https://www.google.com/',
            collectTime:'2016-05-04'
          }],
        tableData1: [
          {
            paperId:'1',
            title:'Google1',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            author:['Li Ming','Zhang San','Clearlove'],
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
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
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceId:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionLink:[],
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
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
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
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
            type:"报告",
            collectStatus: false,
            collectionSum:666,
            viewSum:777,
            link:'https://www.google.com/',
            collectTime:'2016-05-04'
          }],
        hotData: [
          {
            paperId:'1',
            title:'Google1',
            msg:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            author: ['Li Ming','Zhang San'],
            authorId: ['1','2','3'],
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
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
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
            authorId: ['1','2','3'],
            keyword:'',
            fund:'',
            reference:['1','2','3'],
            referenceLink:['https://www.bilibili.com','https://www.baidu.com','https://www.qq.com'],
            institution:[],
            institutionId:[],
            type:"报告",
            collectStatus: false,
            collectionSum:6666,
            viewSum:7777,
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
        this.currentPage = 1;
      },

      gotoPaper(url) {
        //发送点击数据
        window.open(url,url)
      },

      gotoAuthor(authorId) {
        window.open(webUrl+'/PersonalPortal');
        localStorage.setItem('authorId',authorId);
      },

      addCollection(index) {
        //发送数据
        console.log(1);
        if (this.menuIndex === '0') {
          let temp = this.tableData0[index];
          if (temp.type === "期刊") {
            for (let i=0; i<this.tableData1.length; i++) {
              if (temp.paperId === this.tableData1[i].paperId) {
                this.tableData1[i].collectStatus=true;
                break;
              }
            }
          } else if (temp.type === "会议") {
            for (let i=0; i<this.tableData2.length; i++) {
              if (temp.paperId === this.tableData2[i].paperId) {
                this.tableData2[i].collectStatus=true;
                break;
              }
            }
          } else if (temp.type === "报告") {
            for (let i=0; i<this.tableData3.length; i++) {
              if (temp.paperId === this.tableData3[i].paperId) {
                this.tableData3[i].collectStatus=true;
                break;
              }
            }
          }
          this.tableData0[index].collectStatus=true;
        } else if (this.menuIndex === '1') {
          let temp = this.tableData1[index];
          for (let i=0; i<this.tableData0.length; i++) {
            if (temp.paperId === this.tableData0[i].paperId) {
              this.tableData0[i].collectStatus=true;
              break;
            }
          }
          this.tableData1[index].collectStatus=true;
        } else if (this.menuIndex === '2') {
          let temp = this.tableData2[index];
          for (let i=0; i<this.tableData0.length; i++) {
            if (temp.paperId === this.tableData0[i].paperId) {
              this.tableData0[i].collectStatus=true;
              break;
            }
          }
          this.tableData2[index].collectStatus=true;
        } else if (this.menuIndex === '3') {
          let temp = this.tableData3[index];
          for (let i=0; i<this.tableData0.length; i++) {
            if (temp.paperId === this.tableData0[i].paperId) {
              this.tableData0[i].collectStatus=true;
              break;
            }
          }
          this.tableData3[index].collectStatus=true;
        }
        this.$message({
          showClose: true,
          message: '收藏成功',
          type: 'success'
        });
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
        this.tableData=list;
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
