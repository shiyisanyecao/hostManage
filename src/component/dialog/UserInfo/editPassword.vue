<template>
    <div>
        <el-dialog :visible.sync="editVisible.status" :before-close="handleClose" style="text-align: center;">
            <label>修改密码：</label>
            <el-input type="password" style="width:50%;" v-model="confirmPass"></el-input>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import global from '../../../global.vue'
    import axios from 'axios';
    export default {
        data() {
            return {
                confirmPass: ''
            }
        },
        props: ['editVisible','userId'],
        methods: {
            submit() {
                if(!this.confirmPass) {
                    this.$alert('密码不能为空');
                } else {
                    let params = new URLSearchParams();
                    params.append('newPassword',this.confirmPass);
                    params.append('userId',this.userId);
                    axios.post(global.path+'/user/updateUserPassword',params)
                        .then(res => {
                            if(res.data == 1) {
                                this.$alert('更新成功');
                                this.editVisible.status = false;
                    } else if(res.data == -2) {
                                this.$alert('用户id或用户新密码为空');
                        this.editVisible.status = false;
                    }else if(res.data == -1) {
                        this.$alert('用户不存在');
                        this.editVisible.status = false;
                    } else {
                        this.$alert('更新失败');
                        this.editVisible.status = false;
                    }
                    })
                }
            },
            handleClose(done) {
                done();
                this.confirmPass = '';
            }
        }
    }
</script>