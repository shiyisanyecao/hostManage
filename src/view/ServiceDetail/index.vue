<template>
    <div>
        <div class="external-title">
            <div class="external-info">服务的外网及用户</div>
            <div class="external-button">
                <el-button type="primary" size="mini" @click="back()">返回</el-button>
            </div>
        </div>
        <el-tabs v-model="serviceData1" type="card" tab-position="left" >
            <el-tab-pane
                    v-for="(item, index) in serviceData"
                    :key="index"
                    :label="item.title"
            >
                <el-table v-show="index==0" :header-cell-style="bgColor" :data="externalMaps" stripe border style="width: 100%;overflow: hidden">
                    <el-table-column prop="ip" label="外网映射IP">
                    </el-table-column>
                    <el-table-column prop="port" label="外网端口号">
                    </el-table-column>
                    <el-table-column label="操作" center>
                        <template slot-scope="scope">
                            <el-button @click="editMapClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteMapClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form v-show="index == 0" style="padding-top:10px;">
                    <el-form-item align="center">
                        <el-button @click="addExternal()">添加外网映射</el-button>
                    </el-form-item>
                </el-form>
                <el-table v-show="index==1" :header-cell-style="bgColor" :data="users" stripe border style="width: 100%;overflow: hidden">
                    <el-table-column prop="loginName" label="登录名">
                    </el-table-column>
                    <el-table-column prop="name" label="用户名称">
                    </el-table-column>
                    <el-table-column label="操作" center>
                        <template slot-scope="scope">
                            <el-button @click="deleteUserClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form v-show="index == 1" style="padding-top:10px;">
                    <el-form-item align="center">
                        <el-button @click="addUsers()">添加用户</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <add-external-maps :addExternalMaps.sync="addExternalMaps" :serviceId.sync="service.id" v-on:addRefresh="addRefresh"></add-external-maps>
        <edit-external-maps :editExternalMaps.sync="editExternalMaps" :externalmaps.sync="externalmaps" v-on:editRefresh="editRefresh"></edit-external-maps>
        <add-user :addUser.sync="addUser" :serviceInfo.sync="service" v-on:addUser="addUserRefresh"></add-user>
    </div>
</template>

<script>
import global from '../../global.vue';
require('!style-loader!css-loader!./index.css');
import addExternalMaps from '../../component/dialog/ServiceDetail/addExternalMaps'
import editExternalMaps from '../../component/dialog/ServiceDetail/editExternalMaps'
import addUser from '../../component/dialog/ServiceDetail/addUser'
import axios from 'axios';
export default {
    data() {
        return {
            addUser: {
                status: false
            },
            addExternalMaps: {
                status: false
            },
            editExternalMaps: {
                status: false
            },
            externalmaps: {},
            service: {}, //服务信息
            hostInfo: {}, //主机信息
            bgColor: {
                backgroundColor:'lightblue'
            },
            externalMaps: [],
            users: [],
            serviceData1: '0',
            serviceData: [{
                title: '外网映射'
            }, {
                title: '用户信息'
            }]
        }
    },
    components: {
        addExternalMaps,editExternalMaps,addUser
    },
    methods: {
        addUsers() {
            this.addUser.status = true;
        },
        deleteUserClick(row) {
            let params = new URLSearchParams();
            params.append('userId',row.id);
            params.append('serviceId',this.service.id);
            axios.post(global.path+'/service/deleteUserFromService',params)
                .then((res) => {
                    if(res.data) {
                        this.$alert('删除成功');
                this.getServiceData();
            } else {
                this.$alert('删除失败');
            }
            })
        },
        addUserRefresh(val) {
            this.getServiceData();
        },
        addRefresh(val) {
            this.getServiceData();
        },
        editRefresh(val) {
            this.getServiceData();
        },
        back() {
          this.$router.go(-1);
        },
        addExternal() {
            this.addExternalMaps.status = true;
        },
        deleteMapClick(row) {
            this.$alert('确认删除吗？','',{
                confirmButtonText: '确定？',
                cancelButtonText: '取消'
            }).then(() => {
                this.deleteCommit(row.id);
        }).catch(() => {

            })
        },
        deleteCommit(id) {
            let params = new URLSearchParams();
            params.append('externalMapId',id);
            axios.post(global.path+'/externalMap/deleteExternalMap',params)
                .then((res) => {
                    if(res.data) {
                this.getServiceData();
            } else {
                        this.$alert('删除失败')
            }
            })
        },
        handleClose(done) {
            done();
        },
        editMapClick(row) {
            this.externalmaps = row;
            this.editExternalMaps.status = true;
        },
        getServiceData() {
            let params = new URLSearchParams();
            params.append('serviceId',this.$route.params.serviceId);
            axios.post(global.path+'/service/getServiceById',params)
                .then(res => {
                    // console.log(res,'...///');
                    this.externalMaps = res.data.externalMaps;
                    this.users = res.data.users;
                    this.hostInfo = res.data.host;
                    this.service.id = res.data.id;
                    this.service.name = res.data.name;
                    this.service.port = res.data.port;
        })
        }
    },
    mounted() {
        this.getServiceData();
    }
}
</script>

<style>

</style>