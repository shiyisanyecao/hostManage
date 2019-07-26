<template>
    <div>
        <el-tabs tab-position="left" type="card" v-model="activeName" @tab-click="paneClick">
            <el-tab-pane name="user">
                <span slot="label">
                    用户管理
                </span>
                <router-view></router-view>
            </el-tab-pane>
            <el-tab-pane label="manage">
                <span slot="label">
                    主机管理
                </span>
                <router-view></router-view>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
require('!style-loader!css-loader!./index.css');
// import HeaderCom from '../../component/Header'
import UserInfo from '../UserInfo'
import HostInfo from '..//HostInfo'
export default {
    data() {
        return {
            activeName: 'user'
        }
    },
    created() {
        this.activeName = this.$route.name;
    },
    components: {
        UserInfo,HostInfo
    },
    methods: {
        paneClick(tab,event) {
            if(this.activeName == 'user') {
                this.$router.push({path:'/managerpage/user'})
            } else {
                this.$router.push({path:'/managerpage/manage'})
            }
        }
    }
}
</script>