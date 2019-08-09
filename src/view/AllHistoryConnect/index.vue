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
            <el-table-column prop="status" label="连接状态">
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
    import global from '../../global.vue'
    import axios from 'axios';
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                currentRow: null,
                tableData: [],
                bgColor: {
                    backgroundColor: 'lightblue'
                }
            }
        },
        methods: {
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            getTbaleData() {
                let params = new URLSearchParams();
                params.append('size',this.pageSize);
                params.append('page',this.currentPage);
                axios.post(global.path+'/activeUserHostAccess/getCurrentLinkingByPage',params)
                    .then(res => {
                        this.tableData = res.data.content;
                })
            }
        },
        mounted() {
            this.getTbaleData();
        }
    }
</script>