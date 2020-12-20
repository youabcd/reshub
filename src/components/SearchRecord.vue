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
        style="width: 100%;margin-top: 10px;margin-bottom: 50px"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="200">
          <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="history"
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
            date: '',
            history: '',
          }],
          tableData: [{
            id: '1',
            date: '2016-05-01 16:00',
            history: '上海市普陀区金江路'
          }, {
            id: '2',
            date: '2016-05-02',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '3',
            date: '2016-05-03',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '4',
            date: '2016-05-04',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '5',
            date: '2016-05-05',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '6',
            date: '2016-05-06',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '7',
            date: '2016-05-07',
            history: '上海市普陀区金沙江路 1518 弄'
          },{
            id: '12',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '13',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '14',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '15',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '16',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '17',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '18',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '19',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '111',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '122',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '133',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '144',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '155',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '166',
            date: '2016/05/01 16:00',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, ],
          multipleSelection: [],
          post: []
        }
      },
      mounted() {
        this.getSearchRecord()
      },
      methods: {
        getSearchRecord() {
          axios.get(baseUrl+'/getSearchRecord',{
            params:{
              userId:localStorage.getItem('myId')
            }
          }).then(function (response) {
            for (let i=0, length=response.data.results.length; i<length; i++) {
              this.temp.id=response.data.results[i].id;
              this.temp.date=response.data.results[i].searchTime;
              this.temp.history=response.data.results[i].keyword;
              this.tableData.push({
                id: this.temp.id,
                date: this.temp.date,
                history: this.temp.history,
              })
            }
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
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        deleteHistory(index) {
          //传递数据
          // console.log([this.tableData[index].id])
          axios.get(baseUrl+'/deleteSearchRecord',{
            params:{
              userId: localStorage.getItem('myId'),
              Id: [this.tableData[index].id]
            }
          }).then(function (response) {
            if (response.data.succeed===true) {
              this.tableData.splice(index,1);
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            }
            else {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            }
          })

        },
        deleteSelectHistory() {
          for (let i=0; i<this.multipleSelection.length; i++) {
            this.post.push(this.multipleSelection[i].id)
          }
          axios.get(baseUrl+'/deleteSearchRecord',{
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
                message: '批量删除成功'
              });
            }
            else {
              this.$message({
                type: 'error',
                message: '批量删除失败'
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
        }
      }
    }
</script>

<style scoped>

</style>
