<template>
  <div>
    <div v-if="menuIndex==='0'">
      <!--期刊 期号+文献操作（分享等）-->
      <div style="margin-top: 20px;">
        <van-row>
          <van-col span="6">
            <span>{{tableData00.paperIssue}}&nbsp;&nbsp;&nbsp;</span>
            <span>{{tableData00.paperVolume}}&nbsp;&nbsp;</span>
            <span>{{tableData00.paperStart}}-{{tableData00.paperEnd}}</span>
          </van-col>
          <van-col span="8"></van-col>
          <van-col span="10" style="margin-top: -8px;">
            <!--收藏-->
            <span v-if="myId.length>0">
                    <el-tooltip v-if="tableData00.collectStatus === true>0" class="item" effect="dark" content="取消收藏" placement="bottom">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(tableData00)"></i>
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
            <span v-for="(item,index) in tableData00.author" :key="index">
              <el-link v-if="tableData00.authorId[index].length>0" type="primary" :underline="false" @click="gotoAuthor(tableData00.authorId[index])">
                {{item}}&nbsp;&nbsp;&nbsp;
              </el-link>
              <span v-if="tableData00.authorId[index].length===0">{{item}}&nbsp;&nbsp;&nbsp;</span>
            </span>
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
        <span>{{tableData00.keywords}}</span>
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
      <div v-if="tableData00.reference.length>0" class="Details" style="">
        <span style="font-family: 黑体;font-weight: 700">参考文献：</span>
        <span><el-link v-for="(item,index) in tableData00.reference" :key="index" type="primary" :underline="false" @click="gotoPaper(tableData00.referenceLink[index],-1)">
              {{item}}&nbsp;&nbsp;&nbsp;
            </el-link></span>
      </div>
      <!--文献查看  可点击-->
      <div class="Details" style="margin-bottom: 20px;">
        <span style="font-family: 黑体;font-weight: 700">查看原文：</span>
        <el-link v-for="(item,index) in tableData00.link" :key="index" type="primary" :underline="false" @click="gotoPaper(tableData00.link[index],tableData00.paperId)">
          {{item}}&nbsp;&nbsp;&nbsp;
        </el-link>
      </div>
    </div>
    <div v-if="menuIndex==='1'">
      <!--项目类型+发表年份+文献操作（分享等）-->
      <div style="margin-top: 20px;">
        <van-row>
          <van-col span="6">
            <span>{{tableData01.category}}&nbsp;&nbsp;&nbsp;</span>
            <span>{{tableData01.year}}</span>
          </van-col>
          <van-col span="8"></van-col>
          <van-col span="10" style="margin-top: -8px;">
                  <span v-if="myId.length>0">
                    <el-tooltip v-if="tableData01.collectStatus === true" class="item" effect="dark" content="取消收藏" placement="bottom">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(tableData01)"></i>
                    </el-tooltip>
                    <el-tooltip v-if="tableData01.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom">
                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="Collection(1)"></i>
                    </el-tooltip>
                  </span>
            <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(tableData01.link[0],tableData01.title)" style="height: 20px;">
                </span>
            <!--微信-->
            <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(tableData01.link[0])" style="height: 20px;">
                </span>
            <!--复制连接-->
            <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="tableData01.link[0]" @click="Copy"></i>
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
        <el-link v-if="tableData01.authorId.length>0" type="primary" :underline="false" @click="gotoAuthor(tableData01.authorId)">
          {{tableData01.author}}
        </el-link>
        <span v-if="tableData01.authorId.length===0">{{tableData01.author}}</span>
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
      <div class="Details" style="margin-bottom: 20px;">
        <el-button type="primary" plain @click="gotoPaper(tableData01.link[0],tableData01.paperId)">查看原文</el-button>
      </div>
    </div>
    <div v-if="menuIndex==='2'">
      <!--日期+文献操作（分享等）-->
      <div style="margin-top: 20px;">
        <van-row>
          <van-col span="6">
            <span>{{tableData02.year}}</span>
          </van-col>
          <van-col span="8"></van-col>
          <van-col span="10" style="margin-top: -8px;">
                  <span v-if="myId.length>0">
                    <el-tooltip v-if="tableData02.collectStatus === true" class="item" effect="dark" content="取消收藏" placement="bottom">
                      <i class="el-icon-star-on" style="font-size: 25px;width: 30px" @click="deleteCollection(tableData02)"></i>
                    </el-tooltip>
                    <el-tooltip v-if="tableData02.collectStatus === false" class="item" effect="dark" content="收藏" placement="bottom">
                      <i class="el-icon-star-off" style="font-size: 25px;width: 30px" @click="Collection(2)"></i>
                    </el-tooltip>
                  </span>
            <span>
                    <img src="../assets/Weibo.png" alt="" @click="gotoWeibo(tableData02.link[0],tableData02.title)" style="height: 20px;">
                </span>
            <!--微信-->
            <span style="margin-left: 5px;margin-right: 2px">
                    <img src="../assets/WeChat.png" alt="" @click="openQRcode(tableData02.link[0])" style="height: 20px;">
                </span>
            <!--复制连接-->
            <span>
                    <el-tooltip class="item" effect="dark" content="复制链接" placement="bottom">
                      <i class="el-icon-document-copy" style="font-size: 25px;width: 30px" :data-clipboard-text="tableData02.link[0]" @click="Copy"></i>
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
        <el-link v-if="tableData02.authorId.length>0" type="primary" :underline="false" @click="gotoAuthor(tableData02.authorId)">
          {{tableData02.author}}
        </el-link>
        <span v-if="tableData02.authorId.length===0">{{tableData02.author}}</span>
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
      <div class="Details" style="margin-bottom: 20px;">
        <el-button type="primary" plain @click="gotoPaper(tableData02.link[0],tableData02.id)">查看原文</el-button>
      </div>
    </div>
    <el-dialog
      title="使用微信扫一扫"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      show-close="false"
      style="z-index: 999999999999999;position: absolute;"
      width="30%">
      <div>
        <img :src="'https://www.lofter.com/genBitmaxImage?url='+QRlink" alt="" width="150" height="150">
      </div>
      <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
                  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "paperDetail",
      data(){
          return{
            menuIndex:0,
            dialogVisible: false,
          }
      },
    }
</script>

<style>

</style>
