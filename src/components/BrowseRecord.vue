<template>
  <div>
    <TopBar></TopBar>
    <div style="width: 70%;margin-top: 10px;margin-left: 15%;">
      <div style="position: relative;height: 50px;margin-top: 20px">
        <div style="float: left;text-align: left;position: absolute;left: 10px;font-size: 18px;margin-top: 15px">
          <i class="el-icon-s-management"> 浏览记录</i>
        </div>
        <div style="float: right">
          <el-button type="danger" :disabled="multipleSelection.length === 0" @click="open">删除选中记录</el-button>
        </div>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @cell-click="gotoPaper"
        stripe
        style="wpidth: 100%;margin-top: 10px"
        @selection-change="handleSelectionChange" @row-click="openDialog">             <!--这是一个表格  element ui-->

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="browse_time"
          label="日期"
          width="200">
          <!--          <template slot-scope="scope">{{ scope.row.browse_time }}</template>-->
        </el-table-column>
        <el-table-column
          prop="paper_name"
          label="浏览记录"

          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link >{{scope.row.paper_name}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          width="50"
          label="更多">
          <template slot-scope="scope">
            <el-dropdown placement="top">
              <span class="el-dropdown-link">
                <i class="el-icon-more-outline"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="deleteHistory(scope.$index)"><i class="el-icon-delete"> 删除记录</i></el-dropdown-item>
<!--                <el-dropdown-item><i class="el-icon-document-copy"> 复制文本</i></el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import TopBar from "./TopBar";
  import baseUrl from "./baseUrl";
    export default {
        name: "BrowseRecord",
      components: {TopBar},

      data() {
        return {
          currentPage: 1,
          pageSize: 10,
          visible: false,
          RecordForm:{
            pid:'',
            paper_name:'',
            paperLink:[],
            browse_time:''
          },
          tableData: [{
            pid: '',
            browse_time: '',
            paperLink:[],
            paper_name: ''
          }],
          multipleSelection: [],
          post: [],
          Timelist:[],
          PaperUrlList:[],
          PaperTitleList:[],
        }
      },
      mounted() {
        this.getBrowseRecord()
      },
      methods: {
        getBrowseRecord(){//url很想加个get
          console.log('getbr');
          let _this=this;
          axios.get(baseUrl+'/BrowseHistory',{
            params:{
              UserEmail:localStorage.getItem('myId'),
            }
          })
            .then(function (response) {
            console.log(response.data.status)
              console.log(response);
              _this.tableData=[];
            for (let i=0,length=response.data.Timelist.length; i<length; i++) {
              let t={};
              console.log(i);
              console.log(response.data.Timelist[i]);
              console.log(response.data.PaperTitleList[i]);
              console.log(response.data.PaperUrlList[i]);
              t.pid=i;
              t.browse_time=response.data.Timelist[i];
              t.paper_name=response.data.PaperTitleList[i];
              t.paperLink = response.data.PaperUrlList[i];
              console.log(t);
              _this.tableData.push(t);
            }
            console.log(_this.tableData)
          })
        },
        handleSizeChange: function(size) {
          this.pageSize = size;
        },
        //点击第几页
        handleCurrentChange: function(currentPage) {
          this.currentPage = currentPage;
        },

        search(row){
          localStorage.setItem("keyWords",row.history);
          this.$router.push({
            path:'/SearchResult',
          });
        },

        handleSelectionChange(val) {     //这是什么
          // console.log(val);
          this.multipleSelection = val;
          // console.log(this.multipleSelection);
        },

        deleteHistory(index) {
          //传递数据
          console.log([this.tableData[index].id])
          axios.get(baseUrl+'/deleteBrowseRecord',{
            params:{
              userId: localStorage.getItem('myId'),
              Id: [this.tableData[index].id]
            }
          }).then(function (response) {
            if (response.data.succeed===true) {
              this.tableData.splice(index,1);
              this.$message({
                type: 'success',
                message: '删除浏览记录成功'
              });
            }
            else {
              this.$message({
                type: 'error',
                message: '删除浏览记录失败'
              });
            }
          })
        },
        deleteSelectHistory() {
          for (let i=0; i<this.multipleSelection.length; i++) {
            this.post.push(this.multipleSelection[i].id)
          }
          axios.get(baseUrl+'/deleteBrowseRecord',{
            params:{
              userId: localStorage.getItem('myId'),
              Id: this.post
            }
          }).then(function (response) {
            if (response.data.succeed === true) {
              let result = this.multipleSelection.map(a => {return a.id});
              for (let i=0; i<result.length; i++) {
                for (let j=0; j<this.tableData.length; j++) {
                  if (this.tableData[j].id === result[i]) {
                    // console.log(this.tableData[j].id);
                    this.tableData.splice(j,1);
                    break;
                  }
                }
              }
              this.$message({
                type: 'success',
                message: '批量删除浏览记录成功'
              });
            }
            else {
              this.$message({
                type: 'error',
                message: '批量删除浏览记录失败'
              });
            }
          })

          // this.$message('批量删除成功');
          this.post.length = 0
        },
        open() {
          this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteSelectHistory();
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          })
        },

        gotoPaper(row){
          let str=''
          for (let i=2; i<row.paperLink.length;i++) {
            if (row.paperLink[i]!=='\'') {
              str+=row.paperLink[i]
            }
            else break;
          }
          console.log(str)
          window.open(str)
        },
        openDialog(){

        }
      }

    }
</script>

<style scoped>

</style>
