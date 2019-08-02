<template>
    <div>
        <el-table :data="tableData" highlight-current-row @current-change="handleCurrentOne" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">
            <el-table-column prop="name" label="服务名">
            </el-table-column>
            <el-table-column prop="port" label="服务端口号">
            </el-table-column>
            <el-table-column prop="host.name" label="主机名">
            </el-table-column>
            <el-table-column type="expand" label="服务信息">
                <template slot-scope="props">
                    <el-table :data="props.row.services" align="center">
                        <el-table-column align="center" prop="name" label="服务名"></el-table-column>
                        <el-table-column align="center" prop="port" label="端口号"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="操作" center>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">服务</el-button>
                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                bgColor: {
                    backgroundColor: 'lightblue'
                }
            }
        },
        methods:{
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            getConnectData() {
                axios.get('http://localhost:8080/user/getUser')
                    .then(res => {
                        this.tableData = res.data.data.services;
                })
            }
        },
        mounted() {
            this.getConnectData();
        }
    }
</script>