<template>
    <div class="login-form">
        <el-form ref="logForm" :model="logForm" :rules="loginrules" label-width="80px">
            <el-form-item label="用户名" prop="username" required>
                <el-input v-model="logForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
                <el-input type="password" v-model="logForm.password"></el-input>
            </el-form-item>
            <!--<el-form-item label="用户身份" prop="status" required>-->
                <!--<el-radio-group v-model="logForm.status" size="medium">-->
                    <!--<el-radio label="manager"></el-radio>-->
                    <!--<el-radio label="user"></el-radio>-->
                <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="addSubmit('logForm')">完成</el-button>
                <el-button @click="addReset('logForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
require('!style-loader!css-loader!./index.css')
import axios from 'axios'
export default {
    data() {
        return {
            loginrules: {
                username: [
                    { require:true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { require:true, message: '密码不能为空', trigger: 'blur' }
                ],
                status: [
                    { require:true, message: '请选择身份', trigger: 'change' }
                ]
            },
            logForm: {
                username: '',
                password: '',
                status: ''
            }
        }
    },
    methods: {
        addReset(logForm) {
            this.$refs.logForm.resetFields();
        },
        addSubmit(logForm) {
            this.$refs[logForm].validate((valid) => {
                if(valid) {
                    let params = new URLSearchParams();
                    params.append('loginName',this.logForm.username);
                    params.append('password',this.logForm.password);
                    axios.post('http://locaLhost:8080/user/login',params)
                        .then(res => {
                            if(res.data == -1) {
                                this.$alert('用户不存在')
                    } else if(res.data == 0){
                        this.$alert('密码错误')
                    } else if(res.data == 9) {
                        this.$alert('此账号已被禁用')
                    } else if(res.data == 10) {
                        localStorage.setItem('status','manager');
                        localStorage.setItem('username',this.logForm.username);
                        localStorage.setItem('password',this.logForm.password);
                        this.$router.push({ name: 'managerpage' })
                    } else if(res.data == 11) {
                        localStorage.setItem('status','user');
                        localStorage.setItem('username',this.logForm.username);
                        localStorage.setItem('password',this.logForm.password);
                        this.$router.push({ name: 'userpage' })
                    }
                    })
                }
            })
        }
    }
}
</script>