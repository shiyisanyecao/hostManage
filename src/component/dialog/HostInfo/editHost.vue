<template>
    <div>
        <el-dialog :visible.sync="editVisible.status" :before-close="handleClose">
            <el-form :model="editinfo" :rules="editrules" ref="editinfo" label-width="100px">
                <el-form-item label="主机IP" prop="ip" required>
                    <el-input v-model="editinfo.ip" width="200px"></el-input>
                </el-form-item>
                <el-form-item label="主机管理员" prop="manager" required>
                    <el-input v-model="editinfo.manager"></el-input>
                </el-form-item>
                <el-form-item label="主机名" prop="name" required>
                    <el-input v-model="editinfo.name"></el-input>
                </el-form-item>
                <el-form-item label="主机密码" prop="passwordInfo" required>
                    <el-input v-model="editinfo.passwordInfo"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editSubmit('editinfo')">完成</el-button>
                    <el-button @click="editReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import global from '../../../global.vue'
    import axios from 'axios'
    export default {
        data() {
            return {
                ifVisible: this.editVisible,
                editrules: {
                    ip: [
                        { required: true, message: '请输入主机IP', trigger: 'change' }
                    ],
                    manager: [
                        { required: true, message: '请输入主机IP', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入主机IP', trigger: 'change' }
                    ],
                    passwordInfo: [
                        { required: true, message: '请输入主机IP', trigger: 'change' }
                    ],
                },
            }
        },
        props: ['editinfo','editVisible'],
        methods: {
            handleClose(done){
                done();
            },
            editReset() {
                this.$refs.editinfo.resetFields();
            },
            postEditMess() {
                let params = new URLSearchParams();
                params.append('ip',this.editinfo.ip);
                params.append('id',this.editinfo.id);
                params.append('name',this.editinfo.name);
                params.append('manager',this.editinfo.manager);
                params.append('passwordInfo',this.editinfo.passwordInfo);
                // console.log(params,'kkk')
                axios.post(global.path+'/host/updateHost',params)
                    .then((res)=>{
                    if(res.data == 1) {
                    this.$alert('修改成功', '', {
                        confirmButtonText: '确定',
                        callback: () => {
                        this.$emit('editHost','')
                }
                });
                } else if(res.data == 2) {
                    this.$alert('并没有修改任何数据');
                } else if(res.data == -1) {
                    this.$alert('已经存在当前IP的主机，修改失败');
                }
            })
            },
            editSubmit(editform) {
                this.$refs[editform].validate((valid) => {
                    this.postEditMess();
                    this.editVisible.status = false;
                    // this.disable = true;
                })
            },
        }
    }
</script>