<template>
    <div>
        <el-dialog :visible.sync="addUser.status" :before-close="handleClose" style="text-align: center">
            <el-input style="width:100%;margin-bottom:10px;" v-model="searchforlogin" prefix-icon="el-icon-search" @keyup.enter.native="searchForLogin" placeholder="按登录名搜索"></el-input>
            <!--<el-input style="width:40%;margin-bottom:10px;" v-model="searchforuser" prefix-icon="el-icon-search" @keyup.enter.native="searchForName" placeholder="按用户名搜索"></el-input>-->
            <el-table :data="userinfo" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">
                <el-table-column prop="name" label="用户名">
                </el-table-column>
                <el-table-column prop="loginName" label="登录名">
                </el-table-column>
                <el-table-column label="操作" center>
                    <template slot-scope="scope">
                        <el-button @click="addClick(scope.row)" type="text" size="small">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                bgColor: {
                    backgroundColor: 'lightblue'
                },
                searchforlogin: '',
                searchforuser: '',
                userinfo: []
            }
        },
        props: ['addUser','serviceInfo'],
        methods: {
            loginNameSearch() {
                let params = new URLSearchParams();
                params.append('loginName',this.searchforlogin);
                axios.post('http://localhost:8080/user/getUserByLoginName',params)
                    .then(res => {
                        this.userinfo = res.data;
                })
            },
            // userNameSearch() {
            //     let params = new URLSearchParams();
            //     params.append('name',this.searchforuser);
            //     axios.post('http://localhost:8080/user/findUserByName',params)
            //         .then(res => {
            //         this.userinfo = res.data;
            // })
            // },
            // searchForName() {
            //     if(!this.searchforuser) {
            //         this.$alert('不存在用户名为空的用户');
            //         return false;
            //     } else {
            //         this.userNameSearch();
            //     }
            // },
            searchForLogin() {
                if(!this.searchforlogin) {
                    this.$alert('不存在登录名为空的用户');
                    return false;
                } else {
                    this.loginNameSearch();
                }
            },
            handleClose(done){
                done();
                this.searchforlogin = '';
                this.userinfo = [];
            },
            addClick(row) {
                let params = new URLSearchParams();
                params.append('serviceId',this.serviceInfo.id);
                params.append('userId',row.id);
                axios.post('http://localhost:8080/service/addUserToService',params)
                    .then(res => {
                        if(res.data == 1) {
                            this.$alert('添加成功');
                            this.$emit('addUser','')
                            this.addUser.status = false;
                            this.searchforlogin = '';
                            this.userinfo = [];
                } else if(res.data == -1) {
                            this.$alert('该用户已存在于service中');
                    this.addUser.status = false;
                } else {
                            this.$alert('添加失败');
                    this.addUser.status = false;
                }
                })
            }
        }
    }
</script>

<style>
</style>