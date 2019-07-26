<template>
    <div>
        <el-dialog :visible.sync="connect.status" :before-close="handleClose" style="text-align:center">
            <el-table :data="connectInfo" :header-cell-style="bgColor" border style="width:100%;overflow:hidden">
                <el-table-column prop="loginName" label="连接用户">
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="externalIp" label="外网IP">
                </el-table-column>
                <el-table-column prop="externalPort" label="外网端口">
                </el-table-column>
                <el-table-column label="操作" center>
                    <template slot-scope="scope">
                        <el-button @click="unConnect(scope.row)" type="text" size="small">断开连接</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                bgColor: {
                    backgroundColor: 'lightblue'
                }
            }
        },
        props: ['connect','connectInfo'],
        mounted() {

        },
        methods: {
            deleteCommit(id) {
                console.log(id,'=-=-=--=-=-=')
                let params = new URLSearchParams();
                params.append('activeUserHostAccessId',id);
                axios.post('http://localhost:8080/service/brokenLink',params)
                    .then(res => {
                        console.log(res,'==--==--=')
                })
            },
            unConnect(row) {
                console.log(row,'==--==---==')
                this.$alert('确定断开吗','',{
                    confirmButtonText: '确定',
                    callback: () => {
                    this.deleteCommit(row.id)
                }
                })
            },
            handleClose(done) {
                done();
            }
        }
    }
</script>