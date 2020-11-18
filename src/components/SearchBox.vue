<template>
  <div @keyup.enter="search">
    <!--搜索框样式-->
    <div>
      <div style="margin-top: 60px;width: 70%;margin-left: 15%">
        <van-row v-for="(item,index) in searchKey" :key="index" style="margin-top: 15px;">
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
                <el-option label="全文" value="6"></el-option>
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
                <el-option label="全文" value="6"></el-option>
              </el-select>
            </el-input>
          </van-col>
          <van-col span="2">
            <van-row></van-row>
            <el-tooltip class="item" effect="light" content="删除该行" placement="right">
              <el-link :underline="false" v-if="index>0" @click="declineSearchBox(item,index)" style="margin-top: 5px;text-align: left;font-size: 30px;">
                <span><i class="el-icon-remove-outline"></i></span>
              </el-link>
            </el-tooltip>
          </van-col>
        </van-row>
      </div>

      <div style="margin-top: 15px;width: 70%;margin-left: 15%">
        <van-row>
          <van-col span="2" style="font-size: 18px;margin-top: 5px;">时间范围</van-col>
          <van-col span="5">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="dataStart" style="width: 100%;"></el-date-picker>
          </van-col>
          <van-col span="5">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="dataEnd" style="width: 100%;"></el-date-picker>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="6" style="text-align: left;font-size: 20px;">
            <span>
              <el-link @click="addSearchBox"><i class="el-icon-plus"></i> 添加行</el-link>
            </span>
            <span>&nbsp|&nbsp</span>
            <span>
              <el-link @click="cleanSearchBox">重设</el-link>
            </span>
          </van-col>
        </van-row>
      </div>

      <div style="margin-top: 24px;">
        <el-button type="primary" @click="search" style="font-size: 20px;width: 150px;">搜索</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import baseUrl from './baseUrl'
  export default {
    name: "SearchBox",
    data(){
      return{
        //搜索框部分数据
        keyWords:'',
        /*boolType {1:AND ; 2:OR ; 3:NOT}
        type {1：主题；2：标题；3：作者；4：关键词；5：摘要；6：全文}
        */
        searchKey:[
          {type:'1',words:'',isFuzzy:false,boolType:'1'},

        ],
        dataStart:'',
        dataEnd:'',
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
        else{
          localStorage.setItem("keyWords", this.keyWords);
          /*if(this.$route.path=='/SearchResult'){
            this.$emit("searchEvent",this.keyWords);
          }
          else {
            this.$router.push({
              path: '/SearchResult',
            });
          }*/
          window.open("http://localhost:8080/#/SearchResult");
        }
      },//搜索
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
      setKeyWords(){
        if(this.$route.path=='/SearchResult'){
          this.keyWords=localStorage.getItem("keyWords");
        }
        else{
          this.keyWords='';
        }
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
        /*this.recommend=[{ "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" }];*/
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
      this.setKeyWords();
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
