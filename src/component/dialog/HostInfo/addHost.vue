<template>
    <div>
        <el-dialog :visible.sync="addVisible.status" :before-close="handleClose">
            <el-form :model="addform" :rules="addrules" ref="addform" label-width="100px">
                <el-form-item label="主机IP" prop="ip" required>
                    <el-input v-model="addform.ip" width="200px"></el-input>
                </el-form-item>
                <el-form-item label="主机管理员" prop="manager" required>
                    <el-input v-model="addform.manager"></el-input>
                </el-form-item>
                <el-form-item label="主机名" prop="name" required>
                    <el-input v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="主机密码" prop="passwordInfo" required>
                    <el-input v-model="addform.passwordInfo"></el-input>
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
                ip: [
                    { required: true, message: '请输入主机IP', trigger: 'blur' }
                ],
                manager: [
                    { required: true, message: '请输入主机管理员', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入主机名', trigger: 'blur' }
                ],
                passwordInfo: [
                    { required: true, message: '请输入主机密码', trigger: 'blur' }
                ],
            },
            addform: {
                ip: '',
                manager: '',
                name: '',
                passwordInfo: ''
            },
        }
    },
    props: ['addVisible'],
    methods: {
        addReset() {
            this.addVisible.status = false;
        },
        postAddMess() {
            let params = new URLSearchParams();
            params.append('ip',this.addform.ip);
            params.append('name',this.addform.name);
            params.append('manager',this.addform.manager);
            params.append('passwordInfo',this.addform.passwordInfo);
            axios.post('http://localhost:8080/host/addHost',params)
                .then((res)=>{
                // console.log(res,'datas')
                if(res.data) {
                this.$alert('添加成功', '', {
                    confirmButtonText: '确定',
                    callback: () => {
                    this.$refs.addform.resetFields();
                    this.$emit('refresh','')
                    this.$router.push({ name: 'hostinfo' })
            }
            });
            }
        })
        },
        addSubmit(addform) {
            if(!this.addform.ip) {
                this.$alert('ip不能为空');
                return false;
            }
            if(!this.addform.manager) {
                this.$alert('管理员不能为空');
                return false;
            }
            if(!this.addform.name) {
                this.$alert('主机名不能为空');
                return false;
            }
            if(!this.addform.passwordInfo) {
                this.$alert('密码不能为空');
                return false;
            }
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