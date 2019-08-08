<template>
  <div>
    <el-tabs tab-position="left" type="card" v-model="activeName" @tab-click="paneClick">
      <el-tab-pane name="information">
          <span slot="label">
              个人信息
          </span>
          <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane name="hasConnect">
          <span slot="label">
              服务连接
          </span>
          <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane name="history">
          <span slot="label">
              历史连接
          </span>
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  require('!style-loader!css-loader!./index.css');
  export default {
      data() {
          return {
            activeName: this.$route.name
          }
      },
    methods: {
      paneClick(tab,event) {
        if(this.activeName == 'information') {
          this.$router.push({path:'/userpage/information'})
        } else if(this.activeName == 'hasConnect'){
          this.$router.push({path:'/userpage/connect'})
        } else if(this.activeName == 'history'){
           this.$router.push({path:'/userpage/history'})
        }
      }
    }
  }
</script>