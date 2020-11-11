<template>
  <div>
    <!--搜索框样式-->
    <div>
      <div style="margin-top: 60px;width: 70%;margin-left: 15%" @keyup.enter="search">
        <van-row>
          <van-col span="22">
            <el-autocomplete placeholder="请输入内容" v-model="keyWords"
                             :fetch-suggestions="querySearch" @select="handleSelect"
                             style="font-size: 20px;width: 100%;" class="input-with-select">
              <el-select v-model="select" slot="prepend" style="font-size: 15px">
                <el-option label="搜索全部" value="1"></el-option>
                <el-option label="搜索资料" value="2"></el-option>
                <el-option label="搜索学者" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-autocomplete>
          </van-col>
          <van-col span="2">
            <van-row>
              &nbsp;
            </van-row>
            <van-row>
              <el-link type="" @click="qualitySearch">>>高级检索</el-link>
            </van-row>
          </van-col>
        </van-row>
      </div>

      <!--高级搜索弹框-->
      <div>
        <van-popup v-model="show" round closeable style="height: 550px;width: 550px;">
          <el-form ref="form" :model="form" :rules="rules" label-width="110px" style="margin-top: 35px;width: 85%;margin-left: 5%">
            <el-form-item label="检索词" prop="keyWords">
              <el-input v-model="form.keyWords"></el-input>
            </el-form-item>
            <el-form-item label="检索词出现位置">
              <el-radio-group v-model="form.region">
                <el-radio-button label="文章任意位置"></el-radio-button>
                <el-radio-button label="文章标题"></el-radio-button>
                <el-radio-button label="文章摘要"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发表时间范围">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="专业方向">
              <el-input v-model="form.profession"></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="机构">
              <el-input v-model="form.institute"></el-input>
            </el-form-item>
            <el-form-item label="文章所用语言">
              <el-radio-group v-model="form.language">
                <el-radio label="1">任意</el-radio>
                <el-radio label="2">中文</el-radio>
                <el-radio label="3">英文</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="onSubmit('form')">搜索</el-button>
        </van-popup>
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
        select:'1',
        recommend: [],
        show:false,
        form: {
          keyWords:'',//关键词
          region: '文章任意位置',//出现位置
          date1: '',//搜索时间开始
          date2: '',//搜索实际结束
          profession:'',
          author:'',//作者名字
          institute:'',//机构名称
          language:'1',//语种
        },
        rules:{
          keyWords:[{required:true,message:'请输入检索词',trigger:'blur'}]
        },
      }
    },
    methods:{
      //搜索框部分函数
      search(){
        if(this.keyWords.length==0){
          this.$message({
            message: '请输入搜索关键词',
            type: 'error'
          });
        }
        else{
          localStorage.setItem("keyWords", this.keyWords);
          if(this.$route.path=='/SearchResult'){
            this.$emit("searchEvent",this.keyWords);
          }
          else {
            this.$router.push({
              path: '/SearchResult',
            });
          }
        }
      },//搜索
      qualitySearch(){
        this.show=true;
      },//打开高级搜索弹框
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
