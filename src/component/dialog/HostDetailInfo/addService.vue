<template>
    <div>
        <el-dialog :visible.sync="addServiceVisible.status" :before-close="handleClose">
            <el-form :model="addserviceform" :rules="addrules" ref="addserviceform" label-width="100px">
                <el-form-item label="服务名" prop="name" required>
                    <el-input v-model="addserviceform.name" width="200px"></el-input>
                </el-form-item>
                <el-form-item label="端口号" prop="port" required>
                    <el-input v-model="addserviceform.port"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addSubmit('addserviceform')">完成</el-button>
                    <el-button @click="addReset">取消</el-button>
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
                addrules: {
                    name: [
                        {required: true, message: '请输入服务名', trigger: 'blur'}
                    ],
                    port: [
                        {required: true, message: '请输入端口号', trigger: 'blur'}
                    ]
                },
                addserviceform: {
                    name: '',
                    port: ''
                },
            }
        },
        props: ['addServiceVisible'],
        methods: {
            addReset() {
                this.addServiceVisible.status = false;
            },
            postAddServiceMess() {
                let params = new URLSearchParams();
                params.append('name',this.addserviceform.name);
                params.append('port',this.addserviceform.port);
                params.append('hostId',this.$route.params.hostId);
                axios.post(global.path+'/service/addService',params)
                    .then((res)=>{
                    if(res.data == -1) {
                    alert('已经存在该服务,编辑失败','')
                }else {
                    if(res.data == 1) {
                        this.$alert('添加服务成功', '', {
                            confirmButtonText: '确定',
                            callback: () => {
                        this.$refs.addserviceform.resetFields();
                        this.$emit('getAddService','')
                        this.$router.push({ name: 'hostdetailinfo' })
                    }
                    });
                    }else {
                        alert('编辑失败')
                    }
                }
            })
            },
            handleClose(done){
                done();
            },
            addSubmit(addserviceform) {
                if(!this.addserviceform.name) {
                    this.$alert('服务名不能为空')
                    return false;
                }
                if(!this.addserviceform.port) {
                    this.$alert('主机号不能为空')
                    return false;
                }
                this.$refs[addserviceform].validate((valid) => {
                    this.postAddServiceMess();
                this.addServiceVisible.status = false;
            })
            },
        }
    }
</script>