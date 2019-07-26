<template>
    <div>
        <div class="service-title">
            <div class="service-info">服务信息</div>
            <div class="service-button">
                <el-button size="mini" @click="addService()">添加服务</el-button>
                <el-button type="primary" size="mini" @click="back()">返回</el-button>
            </div>
        </div>
        <el-table :data="tableData" highlight-current-row @current-change="handleCurrentOne" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">
            <el-table-column prop="name" label="服务名">
            </el-table-column>
            <el-table-column prop="port" label="服务端口号">
            </el-table-column>
            <el-table-column label="操作" center>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editService(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteService(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="seeConnect(scope.row)" type="text" size="small">查看连接</el-button>
                </template>
            </el-table-column>
        </el-table>
        <edit-service-dialog :editServiceVisible.sync="editServiceVisible" :editserviceform.sync="editserviceform"></edit-service-dialog>
        <add-service-dialog :addServiceVisible.sync="addServiceVisible" v-on:getAddService="getAddService"></add-service-dialog>
        <see-connect-dialog :connect.sync="connect" :connectInfo.sync="connectInfo"></see-connect-dialog>
    </div>
</template>

<script>
    import seeConnectDialog from '../../component/dialog/HostDetailInfo/seeConnect'
    import addServiceDialog from '../../component/dialog/HostDetailInfo/addService'
    import editServiceDialog from '../../component/dialog/HostDetailInfo/editService'
    import axios from 'axios';
    require('!style-loader!css-loader!./index.css')
    export default {
        data() {
            return {
                connectInfo: [],//连接信息
                connect: {
                    status: false
                },//查看连接控件
                isFirstEnter: false,
                currentRow: null,
                disable: true,
                bgColor: {
                    backgroundColor:'lightblue'
                },
                editserviceform: {
                    name: '',
                    port: ''
                },
                editServiceVisible: {
                    status: false
                }, //编辑服务弹窗控制
                addServiceVisible: {
                    status: false
                }, //添加服务弹窗
                host:{
                    ip:'',
                    id:'',
                    manage:'',
                    name:'',
                    password:''
                },
                currentPage:1, //初始页
                pagesize:10,    //每页的数据
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        components: {
            addServiceDialog, editServiceDialog, seeConnectDialog
        },
        beforeRouteEnter(to, from, next) {
            // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
            // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
            // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
            // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
            if(from.name=='servicedetail'){
                to.meta.isBack=true;
                //判断是从哪个路由过来的，
                //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
            }
            next();
        },
        activated() {
            if(!this.$route.meta.isBack || this.isFirstEnter){
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
                this.getHostService();
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack=false;
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter=false;

        },
        created() {
            this.isFirstEnter=true;
            // 只有第一次进入或者刷新页面后才会执行此钩子函数
            // 使用keep-alive后（2+次）进入不会再执行此钩子函数
        },
        methods: {
            seeConnect(row) {
                this.connect.status = true;
                let params = new URLSearchParams();
                params.append('serviceId',row.id);
                axios.post('http://localhost:8080/service/getRunningAUHAByServiceId', params)
                    .then(res => {
                    this.connectInfo = res.data;
            })
            },
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            getAddService() {
              this.getHostService();
            },
            back(){
              this.$router.go(-1);
            },
            editService(row) {
                this.editserviceform = row;
                this.editServiceVisible.status = true;
            },
            handleClick(row) {
                this.$router.push({
                    name: 'servicedetail',
                    params: {
                        serviceId: row.id
                    }
                })
            },
            // 添加服务
            addService() {
                this.addServiceVisible.status = true;
            },
            deleteCommit(id) {
                let params = new URLSearchParams();
                params.append('serviceId',id);
                axios.post('http://localhost:8080/service/deleteService',params)
                    .then(res => {
                        // console.log(res,'hahaha');
                        this.getHostService();
                })
            },
            // 删除服务
            deleteService(row) {
                this.$alert('确认删除?', '', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.deleteCommit(row.id)
                }
            });
            },
            getHostService() {
                let params = new URLSearchParams();
                params.append('hostId',this.$route.params.hostId);
                axios.post('http://localhost:8080/host/getHostById',params)
                    .then((res) => {
                        this.tableData = res.data.services;
                        this.host.id = res.data.id;
                        this.host.ip = res.data.ip;
                        this.host.manage = res.data.manager;
                        this.host.name = res.data.name;
                        this.host.password = res.data.passwordInfo;
                })
            }
        },
        mounted() {
            this.getHostService();
        }
    }
</script>

<style lang="less" scoped>

</style>