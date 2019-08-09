<template>
    <div>
        <!--<el-table :data="tableData" highlight-current-row @current-change="handleCurrentOne" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">-->
        <!--<el-table-column prop="name" label="服务名">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="port" label="服务端口号">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="host.name" label="主机名">-->
        <!--</el-table-column>-->
        <!--<el-table-column type="expand" label="服务信息">-->
        <!--<template slot-scope="props">-->
        <!--<el-table :data="props.row.services" align="center">-->
        <!--<el-table-column align="center" prop="name" label="服务名"></el-table-column>-->
        <!--<el-table-column align="center" prop="port" label="端口号"></el-table-column>-->
        <!--</el-table>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作" center>-->
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">服务</el-button>-->
        <!--<el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>-->
        <!--<el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <table border="1" cellpadding="0" cellspacing="0" class="user-connect">
            <tr>
            <tr>
                <th rowspan="2">主机名</th>
                <th colspan="2">服务信息</th>
                <th colspan="4">连接信息</th>
                <th rowspan="2">操作</th>
            </tr>
            <tr><th>服务名</th><th>服务端口</th><th>连接服务名</th><th>连接服务端口</th><th>外网IP</th><th>外网端口</th></tr>
            </tr>
            <template v-for="(item,index) in tableData">
                <tr>
                <tr>
                    <td :rowspan="item.ulNodeSASList&&item.ulNodeSASList.length>0?item.ulNodeSASList.length:1">{{item.name}}</td>
                    <td>{{item.ulNodeSASList&&item.ulNodeSASList.length>0?item.ulNodeSASList[0].service.name:'暂无数据'}}</td>
                    <td>{{item.ulNodeSASList&&item.ulNodeSASList.length>0?item.ulNodeSASList[0].service.port:'暂无数据'}}</td>
                    <td>{{item.ulNodeSASList&&item.ulNodeSASList.length>0&&item.ulNodeSASList[0].activeUserHostAccess?item.ulNodeSASList[0].activeUserHostAccess.serviceName:'暂无数据'}}</td>
                    <td>{{item.ulNodeSASList&&item.ulNodeSASList.length>0&&item.ulNodeSASList[0].activeUserHostAccess?item.ulNodeSASList[0].activeUserHostAccess.servicePort:'暂无数据'}}</td>
                    <td>{{item.ulNodeSASList&&item.ulNodeSASList.length>0&&item.ulNodeSASList[0].activeUserHostAccess?item.ulNodeSASList[0].activeUserHostAccess.externalIp:'暂无数据'}}</td>
                    <td>{{item.ulNodeSASList&&item.ulNodeSASList.length>0&&item.ulNodeSASList[0].activeUserHostAccess?item.ulNodeSASList[0].activeUserHostAccess.externalPort:'暂无数据'}}</td>
                    <td class="connect-unConnect" @click="unConnect(index,0)">{{item.ulNodeSASList&&item.ulNodeSASList.length>0&&item.ulNodeSASList[0].activeUserHostAccess?'断开':'连接'}}</td>
                </tr>
                <tr v-if="item.ulNodeSASList&&item.ulNodeSASList.length>0&&i>0" v-for="(it,i) in item.ulNodeSASList">
                    <td>{{it.service.name}}</td>
                    <td>{{it.service.port}}</td>
                    <td>{{it.activeUserHostAccess?it.activeUserHostAccess.serviceName:'暂无数据'}}</td>
                    <td>{{it.activeUserHostAccess?it.activeUserHostAccess.servicePort:'暂无数据'}}</td>
                    <td>{{it.activeUserHostAccess?it.activeUserHostAccess.externalIp:'暂无数据'}}</td>
                    <td>{{it.activeUserHostAccess?it.activeUserHostAccess.externalPort:'暂无数据'}}</td>
                    <td class="connect-unConnect" @click="unConnect(index,i)">{{it.activeUserHostAccess?'断开':'连接'}}</td>
                </tr>
                </tr>
            </template>
        </table>
    </div>
</template>

<script>
    import global from '../../global.vue';
    import axios from 'axios';
    require('!style-loader!css-loader!./index.css');
    export default {
        data() {
            return {
                loginName: '',
                tableData: [],
                externalMap: [], //获取连接服务的外网
                currentRow: null,
                bgColor: {
                    backgroundColor: 'lightblue'
                },
                timer: true,
            }
        },
        methods:{
            unConnect(index,i){
                let that = this;
                if(!this.timer) {
                    return;
                }
                this.timer = false;
                setTimeout(function() {
                    that.connOrUn(index,i);
                },1000);
            },
            connOrUn(index,i) {
                if(this.tableData[index].ulNodeSASList[i].activeUserHostAccess) {
                    let params = new URLSearchParams();
                    params.append('serviceId',this.tableData[index].ulNodeSASList[i].service.id)
                    axios.post(global.path+'/user/breakService',params)
                        .then(res => {
                        this.timer = true;
                        if(res.data.data) {
                            this.$alert('断开成功');
                            this.getConnectData();
                        } else {
                            this.$alert('断开失败');
                        }
                    })
                } else {
                    let params = new URLSearchParams();
                    params.append('serviceId',this.tableData[index].ulNodeSASList[i].service.id)
                    axios.post(global.path+'/user/linkService',params)
                        .then(res => {
                        this.timer = true;
                        if(res.data.data) {
                            this.$alert('连接成功');
                            this.getConnectData();
                    } else {
                            this.$alert('连接失败');
                    }
                    })
                }
            },
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            getConnectData() {
                axios.get(global.path+'/user/getUserAndStatusMergeByHost')
                    .then(res => {
                    this.tableData = res.data.data.ulmNodeHosts;
                this.loginName = res.data.data.loginName;
            })
            }
        },
        mounted() {
            this.getConnectData();
        }
    }
</script>