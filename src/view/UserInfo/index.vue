<template>
    <div>
        <div class="user-title">
            <div class="user-info">用户信息</div>
            <div class="user-button">
                <el-button size="mini" @click="addUserInfo()">添加用户</el-button>
                <!--<el-button type="primary" size="mini" @click="back()">返回</el-button>-->
            </div>
        </div>
        <el-table :data="userinfo" highlight-current-row @current-change="handleCurrentOne" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">
            <el-table-column prop="name" label="用户名">
            </el-table-column>
            <el-table-column prop="loginName" label="登录名">
            </el-table-column>
            <el-table-column label="操作" center>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editClick(scope.row)" type="text" size="small">修改密码</el-button>
                    <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1, 5, 10, 20, 40]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
        <add-user :addVisible.sync="addVisible" v-on:refresh="refresh"></add-user>
        <edit-pass :editVisible.sync="editVisible" :userId.sync="userId"></edit-pass>
    </div>
</template>

<script>
    import editPass from '../../component/dialog/UserInfo/editPassword'
    import addUser from '../../component/dialog/Index/addUser'
    require('!style-loader!css-loader!./index.css')
    import axios from 'axios'
    export default {
        data() {
            return {
                currentRow: null,//高亮行
                userId: '',//修改密码需要的用户ID
                editVisible: {
                  status: false
                },//修改密码控件
                addVisible:{
                    status: false,
                }, //添加用户控件
                userinfo: [],
                bgColor: {
                    backgroundColor:'lightblue'
                },
                total: 0,
                currentPage:1, //初始页
                pagesize:10,    //每页的数据
            }
        },
        components: {
            addUser, editPass
        },
        methods: {
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            editClick(row) {
                this.editVisible.status = true;
                this.userId = row.id;
            },
            // back() {
            //   this.$router.go(-1);
            // },
            refresh() {
                this.getUserData();
            },
            addUserInfo() {
                this.addVisible.status = true;
            },
            deleteCommit(id) {
                let params = new URLSearchParams();
                params.append('userId',id);
                axios.post('http://localhost:8080/user/deleteUser',params)
                    .then(res => {
                    this.getUserData();
                })
            },
            deleteClick(row) {
                this.$alert('确认删除吗？','',{
                    confirmButtonText: '确定？',
                    callback: () => {
                    this.deleteCommit(row.id);
            }
            })
            },
            getUserData() {
                let params = new URLSearchParams();
                params.append('page',this.currentPage);
                params.append('size',this.pagesize);
                axios.post('http://localhost:8080/user/getUserByPage',params)
                    .then(res => {
                    this.userinfo = res.data.content;
                this.total = res.data.totalElements;
                })
            },
            handleClose(done){
                done();
            },
            handleSizeChange: function (pagesize) {
                this.pagesize = pagesize;
                this.getUserData();
                console.log('每页显示的数据',this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getUserData();
                console.log('第n页',this.currentPage)  //点击第几页
            }
        },
        mounted() {
            this.getUserData();
        }
    }
</script>