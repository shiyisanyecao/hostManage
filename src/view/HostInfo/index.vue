<template>
    <div>
        <div class="host-title">
            <div class="host-info">主机信息</div>
            <div class="host-button">
                <el-button size="mini" @click="addHostInfo()">添加主机</el-button>
                <!--<el-button type="primary" size="mini" @click="back()">返回</el-button>-->
            </div>
        </div>
        <!--<table id="table-cell" border="1" cellpadding="0" cellspacing="0" class="table-cell">-->
            <!--<tr>-->
                <!--<tr><th rowspan="2">主机名</th>-->
                <!--<th rowspan="2">主机管理员</th>-->
                <!--<th rowspan="2">主机IP</th>-->
                <!--<th colspan="2">服务信息</th>-->
                <!--<th rowspan="2">操作</th></tr>-->
                <!--<th>服务名</th><th>端口号</th>-->
            <!--</tr>-->
            <!--<template v-for="(item,index) in tableData">-->
            <!--<tr>-->
                <!--<tr>-->
                    <!--<td :rowspan="3">{{item.name}}</td>-->
                    <!--<td :rowspan="3">{{item.manager}}</td>-->
                    <!--<td :rowspan="3">{{item.ip}}</td>-->
                    <!--<td>1121</td>-->
                    <!--<td>1122</td>-->
                    <!--<td :rowspan="3">删除</td>-->
                <!--</tr>-->
                <!--<tr><td>2222</td>-->
                <!--<td>1221</td></tr>-->
                <!--<td>2333</td>-->
                <!--<td>3333</td>-->
            <!--</tr>-->
            <!--</template>-->
        <!--</table>-->
        <el-table :data="tableData" :span-method="colspanMethod" highlight-current-row @current-change="handleCurrentOne" :header-cell-style="bgColor" border style="width: 100%;overflow: hidden">
            <el-table-column prop="name" label="主机名">
            </el-table-column>
            <el-table-column prop="manager" label="主机管理员">
            </el-table-column>
            <el-table-column prop="ip" label="主机IP">
            </el-table-column>
            <el-table-column type="expand" label="服务信息">
                <template slot-scope="scope">
                    <!--{{scope.row.services}}-->
                    <el-table :data="scope.row.services" align="center">
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[ 5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

        <edit-host-dialog :editVisible.sync="editVisible" :editinfo.sync="editform" v-on:editHost="editHost"></edit-host-dialog>
        <add-host-dialog :addVisible.sync="addVisible" v-on:refresh="refresh"></add-host-dialog>

    </div>
</template>

<script>
    import addHostDialog from '../../component/dialog/HostInfo/addHost'
    import editHostDialog from '../../component/dialog/HostInfo/editHost'
    require('!style-loader!css-loader!./index.css');
    import axios from 'axios';
    export default {
        data() {
            return {
                service: [],
                data: {},
                isFirstEnter:false,//是否为第一次进入页面
                currentRow: null,
                bgColor: {
                    backgroundColor:'lightblue'
                },
                editVisible: {
                    status: false
                }, //编辑host弹窗控制
                addVisible: {
                    status: false
                }, //添加主机弹窗控制
                editform: {
                    ip: '',
                    id: '',
                    manager: '',
                    name: '',
                    passwordInfo: ''
                },
                total: 0,
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
            addHostDialog,editHostDialog
        },
        beforeRouteEnter(to, from, next) {
            // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
            // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
            // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
            // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
            if(from.name=='hostdetailinfo'){
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
                this.getHostData();
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
            colspanMethod({ row,column,rowIndex,columnIndex }) {

            },
            handleCurrentOne(val) {
                this.currentRow = val;
            },
            // back(){
            //     this.$router.go(-1);
            // },
            transferDisabled() {
              this.disable = false;
            },
            deleteCommit(id) {
                let params = new URLSearchParams();
                params.append('hostId',id);
                axios.post('http://localhost:8080/host/deleteHost',params)
                    .then(res => {
                    this.getHostData();
            })
            },
            deleteClick(row) {
                this.$alert('确认删除吗？','',{
                    confirmButtonText: '确定？',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.deleteCommit(row.id);
            }).catch(() => {

                })
            },
            refresh(val) {
                this.getHostData();
            },
            editHost(val) {
                this.getHostData();
            },
            handleClose(done){
                done();
            },
            addHostInfo() {
                this.addVisible.status = true;
            },
            editClick(row) {
                this.editVisible.status = true;
                this.editform = row;
            },
          handleClick(row) {
              this.$router.push({
                  name: 'hostdetailinfo',
                  params: {
                      hostId: row.id
                  }
              })
          },
          getHostData() {
              let params = new URLSearchParams();
              params.append('page',this.currentPage);
              params.append('size',this.pagesize);
              axios.post('http://localhost:8080/host/getHostsByPage',params)
                  .then((res)=>{
                      this.tableData = res.data.content;
                      this.total = res.data.totalElements;
              });
          },
            handleSizeChange: function (pagesize) {
                this.pagesize = pagesize;
                this.getHostData();
                console.log('每页显示的数据',this.pagesize);  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getHostData();
                console.log('第n页',this.currentPage);  //点击第几页
            },
            setTableData() {
                let tb = document.getElementById('table-cell');
            }
        },
        mounted() {
            this.getHostData();
            this.setTableData();
        }
    }
</script>

<style>

</style>