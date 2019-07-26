<template>
    <div>
        <el-dialog :visible.sync="editServiceVisible.status" :before-close="handleClose">
            <el-form :model="editserviceform" :rules="editrules" ref="editserviceform" label-width="100px">
                <el-form-item label="服务名" prop="name" required>
                    <el-input @input="toAble" v-model="editserviceform.name" width="200px"></el-input>
                </el-form-item>
                <el-form-item label="端口号" prop="port" required>
                    <el-input @input="toAble" v-model="editserviceform.port"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="disable" @click="editSubmit('editserviceform')">完成</el-button>
                    <el-button @click="editReset">重置</el-button>
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
            disable: true,
            editrules: {
                name: [
                    { required: true, message: '请输入主机名', trigger: 'blur' }
                ],
                port: [
                    { required: true, message: '请输入主机端口', trigger: 'blur' }
                ]
            }
        }
    },
    props: ['editserviceform','editServiceVisible'],
    methods: {
        toAble() {
            this.disable = false;
        },
        editReset() {
            this.$refs.editserviceform.resetFields();
        },
        postEditServiceMess() {
            let params = new URLSearchParams();
            params.append('name',this.editserviceform.name);
            params.append('port',this.editserviceform.port);
            params.append('id',this.editserviceform.id);
            axios.post('http://localhost:8080/service/updateService',params)
                .then((res)=>{
                if(res.data==1) {
                this.$alert('编辑服务成功', '', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.$router.push({ name: 'hostdetailinfo' })
                }
            });
            }else if(res.data == 2) {
                this.$alert('并没有修改任何数据');
            } else if(res.data == -1) {
                this.$alert('已经存在当前IP的主机，修改失败');
            }
        })
        },
        editSubmit(editserviceform) {
            this.$refs[editserviceform].validate((valid) => {
                if(valid) {
                    this.postEditServiceMess();
                    this.editServiceVisible.status = false;
                    this.disable = true;
                }
            })
        },
        handleClose(done){
            done();
        },
    }
}
</script>