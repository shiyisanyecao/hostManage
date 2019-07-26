<template>
    <div>
        <el-dialog :visible.sync="editExternalMaps.status" :before-close="handleClose">
            <el-form :model="externalmaps" :rules="editrules" ref="externalmaps" label-width="120px">
                <el-form-item label="外网映射IP" prop="ip" required>
                    <el-input @input="toAble" v-model="externalmaps.ip"></el-input>
                </el-form-item>
                <el-form-item label="外网映射端口" prop="port" required>
                    <el-input @input="toAble" v-model="externalmaps.port"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="disable" @click="editSubmit('externalmaps')">完成</el-button>
                    <el-button @click="editReset('externalmaps')">重置</el-button>
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
                editrules: {
                    ip: [
                        { required: true, message: '请输入主机端口', trigger: 'blur' }
                    ],
                    port: [
                        { required: true, message: '请输入主机端口', trigger: 'blur' }
                    ]
                },
                disable: true,
            }
        },
        props: ['editExternalMaps','externalmaps'],
        methods: {
            handleClose(done) {
                done();
            },
            postEditMess() {
                let params = new URLSearchParams();
                params.append('ip',this.externalmaps.ip);
                params.append('port',this.externalmaps.port);
                params.append('id',this.externalmaps.id);
                axios.post('http://localhost:8080/externalMap/updateExternalMap',params)
                    .then((res)=>{
                    if(res.data == 1) {
                    this.editExternalMaps.status = false;
                    this.disable = true;
                    this.$emit('editRefresh','')
                } else if(res.data == 2) {
                    this.$alert('您未做任何改变')
                } else if(res.data == -1) {
                    this.$alert('已经存在该外网')
                } else {
                    this.$alert('更新失败')
                }
            })
            },
            editSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.postEditMess();
                    }
                })
            },
            editReset(externalmaps) {
                this.$refs.externalmaps.resetFields();
            },
            toAble() {
                this.disable = false;
            },
        }
    }
</script>