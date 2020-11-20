<template>
  <el-container style="height: 100vh;background-color: #545c64;">
    <el-aside width="200px">
      <div style="height: 50px;margin-top: 10px;font-size: 20px">
        <img src="../../static/logo4.png" alt="" width="80%">
      </div>
      <el-menu
        :default-active=menuIndex
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 25%;text-align: left;margin-top: 20px">
        <el-menu-item index="1">
          <i class="el-icon-document" style="margin-left: 25px"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-check" style="margin-left: 25px"></i>
            <span>审核</span>
          </template>
          <el-menu-item index="2-1"><span style="margin-left: 38px">未审核</span></el-menu-item>
          <el-menu-item index="2-2"><span style="margin-left: 38px">已审核</span></el-menu-item>
        </el-submenu>
<!--        <el-menu-item index="2">-->
<!--          <i class="el-icon-s-check" style="margin-left: 25px"></i>-->
<!--          <span slot="title">审核</span>-->
<!--        </el-menu-item>-->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-chat-dot-round" style="margin-left: 25px"></i>
            <span>申诉</span>
          </template>
          <el-menu-item index="3-1"><span style="margin-left: 38px">未审核</span></el-menu-item>
          <el-menu-item index="3-2"><span style="margin-left: 38px">已审核</span></el-menu-item>
        </el-submenu>
<!--        <el-menu-item index="3">-->
<!--          <i class="el-icon-chat-dot-round" style="margin-left: 25px"></i>-->
<!--          <span slot="title">申诉</span>-->
<!--        </el-menu-item>-->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="position: relative">
        <div style="position: absolute;right: 10px;top: 50%;transform: translate(0, -50%);" class="avatar">
        </div>
      </el-header>
      <el-main>
        <el-dialog
          title="修改密码"
          :visible.sync="dialogVisible"
          v-if="dialogVisible"
          :show-close=false
          width="30%">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-right: 80px">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-drawer
          :visible.sync="drawer"
          :direction="direction"
          v-if="drawer">
          <div>
            <van-row>
              <van-col span="8">
                <span>日期</span>
              </van-col>
              <van-col span="8" style="margin-top: 3px;text-align: left">
                <span>{{drawerData.date}}</span>
              </van-col>
              <van-col span="8"></van-col>
            </van-row>
          </div>

          <div style="margin-top: 20px">
            <van-row>
              <van-col span="8">
                <span>姓名</span>
              </van-col>
              <van-col span="8" style="text-align: left">
                <span>{{drawerData.name}}</span>
              </van-col>
              <van-col span="8"></van-col>
            </van-row>
          </div>

          <div style="margin-top: 20px">
            <van-row>
              <van-col span="8">
                <span>审核内容</span>
              </van-col>
              <van-col span="16" style="text-align: left">
                <span>{{drawerData.address}}</span>
              </van-col>
            </van-row>
          </div>
<!--          <div style="margin-top: 30px">-->
<!--            <div style="display: inline;float: left;margin-left: 100px">姓名</div>-->
<!--            <div style="display: inline;border: 1px solid rgba(0,0,0,.1);padding: 10px;width: 200px">{{drawerData.name}}</div>-->
<!--          </div>-->
          <el-button type="primary" plain style="position: absolute;left: 150px;bottom: 20px" @click="pass">通过</el-button>
          <el-button type="danger" plain style="position: absolute;right: 150px;bottom: 20px" @click="reject">拒绝</el-button>
        </el-drawer>
        <div v-if="menuIndex === '1'" class="info" style="position: relative;top: 50%;transform: translate(0, -50%);">
          <div style="position: absolute;left: 50px;top: 50px" class="avatar_info"></div>
          <div style="position: absolute;left: 450px;top: 100px">
            姓名 :
          </div>
          <div style="position: absolute;left: 450px;top: 150px">
            手机号 :
          </div>
          <div style="position: absolute;left: 450px;top: 200px">
            身份证 :
          </div>
          <div style="position: absolute;left: 450px;top: 250px">
            密码 :
            <el-button @click="dialogVisible = true">修改密码</el-button>
          </div>
        </div>
        <div v-if="menuIndex === '2-1'">
          <el-table
            :data="tableData"

            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核内容"
              >
            </el-table-column>
            <el-table-column
              fixed="right"
              width="100"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="view(scope.$index)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="menuIndex === '2-2'">
          <el-table
            :data="tableData1"

            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核内容"
            >
            </el-table-column>

            <el-table-column
              label="审核结果"
            >
              <template slot-scope="scope1">
                <div v-if="scope1.row.state==='pass'" style="color: lawngreen">
                  {{scope1.row.state}}
                </div>
                <div v-if="scope1.row.state==='failed'" style="color: red">
                  {{scope1.row.state}}
                </div>
              </template>
            </el-table-column>
            <!--<el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="view(scope.$index)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>-->
          </el-table>
        </div>
        <div v-if="menuIndex === '3-1'">
          <el-table
            :data="tableData"

            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核内容"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              width="100"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="view(scope.$index)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="menuIndex === '3-2'">
          <el-table
            :data="tableData1"

            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核内容"
            >
            </el-table-column>
            <el-table-column
              label="审核内容"
            >
              <template slot-scope="scope1">
                <div v-if="scope1.row.state==='pass'" style="color: #3a8ee6">
                  {{scope1.row.state}}
                </div>
                <div v-if="scope1.row.state==='failed'" style="color: red">
                  {{scope1.row.state}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Administrator",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        menuIndex: "2-1",
        dialogVisible: false,
        drawer: false,
        direction: 'rtl',
        drawerData: {
          date: '',
          name: '',
          address: '',
        },
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        tableData1: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          state:'pass'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          state:'pass'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          state:'failed'
        },],
          tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        }],
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSelect (key) {
        this.menuIndex = key;
      },
      view(index) {
        this.drawerData.date=this.tableData[index].date;
        this.drawerData.name=this.tableData[index].name;
        this.drawerData.address=this.tableData[index].address;
        this.drawer=true;
        // console.log(this.drawerData);
      },
      pass() {
        this.drawer=false;
      },
      reject() {
        this.drawer=false;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height:100%
  }

  /*.el-aside {*/
  /*  background-color: #545c64;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 100vh;*/
  /*}*/

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-menu {
    border-right: solid 0 #e6e6e6!important;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 100%;
  }

  .avatar {
    border-radius: 30px;
    width:50px;
    height:50px;
    background: url("../assets/jiang.jpg") no-repeat center;
    background-size:auto 100%;
  }

  .avatar_info {
    border-radius: 50%;
    width:100px;
    height:100px;
    background: url("../assets/jiang.jpg") no-repeat center;
    background-size:auto 100%;
    border: solid #3B5999 2px;
  }

  .info {
    background: white;
    border-radius:15px;
    height: 85vh;
  }

  .info:hover {
    /*webkit-box-shadow: #666 0px 0px 10px;*/
    /*-moz-box-shadow: #666 0px 0px 10px;*/
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }
</style>
