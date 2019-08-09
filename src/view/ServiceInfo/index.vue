<template>
    <div>
        <el-table :data="tableData" highlight-current-row @current-change="handleCurrentOne" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">
            <el-table-column prop="hostName" label="主机名">
            </el-table-column>
            <el-table-column prop="hostIp" label="主机IP">
            </el-table-column>
            <el-table-column prop="serviceName" label="服务名">
            </el-table-column>
            <el-table-column prop="servicePort" label="服务端口">
            </el-table-column>
            <el-table-column prop="externalIp" label="外网IP">
            </el-table-column>
            <el-table-column prop="externalPort" label="外网端口">
            </el-table-column>
            <el-table-column prop="loginName" label="用户名">
            </el-table-column>
            <el-table-column prop="userIp" label="用户IP">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column label="操作" center>
                <template slot-scope="scope">
                    <el-button @click="unConnect(scope.row)" type="text" size="small">断开</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[ 5, 10, 20, 40]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import global from '../../global.vue';
    import axios from 'axios';
    export default {
        data() {
            return {
                currentRow: null,
                tableData: [],
                bgColor: {
                    backgroundColor:'lightblue'
                },
                total: 0,
                currentPage:1, //初始页
                pageSize:10,    //每页的数据
            }
        },
        methods: {
            unConnect(row) {
                let params = new URLSearchParams();
                params.append('activeUserHostAccessId',row.id);
                axios.post(global.path+'/service/brokenLink',params)
                    .then(res => {
                        if(res.data == true) {
                            this.$alert('断开成功')
                } else {
                            this.$alert('操作失败')
                }
                })
            },
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            handleSizeChange: function (pageSize) {
                this.pageSize = pageSize;
                this.getHostData();
                console.log('每页显示的数据',this.pagesize);  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getHostData();
                console.log('第n页',this.currentPage);  //点击第几页
            },
            getServiceData() {
                let params = new URLSearchParams();
                params.append('page',this.currentPage);
                params.append('size',this.pageSize);
                axios.post(global.path+'/activeUserHostAccess/getCurrentLinkingByPage',params)
                    .then(res => {
                    this.tableData = res.data.content;
                    this.total = res.data.totalElements;
                })
            }
        },
        mounted() {
            this.getServiceData();
        }
    }
</script>