<template>
    <div>
        <el-dialog :visible.sync="addVisible.status" :before-close="handleClose">
            <el-form :model="addform" :rules="addrules" ref="addform" label-width="100px">
                <el-form-item label="登录名" prop="loginname" required>
                    <el-input v-model="addform.loginname" width="200px"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username" required>
                    <el-input v-model="addform.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" required>
                    <el-input v-model="addform.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addSubmit('addform')">完成</el-button>
                    <el-button @click="addReset">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                addrules: {
                    loginname: [
                        { required: true, message: '请输入登录名', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                addform: {
                    loginname: '',
                    username: '',
                    password: ''
                },
            }
        },
        props: ['addVisible'],
        methods: {
            addReset() {
                this.addVisible.status = false;
            },
            postAddMess() {
                if(!this.addform.loginname) {
                    this.$alert('登录名不能为空')
                    return false;
                }
                if(!this.addform.username) {
                    this.$alert('用户名名不能为空')
                    return false;
                }
                if(!this.addform.password) {
                    this.$alert('密码不能为空')
                    return false;
                }
                let params = new URLSearchParams();
                params.append('loginName',this.addform.loginname);
                params.append('name',this.addform.username);
                params.append('password',this.addform.password);
                axios.post('http://localhost:8080/user/addUser',params)
                    .then((res)=>{
                    // console.log(res,'datas')
                    if(res.data) {
                    this.$alert('添加成功', '', {
                        confirmButtonText: '确定',
                        callback: () => {
                        this.$refs.addform.resetFields();
                    this.$emit('refresh','');
                }
                });
                }else {
                        this.$alert('添加失败');
                }
            })
            },
            addSubmit(addform) {
                this.$refs[addform].validate((valid) => {
                    this.postAddMess();
                this.addVisible.status = false;
            })
            },
            handleClose(done){
                done();
            }
        }
    }
</script>