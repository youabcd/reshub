<template>
  <div>
    <TopBar></TopBar>
    <div style="width: 70%;margin-top: 10px;margin-left: 15%;">
      <div style="position: relative;height: 50px;margin-top: 20px">
        <div style="float: left;text-align: left;position: absolute;left: 10px;font-size: 18px;margin-top: 15px">
          <i class="el-icon-search"> 搜索记录</i>
        </div>
        <div style="float: right">
          <el-button type="danger" :disabled="multipleSelection.length === 0" @click="open">删除选中记录</el-button>
        </div>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @cell-click="search"
        stripe
        style="width: 100%;margin-top: 10px;margin-bottom: 50px;cursor: pointer;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="SearchTime"
          label="日期"
          width="200">
          <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="SearchContent"
          label="搜索记录"
          show-overflow-tooltip>
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
<!--                <el-dropdown-item><i class="el-icon-document-copy" > 复制文本</i></el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

<!--      <div style="margin-top: 30px">-->
<!--        <el-pagination-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="currentPage"-->
<!--          :page-size="pageSize"-->
<!--          layout="total, prev, pager, next, jumper"-->
<!--          :total="tableData.length"-->
<!--          prev-text="上一页"-->
<!--          next-text="下一页">-->
<!--        </el-pagination>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";
    import Clipboard from "clipboard";
    import axios from 'axios'
    import baseUrl from "./baseUrl";

    export default {
      name: "SearchRecord",
      components:{
        TopBar
      },
      data() {
        return {
          currentPage: 1,
          pageSize: 10,
          visible: false,
          temp: [{
            id: '',
            SearchTime: '',
            SearchContent: '',
          }],
          tableData: [{
            id: '',
            SearchTime: '',
            SearchContent: '',
            searchList:''
          }],
          multipleSelection: [],
          post: []
        }
      },
      mounted() {
        this.getSearchRecord()
      },
      methods: {
        getSearchRecord() {
          let _this=this
          axios.get(baseUrl+'/getSearchRecord',{
            params:{
              userId:localStorage.getItem('myId')
            }
          }).then(function (response) {
            console.log(response.data)

            _this.tableData=response.data.list;
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
          localStorage.setItem("keyWords",row.SearchContent);
          localStorage.setItem("keyWordsList",row.searchList);
          this.$router.push({
            path:'/SearchResult',
          });
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        deleteHistory(index) {
          //传递数据
          let _this=this
          // console.log([this.tableData[index].id])
          let deleteList=_this.tableData[index].id.toString()
          console.log(localStorage.getItem('myId'))
          axios.get(baseUrl+'/deleteSearchRecord',{
            params:{
              userId: localStorage.getItem('myId'),
              Id: deleteList
            }
          }).then(function (response) {
            if (response.data.succeed === true) {
              _this.tableData.splice(index,1);
              _this.$message({
                type: 'success',
                message: '删除成功'
              });
            }
            else {
              _this.$message({
                type: 'error',
                message: '删除失败'
              });
            }
          })

        },
        deleteSelectHistory() {
          let _this=this
          let deleteList=''
          // for (let i=0; i<this.multipleSelection.length; i++) {
          //   this.post.push(this.multipleSelection[i].id)
          // }
          for (let i=0; i<_this.multipleSelection.length-1; i++) {
            deleteList+=_this.multipleSelection[i].id+','
          }
          deleteList+=_this.multipleSelection[_this.multipleSelection.length-1].id
          console.log(deleteList)
          axios.get(baseUrl+'/deleteSearchRecord',{
            params:{
              userId: localStorage.getItem('myId'),
              Id: deleteList
            }
          }).then(function (response) {
            if (response.data.succeed === true) {
              let result = _this.multipleSelection.map(a => {return a.id});
              for (let i=0; i<result.length; i++) {
                for (let j=0; j<_this.tableData.length; j++) {
                  if (_this.tableData[j].id === result[i]) {
                    // console.log(this.tableData[j].id);
                    _this.tableData.splice(j,1);
                    break;
                  }
                }
              }
              _this.$message({
                type: 'success',
                message: '批量删除成功'
              });
            }
            else {
              _this.$message({
                type: 'error',
                message: '批量删除失败'
              });
            }
          })
          _this.post.length = 0
        },
        open() {
          this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteSelectHistory();
          })
        }
      }
    }
</script>

<style scoped>

</style>
