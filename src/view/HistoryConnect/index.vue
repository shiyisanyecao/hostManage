<template>
    <div>
        <el-table :data="tableData" highlight-current-row @current-change="handleCurrentOne" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">
            <el-table-column prop="hostName" label="主机名">
            </el-table-column>
            <el-table-column prop="serviceName" label="服务名">
            </el-table-column>
            <el-table-column prop="servicePort" label="服务端口号">
            </el-table-column>
            <el-table-column prop="externalIp" label="外网IP">
            </el-table-column>
            <el-table-column prop="externalPort" label="外网端口号">
            </el-table-column>
            <el-table-column prop="startTime" label="连接时间">
            </el-table-column>
            <el-table-column prop="endTime" label="断开时间">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <!--<el-table-column label="操作" center>-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
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
                bgColor: {
                    backgroundColor: 'lightblue'
                },
                tableData: [],
                pageSize: 10,
                currentPage: 1,
                total: 0,
                currentRow: null
            }
        },
        methods: {
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            getConnectData() {
                let params = new URLSearchParams();
                params.append('page',this.currentPage);
                params.append('size',this.pageSize);
                axios.post(global.path+'/user/getLinkHistoryByPage',params)
                    .then(res => {
                        this.tableData = res.data.data.content;
                        this.total = res.data.data.totalElements;
                })
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getConnectData();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.getConnectData();
            }
        },
        mounted() {
            this.getConnectData();
        }
    }
</script>