<template>
  <div>
    <TopBar></TopBar>
    <div style="width: 70%;margin-top: 10px;margin-left: 15%;">
      <div style="position: relative;height: 50px;margin-top: 20px">
        <div style="float: left;text-align: left;position: absolute;left: 10px;font-size: 18px;margin-top: 15px">
          <i class="el-icon-search"> 成果浏览记录</i>
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
        @selection-change="handleSelectionChange">             <!--这是一个表格  element ui-->
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
          label="成果浏览记录"
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
        name: "BrowseRecord",
      components: {TopBar},

      data() {
        return {
          visible: false,
          tableData: [{
            id: '001',
            date: '2020/01/01 15:00',
            name: '张三',
            history: '论如何给一篇不存在的学术成果取名--命名的艺术'
          }, {
            id: '002',
            date: '2020/01/01 15:00',
            name: '李四',
            history: '关于为何文档浏览记录的代码和搜索记录这么像的研究成果'
          }, {
            id: '003',
            date: '2020/11/19 16:00',
            name: '王五',
            history: '准确来讲这应该是浏览记录，也就是你看过的文章的记录'
          }, {
            id: '004',
            date: '2020/11/19 20:00',
            name: '王五',
            history: '所以搜索记录不应该加时间，建议删除'
          }, {
            id: '005',
            date: '2020/11/19 20:30',
            name: '王五',
            history: '再加一条研究领域吧，我觉得'
          }],
          multipleSelection: []
        }
      },

      methods: {
        handleSelectionChange(val) {     //这是什么
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
        /**
         * 删除历史记录
         * @param index
         *
         * javascript:
         * this.tableData.splice(index,howmany,item1..itemx) 删除项目，然后返回被删除的项目
         * 规定删除位置、要删除的项目数量、（可选）添加的新项目
         * this.$message() 就是个消息提示
         */
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
