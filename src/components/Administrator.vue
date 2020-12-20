<template>
  <el-container style="height: 100vh;background-color: #545c64;">
    <el-aside width="200px">
      <div style="height: 50px;margin-top: 10px;font-size: 20px">
        <a href="/">
          <img src="../../static/logo4.png" alt="" width="80%">
        </a>

      </div>
      <el-menu
        :default-active=menuIndex
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 25%;text-align: left;margin-top: 20px">
<!--        <el-menu-item index="1">-->
<!--          <i class="el-icon-document" style="margin-left: 25px"></i>-->
<!--          <span slot="title">个人信息</span>-->
<!--        </el-menu-item>-->
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
<!--        <el-menu-item index="4">-->
<!--          <i class="el-icon-document" style="margin-left: 25px"></i>-->
<!--          <span slot="title">测试</span>-->
<!--        </el-menu-item>-->
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
          :close-on-click-modal="false"
          v-if="dialogVisible"
          :show-close=true
          width="500px"
          @close="resetForm('ruleForm')">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-right: 80px" v-if="dialogVisible">
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
          :visible.sync="drawer1"
          :direction="direction"
          v-if="drawer1">
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
                <span>上传内容</span>
              </van-col>
              <van-col span="16" style="text-align: left">
                <span>{{drawerData.title}}</span>
              </van-col>
            </van-row>
          </div>

          <div style="margin-top: 20px" v-if="menuIndex === '2-1'||menuIndex === '2-2'">
            <van-row>
              <van-col span="8">
                <span>链接</span>
              </van-col>
              <van-col span="16" style="text-align: left">
                <el-link type="primary" @click="gotoUrl(drawerData.link)">点击跳转</el-link>
              </van-col>
            </van-row>
          </div>
<!--          <div style="margin-top: 30px">-->
<!--            <div style="display: inline;float: left;margin-left: 100px">姓名</div>-->
<!--            <div style="display: inline;border: 1px solid rgba(0,0,0,.1);padding: 10px;width: 200px">{{drawerData.name}}</div>-->
<!--          </div>-->
          <el-button v-if="menuIndex === '2-1'||menuIndex === '2-2'" type="primary" plain style="position: absolute;left: 150px;bottom: 20px" @click="pass1(drawerData.id)">通过</el-button>
          <el-button v-if="menuIndex === '2-1'||menuIndex === '2-2'" type="danger" plain style="position: absolute;right: 150px;bottom: 20px" @click="reject1(drawerData.id)">拒绝</el-button>
          <el-button v-if="menuIndex === '3-1'||menuIndex === '3-2'" type="primary" plain style="position: absolute;left: 150px;bottom: 20px" @click="pass2(drawerData.id)">通过</el-button>
          <el-button v-if="menuIndex === '3-1'||menuIndex === '3-2'" type="danger" plain style="position: absolute;right: 150px;bottom: 20px" @click="reject2(drawerData.id)">拒绝</el-button>
        </el-drawer>
<!--        <div v-if="menuIndex === '1'" class="info" style="position: relative;top: 50%;transform: translate(0, -50%);">-->
<!--          <div style="position: absolute;left: 150px;top: 100px" class="avatar_info"></div>-->
<!--          <div style="position: absolute;left: 450px;top: 100px">-->
<!--            姓名 : {{administrator.name}}-->
<!--          </div>-->
<!--          <div style="position: absolute;left: 450px;top: 150px">-->
<!--            手机号 : {{administrator.phone}}-->
<!--          </div>-->
<!--          <div style="position: absolute;left: 450px;top: 200px">-->
<!--            身份证 : {{administrator.ID_card}}-->
<!--          </div>-->
<!--          <div style="position: absolute;left: 450px;top: 250px">-->
<!--            密码 :-->
<!--            <el-button @click="dialogVisible = true">修改密码</el-button>-->
<!--          </div>-->
<!--        </div>-->
        <div v-if="menuIndex === '2-1'">
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="300">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="title"
              label="上传内容"
              >
            </el-table-column>
            <el-table-column
              fixed="right"
              width="100"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="view1(scope.$index)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="menuIndex === '2-2'">
          <el-table
            :data="tableData2"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="300">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="title"
              label="上传内容"
            >
            </el-table-column>

            <el-table-column
              label="审核结果"
              fixed="right"
              width="100"
            >
              <template slot-scope="scope1">
                <div v-if="scope1.row.status==='通过'">
                  <el-tag type="success">{{scope1.row.status}}</el-tag>
                </div>
                <div v-if="scope1.row.status==='拒绝'">
                  <el-tag type="danger">{{scope1.row.status}}</el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="menuIndex === '3-1'">
          <el-table
            :data="tableData3"

            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="300">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="title"
              label="申诉内容"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              width="100"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="view2(scope.$index)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="menuIndex === '3-2'">
          <el-table
            :data="tableData4"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="300">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="title"
              label="申诉内容"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              width="100"
              label="审核内容"
            >
              <template slot-scope="scope1">
                <div v-if="scope1.row.status==='通过'">
                  <el-tag type="success">{{scope1.row.status}}</el-tag>
                </div>
                <div v-if="scope1.row.status==='拒绝'">
                  <el-tag type="danger">{{scope1.row.status}}</el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
<!--        <div :style="{backgroundImage: 'url(' + img + ')' }" style="height: 100%" v-if="menuIndex === '4'">666</div>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import baseUrl from "./baseUrl";
  export default {
    name: "Administrator",
    mounted() {
      this.getAdministrator()
      this.getList()
    },
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
        drawer1: false,
        direction: 'rtl',
        // img: require('../assets/bing01.jpg'),
        administrator: {
          name: '',
          phone: '',
          ID_card: '',
        },
        drawerData: {
          id: '',
          date: '',
          name: '',
          title: '',
          status: '',
          link: '',
        },
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        tableData2: [{
          id: '11',
          date: '2016-05-02',
          name: '王小虎',
          title: '上海市普陀区金沙江路 1518 弄11',
          status:'通过',
          link: 'https://www.bilibili.com',
        }, {
          id: '12',
          date: '2016-05-04',
          name: '王小虎',
          title: '上海市普陀区金沙江路 1517 弄12',
          status:'通过',
          link: 'https://www.bilibili.com',
        }, {
          id: '13',
          date: '2016-05-01',
          name: '王小虎',
          title: '上海市普陀区金沙江路 1519 弄13',
          status:'拒绝',
          link: 'https://www.bilibili.com',
        }],
        tableData1: [{
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1518 弄1',
          link: 'https://www.bilibili.com',
        }, {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1517 弄2',
          link: 'https://www.bilibili.com',
        }, {
          id: '3',
          date: '2016-05-01',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1519 弄3',
          link: 'https://www.bilibili.com',
        }, {
          id: '4',
          date: '2016-05-03',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1516 弄4',
          link: 'https://www.bilibili.com',
        }, {
          id: '5',
          date: '2016-05-03',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1516 弄5',
          link: 'https://www.bilibili.com',
        }],
        tableData3: [{
          id: '21',
          date: '2016-05-02',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1518 弄21上海市普陀区金沙江路 1518 弄21上海市普陀区金沙江路 1518 弄21上海市普陀区金沙江路 1518 弄21上海市普陀区金沙江路 1518 弄21',
          link: 'https://www.bilibili.com',
        }, {
          id: '22',
          date: '2016-05-04',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1517 弄22',
          link: 'https://www.bilibili.com',
        }, {
          id: '23',
          date: '2016-05-01',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1519 弄23',
          link: 'https://www.bilibili.com',
        }, {
          id: '24',
          date: '2016-05-03',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1516 弄24',
          link: 'https://www.bilibili.com',
        }, {
          id: '25',
          date: '2016-05-03',
          name: '王小虎',
          status: '未审核',
          title: '上海市普陀区金沙江路 1516 弄25',
          link: 'https://www.bilibili.com',
        }],
        tableData4: [{
          id: '41',
          date: '2016-05-02',
          name: '王小虎',
          title: '上海市普陀区金沙江路 1518 弄11',
          status:'通过',
          link: 'https://www.bilibili.com',
        }, {
          id: '42',
          date: '2016-05-04',
          name: '王小虎',
          title: '上海市普陀区金沙江路 1517 弄12',
          status:'通过',
          link: 'https://www.bilibili.com',
        }, {
          id: '43',
          date: '2016-05-01',
          name: '王小虎',
          title: '上海市普陀区金沙江路 1519 弄13',
          status:'拒绝',
          link: 'https://www.bilibili.com',
        },],
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
      getAdministrator() {
        axios.get(baseUrl+'/getAdministrator',{
          params:{
            userId: localStorage.getItem('myId')
          }
        }).then(function (response) {
          this.administrator.name=response.data.info.name;
          this.administrator.phone=response.data.info.phone;
          this.administrator.ID_card=response.data.info.ID_card;
        })
      },
      getList() {
        axios.get(baseUrl+'/getList1',{
          params:{
            userId: localStorage.getItem('myId')
          }
        }).then(function (response) {
          this.tableData1=response.data.list1
          this.tableData2=response.data.list2
          this.tableData3=response.data.list3
          this.tableData4=response.data.list4
        })
      },
      handleSelect (key) {
        this.menuIndex = key;
      },
      view1(index) {
        this.drawerData.id=this.tableData1[index].id;
        this.drawerData.date=this.tableData1[index].date;
        this.drawerData.name=this.tableData1[index].name;
        this.drawerData.title=this.tableData1[index].title;
        this.drawerData.status=this.tableData1[index].status;
        this.drawerData.link=this.tableData1[index].link;
        this.drawer1=true;
        // console.log(this.drawerData);
      },

      view2(index) {
        this.drawerData.id=this.tableData3[index].id;
        this.drawerData.date=this.tableData3[index].date;
        this.drawerData.name=this.tableData3[index].name;
        this.drawerData.title=this.tableData3[index].title;
        this.drawerData.status=this.tableData3[index].status;
        this.drawerData.link=this.tableData3[index].link;
        this.drawer1=true;
        // console.log(this.drawerData);
      },

      gotoUrl(url) {
        window.open(url,url);
      },

      pass1(id) {
        //发送数据
        axios.get(baseUrl+'/pass1',{
          params:{
            userId: localStorage.getItem('myId'),
            id: id
          }
        }).then(function (response) {
          this.drawer1=false;
          this.drawerData.status='通过';
          for (let i=0; i<this.tableData1.length; i++) {
            if (this.drawerData.id === this.tableData1[i].id) {
              this.tableData1[i].status='通过';
              this.tableData2.unshift(this.tableData1[i]);
              this.tableData1.splice(i,1);
              break;
            }
          }
          if (response.data.succeed) {
            this.$message({
              showClose: true,
              message: '已通过该审核',
              type: 'success'
            });
          }
        })
      },
      reject1(id) {
        //发送数据
        axios.get(baseUrl+'/reject1',{
          params:{
            userId: localStorage.getItem('myId'),
            id: id
          }
        }).then(function (response) {
          this.drawer1=false;
          this.drawerData.status='拒绝';
          for (let i=0; i<this.tableData1.length; i++) {
            if (this.drawerData.id === this.tableData1[i].id) {
              this.tableData1[i].status='拒绝';
              this.tableData2.unshift(this.tableData1[i]);
              this.tableData1.splice(i,1);
              break;
            }
          }
          if (response.data.succeed) {
            this.$message({
              showClose: true,
              message: '已拒绝该请求',
              type: 'error'
            });
          }
        })
      },
      pass2(id) {
        //发送数据
        axios.get(baseUrl+'/pass2',{
          params:{
            userId: localStorage.getItem('myId'),
            id: id
          }
        }).then(function (response) {
          this.drawer1=false;
          this.drawerData.status='通过';
          for (let i=0; i<this.tableData3.length; i++) {
            if (this.drawerData.id === this.tableData3[i].id) {
              this.tableData3[i].status='通过';
              this.tableData4.unshift(this.tableData3[i]);
              this.tableData3.splice(i,1);
              break;
            }
          }
          if (response.data.succeed) {
            this.$message({
              showClose: true,
              message: '已通过该审核',
              type: 'success'
            });
          }

        })

      },
      reject2(id) {
        //发送数据
        axios.get(baseUrl+'/reject2',{
          params:{
            userId: localStorage.getItem('myId'),
            id: id
          }
        }).then(function (response) {
          this.drawer1=false;
          this.drawerData.status='拒绝';
          for (let i=0; i<this.tableData3.length; i++) {
            if (this.drawerData.id === this.tableData3[i].id) {
              this.tableData3[i].status='拒绝';
              this.tableData4.unshift(this.tableData3[i]);
              this.tableData3.splice(i,1);
              break;
            }
          }
          if (response.data.succeed) {
            this.$message({
              showClose: true,
              message: '已拒绝该请求',
              type: 'error'
            });
          }
        })
      },
      submitForm(formName) {
        axios.post(baseUrl+'/changePassword',{
          userId: localStorage.getItem('myId'),
          password: this.ruleForm.pass
        }).then(function (response) {
          this.$refs[formName].validate((valid) => {
            if (valid && response.data.succeed) {
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
        })
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
