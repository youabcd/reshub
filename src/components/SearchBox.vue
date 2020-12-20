<template>
  <div @keyup.enter="search">
    <!--搜索框样式-->
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);width: 76%;margin-left: 12%;background:#ffffff;margin-top: 0px;height: 100%;">
      <van-row></van-row>
      <div style="margin-top: 60px;width: 88%;margin-left: 6%;">
        <van-row v-for="(item,index) in searchKey" :key="index" style="margin-top: 22px;">
          <van-col span="22">
            <el-autocomplete v-if="index<1" placeholder="请输入内容" v-model="item.words"
                             :fetch-suggestions="querySearch" @select="handleSelect"
                             style="font-size: 20px;width: 100%;" class="input-with-select">
              <el-select v-if="index>0" v-model="item.boolType" slot="prepend" style="font-size: 15px">
                <el-option label="AND" value="1"></el-option>
                <el-option label="OR" value="2"></el-option>
                <el-option label="NOT" value="3"></el-option>
              </el-select>
              <el-select slot="append" v-model="item.type" style="font-size: 15px">
                <el-option label="主题" value="1"></el-option>
                <el-option label="标题" value="2"></el-option>
                <el-option label="作者" value="3"></el-option>
                <el-option label="关键词" value="4"></el-option>
                <el-option label="摘要" value="5"></el-option>
                <el-option label="学科" value="6"></el-option>
              </el-select>
            </el-autocomplete>
            <el-input v-if="index>0" placeholder="" v-model="item.words"
                             style="width: 100%;" class="input-with-select">
              <el-select v-if="index>0" v-model="item.boolType" slot="prepend" style="font-size: 15px">
                <el-option label="AND" value="1"></el-option>
                <el-option label="OR" value="2"></el-option>
                <el-option label="NOT" value="3"></el-option>
              </el-select>
              <el-select slot="append" v-model="item.type" style="font-size: 15px">
                <el-option label="主题" value="1"></el-option>
                <el-option label="标题" value="2"></el-option>
                <el-option label="作者" value="3"></el-option>
                <el-option label="关键词" value="4"></el-option>
                <el-option label="摘要" value="5"></el-option>
                <el-option label="学科" value="6"></el-option>
              </el-select>
            </el-input>
          </van-col>
          <van-col span="2">
            <van-row></van-row>
            <el-tooltip class="item" effect="light" content="删除该行" placement="right" style="text-align: left;">
              <el-button v-if="index>0" @click="declineSearchBox(item,index)" style="margin-top: 5px;" circle size="mini" type="danger">
                <span><i class="el-icon-minus"></i></span>
              </el-button>
            </el-tooltip>
          </van-col>
        </van-row>
      </div>

      <div style="margin-top: 22px;width: 88%;margin-left: 6%">
        <van-row style="">
          <van-col span="2">
            <div style="height: 40px;background: #ffffff;box-shadow: 0 2px 4px rgba(0, 0, 0, .02), 0 0 6px rgba(0, 0, 0, .12);;border-radius: 5px;">
            <van-row><van-col span="24" style="font-size: 18px;margin-top:8px;">时间范围</van-col></van-row>
            </div>
          </van-col>
          <van-col span="5" >
            <el-date-picker type="date" value-format="yyyy-MM-dd" @change="formatStartTime"
                            placeholder="选择开始日期" v-model="dateStart" style="width: 100%;"></el-date-picker>
          </van-col>
          <van-col span="5" >
            <el-date-picker type="date" value-format="yyyy-MM-dd" @change="formatEndTime"
                            placeholder="选择结束日期" v-model="dateEnd" style="width: 100%;"></el-date-picker>
          </van-col>
          <van-col span="3">
            <van-row></van-row>
            <van-row>
              <el-checkbox style="margin-top: 15px;" v-model="radio">中英文扩展</el-checkbox>
              <!--<el-radio style="margin-top: 15px;" v-model="radio" @click.native.prevent="clickItem(1)" :label="1"> 中英文扩展</el-radio>-->
            </van-row>
          </van-col>
          <van-col span="3"></van-col>
          <van-col span="6" style="text-align: left;font-size: 20px;">
            <span>
              <el-button type="success" size="small" @click="addSearchBox"><i class="el-icon-plus"></i> 添加行</el-button>
            </span>
            <span>&nbsp|&nbsp</span>
            <span>
              <el-button type="danger" size="small" @click="cleanSearchBox"><i class="el-icon-close"></i> 重设</el-button>
            </span>
          </van-col>
        </van-row>
      </div>

      <div style="margin-top: 34px;margin-bottom: 30px;">
        <el-button type="primary" @click="search" style="font-size: 20px;width: 150px;">搜索</el-button>
      </div>

      <van-row></van-row>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import baseUrl from './baseUrl'
  import webUrl from "./webUrl";
  export default {
    name: "SearchBox",
    data(){
      return{
        //搜索框部分数据
        keyWords:'',
        /*boolType {1:AND ; 2:OR ; 3:NOT}
        type {1：主题；2：标题；3：作者；4：关键词；5：摘要;6:学科 }
        */
        radio:false,
        searchKey:[
          {type:'1',words:'',isFuzzy:false,boolType:'1'},
        ],
        dateStart:'',
        dateEnd:'',
        recommend: [],
      }
    },
    methods:{
      //搜索框部分函数
      search(){
        if(this.searchKey[0].words.length==0){
          this.$message({
            message: '请输入搜索关键词',
            type: 'error'
          });
        }
        else{/*type {1：主题；2：标题；3：作者；4：关键词；5：摘要；6：学科}*/
          var k="(";
          for (var i=0;i<this.searchKey.length;i++){
            if(i===0){
              if(this.searchKey[i].type==='1'){
                k=k+"主题 ";
              }
              else if(this.searchKey[i].type==='2'){
                k=k+"标题 ";
              }
              else if(this.searchKey[i].type==='3'){
                k=k+"作者 ";
              }
              else if(this.searchKey[i].type==='4'){
                k=k+"关键词 ";
              }
              else if(this.searchKey[i].type==='5'){
                k=k+"摘要 "
              }
              else if(this.searchKey[i].type==='6'){
                k=k+"学科 "
              }
              k=k+this.searchKey[i].words+")";
            }
            else {
              if(this.searchKey[i].boolType==='1'){
                k=k+" AND ("
              }
              else if(this.searchKey[i].boolType==='2'){
                k=k+" OR ("
              }
              else if(this.searchKey[i].boolType==='3'){
                k=k+" NOT ("
              }
              if(this.searchKey[i].type==='1'){
                k=k+"主题 ";
              }
              else if(this.searchKey[i].type==='2'){
                k=k+"标题 ";
              }
              else if(this.searchKey[i].type==='3'){
                k=k+"作者 ";
              }
              else if(this.searchKey[i].type==='4'){
                k=k+"关键词 ";
              }
              else if(this.searchKey[i].type==='5'){
                k=k+"摘要 "
              }
              else if(this.searchKey[i].type==='6'){
                k=k+"学科 "
              }
              k=k+this.searchKey[i].words+")";
            }
          }
          localStorage.setItem("keyWords",k);
          localStorage.setItem("keyWordsList",JSON.stringify(this.searchKey));
          localStorage.setItem("Radio",this.radio);
          if(this.dateStart.length>0){
            localStorage.setItem("dateStart",this.dateStart.substring(0,4));
          }
          else{
            localStorage.setItem("dateStart",'0000');
          }
          if(this.dateEnd.length>0){
            localStorage.setItem("dateEnd",this.dateEnd.substring(0,4));
          }
          else{
            localStorage.setItem("dateEnd",this.getTime());
          }
          window.open(webUrl+"SearchResult");
          // let data = new FormData();
          // data.append('userId',localStorage.getItem("myId"));
          // data.append('keyWords',k);
          // axios.post(baseUrl+'addSearchRecord',data)
          // .then(function (response) {
          //
          // })
        }
      },//搜索
      getTime(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        //以下代码依次是获取当前时间的年月日时分秒
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var minute = date.getMinutes();
        var hour = date.getHours();
        var second = date.getSeconds();
        //固定时间格式
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        var currentdate =  year;
        return currentdate;
      },
      formatStartTime(val){
        this.dataStart=val;
      },
      formatEndTime(val){
        this.dataEnd=val;
      },
      //添加行
      addSearchBox(){
        var a={type:'1',words:'',isFuzzy:false,boolType:'1'};
        this.searchKey.push(a);
        if(this.searchKey.length>10){
          this.$message({
            message: '不建议再继续增加搜索框,可能会导致搜不到结果',
            type: 'warning'
          });
        }
      },
      //重设
      cleanSearchBox(){
        this.searchKey.splice(1,this.searchKey.length-1);
        this.searchKey[0].words='';
        this.searchKey[0].type='1';
      },
      //删除行
      declineSearchBox(item,index){
        this.searchKey.splice(index,1);
      },
      clickItem(e){
        e===this.radio ? this.radio='0' : this.radio=e;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //高级搜索
      //搜索推荐
      querySearch(queryString, cb) {
        var recommend = this.recommend;
        var results = queryString ? recommend.filter(this.createFilter(queryString)) : recommend;
        // 调用 callback 返回建议列表的数据
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100 * Math.random());
      },
      createFilter(queryString) {
        return (rec) => {
          return (rec.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      loadAll() {
        let _this=this;
        axios.get(baseUrl+'/recommend')
          .then(function (response) {
            console.log(response);
            _this.recommend=response.data;
          })
        return this.recommend;
      },
      handleSelect(item) {
        console.log(item);
      },
    },
    created() {
    },
    mounted() {
      this.recommend=this.loadAll();
    }
  }
</script>

<style>
  .el-select .el-input {
    width: 120px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
