<template>
    <div>
        <el-dialog :visible.sync="addExternalMaps.status" :before-close="handleClose">
            <el-form :model="addexternalmaps" :rules="addrules" ref="addexternalmaps" label-width="120px">
                <el-form-item label="外网映射IP" prop="ip" required>
                    <el-input v-model="addexternalmaps.ip"></el-input>
                </el-form-item>
                <el-form-item label="外网映射端口" prop="port" required>
                    <el-input v-model="addexternalmaps.port"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addSubmit('addexternalmaps')">完成</el-button>
                    <el-button @click="addCancel('addexternalmaps')">取消</el-button>
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
                    ip: [
                        { required: true, message: '请输入主机ip', trigger: 'blur' }
                    ],
                    port: [
                        { required: true, message: '请输入主机端口', trigger: 'blur' }
                    ]
                },
                addexternalmaps: {},
            }
        },
        props: ['addExternalMaps','serviceId'],
        methods: {
            addSubmit(formName){
                if(!this.addexternalmaps.ip) {
                    this.$alert('ip不能为空');
                    return false;
                }
                if(!this.addexternalmaps.port) {
                    this.$alert('主机号不能为空');
                    return false;
                }
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        let params = new URLSearchParams();
                        params.append('serviceId',this.serviceId);
                        params.append('ip',this.addexternalmaps.ip);
                        params.append('port',this.addexternalmaps.port);
                        axios.post(global.path+'/externalMap/addExternalMap',params)
                            .then((res) => {
                            // console.log(res,'===')
                            if(res.data == 1) {
                            this.addExternalMaps.status = false;
                            this.$emit('addRefresh','');
                        } else if(res.data == -1) {
                            this.$alert('该外网映射已经存在');
                        } else {
                            this.$alert('更新失败')
                        }
                    })
                    }
                })

            },
            handleClose(done) {
                done();
            },
        }
    }
</script>