<template>
    <div class="user-info">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="登录名：">
                <el-input v-model="form.loginName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名：">
                <el-input @input="toAble" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :disabled="abled">确定</el-button>
                <el-button @click="editReset('form')">取消</el-button>
            </el-form-item>
        </el-form>
        <!--<table border="1" cellspacing="0" cellpadding="0">-->
            <!--<tr>-->
                <!--<th>班级</th>-->
                <!--<th>姓名</th>-->
                <!--<th>性别</th>-->
                <!--<th>学号</th>-->
            <!--</tr>-->
            <!--<tr>-->
                <!--<td  rowspan="2">201班</td><td>张三</td><td>man</td><td>001</td>-->
            <!--</tr>-->
            <!--<tr>-->
                <!--<td>张sam</td><td>man</td><td>002</td>-->
            <!--</tr>-->
        <!--</table>-->
    </div>
</template>

<script>
    import axios from 'axios';
    require('!style-loader!css-loader!./index.css');
    export default {
        data() {
            return {
                rules: {
                    name: [
                        { required: true, message: '请输入主机名', trigger: 'blur' }
                    ]
                },
                abled: true,
                form: {}
            }
        },
        methods: {
            toAble() {
                this.abled = false;
            },
            editReset(form) {
                this.$refs.form.resetFields();
            },
            onSubmit(formName) {
                if(this.form.name){
                    let params = new URLSearchParams();
                    params.append('name',this.form.name);
                    axios.post('http://localhost:8080/user/updateName',params)
                        .then(res => {
                            if(res.data.data) {
                                this.$alert('编辑用户名成功');
                    } else {
                                this.$alert('编辑用户名失败');
                    }
                    })
                }
            },
            getInfo() {
                axios.get('http://localhost:8080/user/getUser')
                    .then(res => {
                    this.form = res.data.data;
                })
            }
        },
        mounted() {
            this.getInfo();
        }
    }
</script>