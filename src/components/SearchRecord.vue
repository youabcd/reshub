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
        stripe
        style="width: 100%;margin-top: 10px"
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
                <el-dropdown-item><i class="el-icon-document-copy"> 复制文本</i></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
      name: "SearchRecord",
      components:{
        TopBar
      },
      data() {
        return {
          visible: false,
          tableData: [{
            id: '1',
            date: '2016/05/01 16:00',
            name: '王小虎',
            history: '上海市普陀区金江路 151沙江路 151沙江路 151沙江路 151沙江路 151沙江路 151'
          }, {
            id: '2',
            date: '2016-05-02',
            name: '王小虎',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '3',
            date: '2016-05-03',
            name: '王小虎',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '4',
            date: '2016-05-04',
            name: '王小虎',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '5',
            date: '2016-05-05',
            name: '王小虎',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '6',
            date: '2016-05-06',
            name: '王小虎',
            history: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '7',
            date: '2016-05-07',
            name: '王小虎',
            history: '上海市普陀区金沙江路 1518 弄'
          }],
          multipleSelection: []
        }
      },
      methods: {
        handleSelectionChange(val) {
          // console.log(val);
          this.multipleSelection = val;
          // console.log(this.multipleSelection);
        },
        // handleCommand(command) {
        //   if (command === 'a') {
        //     //传递删除数据
        //
        //     this.$message('删除成功');
        //   }
        //   if (command === 'b') {
        //     this.$message('功能待定');
        //   }
        // }
        deleteHistory(index) {
          //传递数据
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        },
        deleteSelectHistory() {
          //传递数据
          let result = this.multipleSelection.map(a => {return a.id});
          for (let i=0; i<result.length; i++) {
            for (let j=0; j<this.tableData.length; j++) {
              if (this.tableData[j].id === result[i]) {
                console.log(this.tableData[j].id);
                this.tableData.splice(j,1);
                break;
              }
            }
          }
          // this.$message('批量删除成功');
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
