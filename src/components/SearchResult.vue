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
                <el-checkbox v-for="(Author,index) in authorTable" :label="Author.id" :key="index" class="checkBox">{{Author.name}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </el-menu>
        </div>
        <div style="width: 12%;display: inline;margin-left: 3px;">
          <h5>年限</h5>
          <div>
            <van-row>
              <van-col span="11">
                <span>起始</span>
              </van-col>
              <van-col span="2" style="font-size: 20px;">-</van-col>
              <van-col span="11">
                终止
              </van-col>
            </van-row>
            <van-row>
              <van-col span="11">
                <el-autocomplete
                  class="inline-input"
                  v-model="dataStart"
                  :fetch-suggestions="querySearch"
                  placeholder="输入起始年"
                ></el-autocomplete>
              </van-col>
              <van-col span="2" style="font-size: 20px;margin-top: 8px;">-</van-col>
              <van-col span="11">
                <div>
                  <el-autocomplete
                    class="inline-input"
                    v-model="dataEnd"
                    :fetch-suggestions="querySearch"
                    placeholder="输入终止年"
                  ></el-autocomplete>
                </div>
              </van-col>
            </van-row>
          </div>

        </div>
        <div style="margin-top: 30px">
          <el-button type="primary" plain @click="filter">筛选</el-button>
          <el-button type="danger" :disabled="checkedSubject.length === 0 && checkedAuthor.length === 0 &&dataStart.length===0&&dataEnd.length===0" plain @click="clearList">重置</el-button>
        </div>
      </el-aside>

      <div style="width: 85%;margin-left: 7px;margin-top: 30px">

        <el-drawer
          :visible.sync="drawer"
          :direction="direction"
          size=750px
          v-if="drawer">
          <div v-if="menuIndex==='0'">
            <!--期刊 期号+文献操作（分享等）-->
            <div style="margin-top: -30px;">
              <van-row>
                <van-col span="6">
                  <span>{{tableData00.paperIssue}}&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tableData00.paperVolume}}&nbsp;&nbsp;</span>
                  <span>{{tableData00.paperStart}}-{{tableData00.paperEnd}}</span>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="10" style="margin-top: -8px;">
                  <!--收藏-->
                  <span>
                    <el-tooltip v-if="tableData00.collectStatus === true" class="item" effect="dark" content="取消收藏" placement="bottom">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(0)"></i>
                    </el-tooltip>
                    <el-tooltip v-if="tableData00.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom">
                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="Collection(0)"></i>
                    </el-tooltip>
                  </span>
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
          <div class="Details" style="">
            <span style="font-family: 黑体;font-weight: 700">摘要：</span>
            <span>{{tableData00.msg}}</span>
          </div>
          <!--关键词-->
          <div class="Details" style="">
            <span style="font-family: 黑体;font-weight: 700">关键词：</span>
            <span>{{tableData00.keyword}}</span>
          </div>
            <!--DOI-->
            <div v-if="tableData00.paperDoi.length>0" class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">DOI：</span>
              <span>{{tableData00.paperDoi}}</span>
            </div>
            <!--学科-->
            <div v-if="tableData00.paperFos.length>0" class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">学科：</span>
              <span><el-link v-for="(item,index) in tableData00.paperFos" :key="index" type="primary" :underline="false">
              {{item}}&nbsp;&nbsp;&nbsp;
            </el-link></span>
            </div>
            <!--会议-->
            <div v-if="tableData00.paperVenue.length>0" class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">会议：</span>
              <span>{{tableData00.paperVenue}}</span>
            </div>
            <!--各类次数-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">被引次数：</span>
              <span>{{tableData00.citation}}</span>
              <span style="font-family: 黑体;font-weight: 700;margin-left: 10px;">收藏次数：</span>
              <span>{{tableData00.collectionSum}}</span>
              <span style="font-family: 黑体;font-weight: 700;margin-left: 10px;">浏览次数：</span>
              <span>{{tableData00.viewSum}}</span>
            </div>
            <!--出版-->
            <div v-if="tableData00.paperPublisher.length>0" class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">出版社：</span>
              <span>{{tableData00.paperPublisher}}</span>
            </div>
          <!--参考文献 clickable-->
          <div class="Details" style="">
            <span style="font-family: 黑体;font-weight: 700">参考文献：</span>
            <span><el-link v-for="(item,index) in tableData00.reference" :key="index" type="primary" :underline="false" @click="gotoPaper(tableData00.referenceLink[index])">
              {{item}}&nbsp;&nbsp;&nbsp;
            </el-link></span>
          </div>
          <!--文献查看  可点击-->
          <div class="Details" style="">
            <span style="font-family: 黑体;font-weight: 700">查看原文：</span>
            <el-link v-for="(item,index) in tableData00.link" :key="index" type="primary" :underline="false" @click="gotoPaper(tableData00.link[index])">
              {{item}}&nbsp;&nbsp;&nbsp;
            </el-link>
          </div>
          </div>
          <div v-if="menuIndex==='1'">
            <!--项目类型+发表年份+文献操作（分享等）-->
            <div style="margin-top: -30px;">
              <van-row>
                <van-col span="6">
                  <span>{{tableData01.category}}&nbsp;&nbsp;&nbsp;</span>
                  <span>{{tableData01.year}}</span>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="10" style="margin-top: -8px;">
                  <span>
                    <el-tooltip v-if="tableData01.collectStatus === true" class="item" effect="dark" content="取消收藏" placement="bottom">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(1)"></i>
                    </el-tooltip>
                    <el-tooltip v-if="tableData01.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom">
                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="Collection(1)"></i>
                    </el-tooltip>
                  </span>
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
              {{tableData01.authorTitle}}:
              <el-link type="primary" :underline="false" @click="gotoAuthor(tableData01.authorId)">
                {{tableData01.author}}
              </el-link>
            </div>
            <!--机构-->
            <div style="margin-top: 10px;">
              {{tableData01.support}}
            </div>
            <!--摘要-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">摘要：</span>
              <span>{{tableData01.zhAbstract}}</span>
            </div>
            <!--english摘要-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">Abstract:</span>
              <span>{{tableData01.enAbstract}}</span>
            </div>
            <!--结题摘要-->
            <div v-if="tableData01.finalAbstract.length>0" class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">结题摘要：</span>
              <span>{{tableData01.finalAbstract}}</span>
            </div>
            <!--关键词-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">关键词：</span>
              <span>{{tableData01.zhKeywords}}</span>
            </div>
            <!--关键词-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">Keywords:</span>
              <span>{{tableData01.enKeywords}}</span>
            </div>
            <!--基金资助-->
            <div v-if="tableData01.fund.length>0" class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">基金资助：</span>
              <span>{{tableData01.fund}}</span>
            </div>
            <!--各类次数-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700;">收藏次数：</span>
              <span>{{tableData01.collectionSum}}</span>
              <span style="font-family: 黑体;font-weight: 700;margin-left: 10px;">浏览次数：</span>
              <span>{{tableData01.viewSum}}</span>
            </div>

            <!--文献查看   可点击-->
            <div class="Details" style="">
              <el-button type="primary" plain @click="gotoPaper(tableData01.link)">查看原文</el-button>
            </div>
          </div>
          <div v-if="menuIndex==='2'">
            <!--日期+文献操作（分享等）-->
            <div style="margin-top: -30px;">
              <van-row>
                <van-col span="6">
                  <span>{{tableData02.date}}</span>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="10" style="margin-top: -8px;">
                  <span>
                    <el-tooltip v-if="tableData02.collectStatus === true" class="item" effect="dark" content="取消收藏" placement="bottom">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(2)"></i>
                    </el-tooltip>
                    <el-tooltip v-if="tableData02.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom">
                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="Collection(2)"></i>
                    </el-tooltip>
                  </span>
                  <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(tableData02.link,tableData02.title)" style="height: 20px;">
                </span>
                  <!--微信-->
                  <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(tableData02.link)" style="height: 20px;">
                </span>
                  <!--复制连接-->
                  <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="tableData02.link" @click="Copy"></i>
                    </el-tooltip>
                </span>
                </van-col>
              </van-row>
            </div>
            <!--文章标题-->
            <div style="margin-top: 10px;font-size: 30px;font-weight: 500;">
              {{tableData02.title}}
            </div>
            <!--作者 可点击-->
            <div style="margin-top: 15px;">
              <el-link type="primary" :underline="false" @click="gotoAuthor(tableData02.authorId)">
                {{tableData02.author}}
              </el-link>
            </div>
            <!--摘要-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700">摘要：</span>
              <span>{{tableData02.abstract}}</span>
            </div>
            <!--专利号-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700;">专利号：</span>
              <span>{{tableData02.paperId}}</span>
            </div>
            <!--各类次数-->
            <div class="Details" style="">
              <span style="font-family: 黑体;font-weight: 700;">收藏次数：</span>
              <span>{{tableData02.collectionSum}}</span>
              <span style="font-family: 黑体;font-weight: 700;margin-left: 10px;">浏览次数：</span>
              <span>{{tableData02.viewSum}}</span>
            </div>

            <!--文献查看   可点击-->
            <div class="Details" style="">
              <el-button type="primary" plain @click="gotoPaper(tableData02.link)">查看原文</el-button>
            </div>
          </div>
        </el-drawer>

        <div style="position: relative">
          <div style="background-color: white;border-width: 1px;border-color: #666666;margin-left: 0;width: 80%;position: relative;">

            <div>
              <van-row>
                <van-col span="12">
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                       active-text-color="#0079fe" >
                    <el-menu-item index="0" style="width: 120px">●论文({{sizeOfTable0}})</el-menu-item>
                    <el-menu-item index="1" style="width: 120px">●项目({{sizeOfTable1}})</el-menu-item>
                    <el-menu-item index="2" style="width: 120px">●专利({{sizeOfTable2}})</el-menu-item>
                  </el-menu>
                </van-col>

                <!--排序-->
                <van-col span="12">
                  <van-row></van-row>
                  <van-row style="margin-top: 30px;">
                    <van-col span="6"></van-col>
                    <van-col span="4" style="font-size: 13px;font-weight: bold;">
                      <span><i class="el-icon-sort"></i></span>
                      <span>排序:</span>
                    </van-col>
                    <van-col span="4" style="font-size: 13px;cursor: pointer;text-align: left" @click="sortDefault">
                      <span v-if="whichSort===0" style="color: #3a8ee6">
                        <span>默认排序</span>
                      </span>
                      <span v-if="whichSort===2||whichSort===1">
                        <span>默认排序</span>
                      </span>
                    </van-col>
                    <van-col span="4" style="font-size: 13px;cursor: pointer;text-align: left" @click="sortByTime">
                      <span v-if="whichSort===1" style="color: #3a8ee6">
                        <span>发表时间</span>
                        <span v-if="changeSortTime%2==0"><i class="el-icon-top"></i></span>
                        <span v-if="changeSortTime%2==1"><i class="el-icon-bottom"></i></span>
                      </span>
                      <span v-if="whichSort===2||whichSort===0">
                        <span>发表时间</span>
                      </span>
                    </van-col>
                    <van-col span="4" style="font-size: 13px;cursor:pointer;text-align: left" @click="sortByCited">
                      <span v-if="whichSort===1||whichSort===0">
                        <span>被引频次</span>
                      </span>
                      <span v-if="whichSort===2" style="color: #3a8ee6">
                        <span>被引频次</span>
                        <span v-if="changeSortCited%2==0"><i class="el-icon-top"></i></span>
                        <span v-if="changeSortCited%2==1"><i class="el-icon-bottom"></i></span>
                      </span>
                    </van-col>
                    <van-col span="2"></van-col>
                  </van-row>
                </van-col>
              </van-row>
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

            <!--中间块-->
            <div>
              <!--等待加载-->
              <div v-if="isLoading" style="margin: 30px;font-size: 50px;">
                <i class="el-icon-loading"></i>
              </div>

              <div v-if="isLoading===false">
              <!--论文-->
                <el-card shadow="hover" v-if="menuIndex === '0'" v-for="(item,index) in tableData0" :key="index"
                       class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer;width: 70%">
                  <span v-if="item.title.length<=40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link[0])">
                    {{item.title}}
                  </span>
                  <span v-if="item.title.length>40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link[0])">
                    {{item.title.substring(0,40)+'...'}}
                  </span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(item.link,item.title)" style="height: 20px;cursor: pointer;">
                  </span>
                  <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(item.link)" style="height: 20px;cursor: pointer;">
                  </span>
                  <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px;cursor: pointer;" :data-clipboard-text="item.link" @click="Copy"></i>
                    </el-tooltip>
                  </span>
                </div>

                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(index)">
                  <p style="height: 20px" v-if="item.msg.length<=120">{{item.msg}}</p>
                  <p style="height: 20px" v-if="item.msg.length>120">{{item.msg.substring(0,120)+'...'}}</p>
                </div>

                  <div style="position: absolute;left: 5px;top: 115px;text-align: left;" v-bind:style="{width: commentWidth+'px'}" class="van-ellipsis">
                    <span style="font-weight: 700;margin-left: 15px">
                      关键词:
                    </span>
                    <span>{{item.keywords}}</span>
                  </div>

                <div>
                  <div style="position: absolute;left: 5px;top: 140px;text-align: left;" v-bind:style="{width: commentWidth+'px'}" class="van-ellipsis">
                    <span v-for="(author_item,author_index) in item.author" :key="author_index" style="margin-left: 15px;">
                        {{author_item}}
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
                <el-card shadow="hover" v-if="menuIndex === '1'" v-for="(item,index) in tableData1" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span v-if="item.title.length<=40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">
                    {{item.title}}
                  </span>
                  <span v-if="item.title.length>40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">
                    {{item.title.substring(0,40)+'...'}}
                  </span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(item.link,item.title)" style="height: 20px;cursor: pointer;">
                  </span>
                  <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(item.link)" style="height: 20px;cursor: pointer;">
                  </span>
                  <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px;cursor: pointer;" :data-clipboard-text="item.link" @click="Copy"></i>
                    </el-tooltip>
                  </span>
                </div>


                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(index)">
                  <p style="height: 20px" v-if="item.zhAbstract.length<=120">{{item.zhAbstract}}</p>
                  <p style="height: 20px" v-if="item.zhAbstract.length>120">{{item.zhAbstract.substring(0,120)+'...'}}</p>
                </div>

                <div>
                  <div style="position: absolute;left: 5px;top: 130px;">
                    <span style="margin-left: 15px;">
                      {{tableData1[index].author}}
                    </span>
                    <span style="font-weight: 700;margin-left: 20px">
                      关键词:
                    </span>
                    <span>{{item.keyword}}</span>
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
                <el-card shadow="hover" v-if="menuIndex === '2'" v-for="(item,index) in tableData2" :key="index" class="text item" style="height: 140px;border-bottom:1px solid #d4dde4;border-top:1px solid #d4dde4;position: relative" >
                <div style="text-align: left;display: inline;position: absolute;left: 20px;top: 20px;cursor: pointer">
                  <span v-if="item.title.length<=40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">
                    {{item.title}}
                  </span>
                  <span v-if="item.title.length>40" style="font-family: '微软雅黑', sans-serif;font-size: 20px;font-weight: bold" @click="gotoPaper(item.link)">
                    {{item.title.substring(0,40)+'...'}}
                  </span>
                </div>
                <div style="display: inline;position: absolute;right: 20px;top: 0">
                  <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(item.link,item.title)" style="height: 20px;cursor: pointer;">
                  </span>
                  <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(item.link)" style="height: 20px;cursor: pointer;">
                  </span>
                  <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px;cursor: pointer;" :data-clipboard-text="item.link" @click="Copy"></i>
                    </el-tooltip>
                  </span>
                </div>


                <div style="text-align: left;position: absolute;top: 60px;width: 96%;cursor: pointer;" @click="open(index)">
                  <p style="height: 20px" v-if="item.abstract.length<=120">{{item.abstract}}</p>
                  <p style="height: 20px" v-if="item.abstract.length>120">{{item.abstract.substring(0,120)+'...'}}</p>
                </div>

                <div>
                  <div style="position: absolute;left: 5px;top: 130px;">
                    <span style="margin-left: 15px;">
                        {{item.author}}
                    </span>
                    <span style="font-weight: 700;margin-left: 20px">
                      关键词:
                    </span>
                    <span>{{item.keyword}}</span>
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
            </div>

            <!--论文页码-->
            <div style="margin-top: 30px;margin-bottom: 30px" v-if="menuIndex === '0'">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="sizeOfTable0"
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
                :total="sizeOfTable1"
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
                :total="sizeOfTable2"
                prev-text="上一页"
                next-text="下一页">
              </el-pagination>
            </div>

          </div>

          <div style="position: absolute;left: 81%;top: 0;width: 18%;display: inline;">
            <div>
              <div>
                <h4>学者推荐</h4>
              </div>
              <div v-if="authorTable.length !== 0"  style="text-align: left;">
                <div v-for="(item,index) in authorTable" :key="index" style="margin-bottom: 10px;margin-right: 10px;vertical-align: top;padding: 10px;width: 200px;height: 90px;text-align: left;border: solid 2px #e9e9e9;border-radius: 10px;display:inline-block;">
                  <div>
                    <i class="el-icon-user"></i>
                    <el-link :href="item.link" target="_blank" style="font-size: 18px">
                      {{item.name}}
                    </el-link>
                  </div>
                  <div style="margin-top: 10px;position: relative">
                    <div style="position: absolute;float: left">
                      <i class="el-icon-house"></i>
                    </div>
                    <div style="position: absolute;float: right;left: 20px">
                      <span>
                      <el-link :href="item.link" target="_blank">
                        {{item.institution}}
                      </el-link>
                    </span>
                    </div>


                  </div>
                </div>
              </div>
            </div>
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
        commentWidth:'620',
        changeSortTime:0,
        changeSortCited:0,
        whichSort:0,
        isLoading:false,
        sizeOfTable0:0,
        sizeOfTable1:0,
        sizeOfTable2:0,
        QRlink:'',
        dataStart:'',
        dataEnd:'',
        years:[],
        drawer: false,
        direction: 'rtl',
        currentPage: 1,
        pageSize: 10,
        btnFlag: false,
        dialogVisible: false,
        keyWords:'',
        activeIndex: "0",
        menuIndex: "0",
        subjectOptions : ['人工智能', '软件工程', '操作系统'],
        authorOptions : ['Zhang San', 'Li Ming'],
        timeOptions : ['1990', '2000', '2010', '2020'],
        checkedSubject: [],
        checkedAuthor: [],
        tableData00:{//论文（期刊）
          paperId:'',
          title:'',
          msg:'',
          author: [],
          authorOrg:[],
          authorId: [],
          keywords:'',
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
          authorTitle:'组长',
          authorId: '1',
          fund:'', // 基金
          support: '浙江大学', // 支持机构
          collectStatus: true,
          collectionSum:666,
          viewSum:777,
          link:'',
          collectTime:''
        },
        //专利
        tableData02:{
          id:123,
          paperId:'2',
          title:'Google2',
          viewSum:777,
          link:'https://www.youtube.com/',
          collectionSum:666,
          isUserUpload:1,
          abstract:'文字文字字文字zhaiyao文字文字文字文字2',
          date:new Date(),
          author:'niubility',
          authorId: '2333',
          type:"专利",
          collectStatus: true,
          collectTime:'2016-05-04'
        },
        authorTable: [
          {
            name:'Zhang San',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学北京航空航天大学',
            id:'1',
          },
          {
            name:'Zhang Si',
            link:'https://www.bilibili.com',
            institution:'北京航空航天大学1',
            id:'2',
          },
        ],
        tableData0: [
          {
            paperId:'1',
            title:'',
            msg:'',
            author: ['Li Ming','Zhang San','Clearlove'],
            authorOrg:[],
            authorId: ['1','2','3'],
            keywords:'123456',
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
            paperVenue: '456', // 会议*/
          },
        ],
        tableData1: [ // 国家自然基金项目
          {
            paperId:'1',
            title:'Google1',
            zhAbstract:'GGG文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字1',
            // 中文摘要
            enAbstract: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // 英文摘要
            finalAbstract: '结题摘要',
            zhKeywords: '', // 中文关键字
            enKeywords: '', // 英文关键字
            period: '', // 研究期限
            category: '青年科学基金项目', // 项目类别
            year: '', //发表年份
            author: 'Clearlove',
            authorTitle:'组长',
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
            id:123,
            paperId:'2',
            title:'Google2',
            viewSum:777,
            link:'https://www.youtube.com/',
            collectionSum:666,
            isUserUpload:1,
            abstract:'文字文字字文字zhaiyao文字文字文字文字2',
            date:new Date(),
            author:'niubility',
            authorId: '2333',
            type:"专利",
            collectStatus: true,
            collectTime:'2016-05-04',
          }],
      }
    },
    created() {
    },
    mounted () {
      window.addEventListener('scroll', this.scrollToTop);
      this.search(localStorage.getItem("keyWords"));
      this.keyWords=localStorage.getItem("keyWords");
      this.isLoading=true;
      this.getTable00(1);
      this.loadYear();
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      //获取数据
      getTable00(page){
        let _this=this;
        _this.isLoading=true;
        axios.get(baseUrl+'/searchWords',{
          params:{
            'keyWords':(localStorage.getItem("keyWordsList")),
            'dateStart':localStorage.getItem("dateStart"),
            'dateEnd':localStorage.getItem("dateEnd"),
            'Radio':localStorage.getItem("Radio"),
            'page':page,
            'type':'paper',
          }
        })
          .then(function (response) {
            console.log(response);
            _this.tableData0=response.data.result;
            _this.sizeOfTable0=response.data.num;
            _this.isLoading=false;
          })
      },
      getTable0(page){
        let _this=this;
        _this.backTop();
        _this.isLoading=true;
        axios.get(baseUrl+'/searchWords',{
          params:{
            'keyWords':(localStorage.getItem("keyWordsList")),
            'dateStart':localStorage.getItem("dateStart"),
            'dateEnd':localStorage.getItem("dateEnd"),
            'Radio':localStorage.getItem("Radio"),
            'page':page,
            'type':'paper',
          }
        })
        .then(function (response) {
          console.log(response);
          _this.tableData0=response.data.result;
          _this.sizeOfTable0=response.data.num;
          _this.isLoading=false;
        })
      },
      getTable1(page){
        let _this=this;
        _this.isLoading=true;
        axios.get(baseUrl+'/searchWords',{
          params:{
            'keyWords':(localStorage.getItem("keyWordsList")),
            'dateStart':localStorage.getItem("dateStart"),
            'dateEnd':localStorage.getItem("dateEnd"),
            'Radio':localStorage.getItem("Radio"),
            'page':page,
            'type':'project',
          }
        })
          .then(function (response) {
            console.log(response);
            _this.tableData1=response.data.result;
            _this.sizeOfTable1=response.data.num;
            _this.isLoading=false;
          })
      },
      getTable2(page){
        let _this=this;
        _this.isLoading=true;
        axios.get(baseUrl+'/searchWords',{
          params:{
            'keyWords': localStorage.getItem("keyWordsList"),
            'dateStart':localStorage.getItem("dateStart"),
            'dateEnd':localStorage.getItem("dateEnd"),
            'Radio':localStorage.getItem("Radio"),
            'page':page,
            'type':'patent',
          }
        })
          .then(function (response) {
            console.log(response);
            _this.tableData2=response.data.result;
            _this.sizeOfTable2=response.data.num;
            _this.isLoading=false;
          })
      },

      //取消/收藏
      deleteCollection(i){
        if(i===0){
          let _this=this;
          let data = new FormData();
          data.append('userId',localStorage.getItem("myId"));
          data.append('paperId',_this.tableData00.paperId);
          data.append('type', 'paper');
          axios.post(baseUrl+'/cancelCollection',data)
          .then(function (response) {
            console.log(response);
            if(response.data.status===true){
              _this.tableData00.collectStatus=false;
            }
            else{
              console.log('失败')
            }
          })
        }
        else if(i===1){
          let _this=this;
          let data = new FormData();
          data.append('userId',localStorage.getItem("myId"));
          data.append('paperId',_this.tableData01.paperId);
          data.append('type', 'project');
          axios.post(baseUrl+'/cancelCollection',data)
            .then(function (response) {
              console.log(response);
              if(response.data.status===true){
                _this.tableData01.collectStatus=false;
              }
              else{
                console.log('失败')
              }
            })
        }
        else{
          let _this=this;
          let data = new FormData();
          data.append('userId',localStorage.getItem("myId"));
          data.append('paperId',_this.tableData02.id);
          data.append('type', 'patent');
          axios.post(baseUrl+'/cancelCollection',data)
            .then(function (response) {
              console.log(response);
              if(response.data.status===true){
                _this.tableData02.collectStatus=false;
              }
              else{
                console.log('失败')
              }
            })
        }
      },
      Collection(i){
        if(i===0){
          let _this=this;
          let data = new FormData();
          data.append('userId',localStorage.getItem("myId"));
          data.append('paperId',_this.tableData00.paperId);
          data.append('type', 'paper');
          axios.post(baseUrl+'/cancelCollection',data)
            .then(function (response) {
              console.log(response);
              if(response.data.status===true){
                _this.tableData00.collectStatus=true;
              }
              else{
                console.log('失败')
              }
            })
        }
        else if(i===1){
          let _this=this;
          let data = new FormData();
          data.append('userId',localStorage.getItem("myId"));
          data.append('paperId',_this.tableData01.paperId);
          data.append('type', 'project');
          axios.post(baseUrl+'/cancelCollection',data)
            .then(function (response) {
              console.log(response);
              if(response.data.status===true){
                _this.tableData01.collectStatus=true;
              }
              else{
                console.log('失败')
              }
            })
        }
        else{
          let _this=this;
          let data = new FormData();
          data.append('userId',localStorage.getItem("myId"));
          data.append('paperId',_this.tableData02.id);
          data.append('type', 'patent');
          axios.post(baseUrl+'/cancelCollection',data)
            .then(function (response) {
              console.log(response);
              if(response.data.status===true){
                _this.tableData02.collectStatus=true;
              }
              else{
                console.log('失败')
              }
            })
        }
      },

      //排序
      sortDefault(){
        let _this=this;
        _this.whichSort=0;
        axios.get(baseUrl+'sort',{
          params:{
            'sortType':0,//默认排序
            'howSort':-1,
          }
        }).then(function (response) {
        })
      },
      sortByTime(){
        let _this=this;
        _this.changeSortTime++;
        _this.whichSort=1;
        axios.get(baseUrl+'sort',{
          params:{
            'sortType':1,//按时间排序
            'howSort':_this.changeSortTime%2,//0为升序 1为降序
          }
        }).then(function (response) {
        })
      },
      sortByCited(){
        let _this=this;
        _this.changeSortCited++;
        _this.whichSort=2;
        axios.get(baseUrl+'sort',{
          params:{
            'sortType':2,//按被引频次排序
            'howSort':_this.changeSortCited%2,//0为升序 1为降序
          }
        }).then(function (response) {
        })
      },

      //年限选择
      querySearch(queryString, cb) {
        var years = this.years;
        var results = queryString ? years.filter(this.createFilter(queryString)) : years;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (year) => {
          return (year.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadYear(){
        for(var i=1900;i<=2020;i++){
          this.years.push({"value":i.toString()});
        }
      },

      handleSizeChange: function(size) {
        this.pageSize = size;
      },
      //点击第几页
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        if(this.menuIndex=='0'){
          this.getTable0(currentPage);
        }
        else if(this.menuIndex=='1'){
          this.getTable1(currentPage);
        }
        else{
          this.getTable2(currentPage);
        }
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
        if(key=='0'){
          this.getTable0(1);
        }
        else if(key=='1'){
          this.getTable1(1);
        }
        else{
          this.getTable2(1);
        }
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

      open(index) {
        let _this=this;
        _this.drawer=true;
        if(this.menuIndex==='0'){
          this.tableData00=this.tableData0[index];
          let data = new FormData();
          data.append('userId',localStorage.getItem('myId'));
          data.append('id', _this.tableData00.paperId);
          data.append('type', 'paper');
          axios.post(baseUrl+'/openPaper',data)
          .then(function (response) {
            console.log(response);
            _this.tableData00=response.data;
            _this.tableData0[index]=response.data;
          })
        }
        else if(this.menuIndex==='1'){
          this.tableData01=this.tableData1[index];
          let data = new FormData();
          data.append('userId',localStorage.getItem('myId'));
          data.append('id', _this.tableData01.paperId);
          data.append('type', 'project');
          axios.post(baseUrl+'/openPaper',data)
            .then(function (response) {
              console.log(response);
              _this.tableData01=response.data;
              _this.tableData1[index]=response.data;
            })
        }
        else if(this.menuIndex==='2'){
          this.tableData02=this.tableData2[index];
          let data = new FormData();
          data.append('userId',localStorage.getItem('myId'));
          data.append('id', _this.tableData02.paperId);
          data.append('type', 'patent');
          axios.post(baseUrl+'/openPaper',data)
            .then(function (response) {
              console.log(response);
              _this.tableData02=response.data;
              _this.tableData2[index]=response.data;
            })
        }
      },

      clearList() {
        this.checkedSubject = [];
        this.checkedAuthor = [];
        this.dataStart='';
        this.dataEnd='';
      },

      filter() {
        let _this=this;
        let type='';
        if(_this.menuIndex==='0'){
          type='paper';
        }
        else if(_this.menuIndex==='1'){
          type='project';
        }
        else if(_this.menuIndex==='2'){
          type='patent';
        }
        axios.get(baseUrl+'/filter',{
          params:{
            'keyWords':(localStorage.getItem("keyWordsList")),
            'dateStart':_this.dataStart,
            'dateEnd':_this.dataEnd,
            'checkedSubject':_this.checkedSubject,
            'checkedAuthor':_this.checkedAuthor,
            'type':type,
          }
        })
          .then(function (response) {
            console.log(response);
            if(type==='paper'){
              _this.tableData0=response.data.tableData0;
            }
            else if(type==='project'){
              _this.tableData1=response.data.tableData1;
            }
            else if(type==='patent'){
              _this.tableData2=response.data.tableData2;
            }
          })
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

  .Details{
    margin-top: 15px;
    text-align: left;
    margin-left: 30px;
    margin-right: 30px;
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
