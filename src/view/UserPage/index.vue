<template>
  <div>
    <el-tabs tab-position="left" type="card" v-model="activeName" @tab-click="paneClick">
      <el-tab-pane name="information">
          <span slot="label">
              个人信息
          </span>
          <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="connect">
          <span slot="label">
              查看连接
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
            activeName: ''
          }
      },
    methods: {
      paneClick(tab,event) {
        if(this.activeName == 'information') {
          this.$router.push({path:'/userpage/information'})
        } else {
          this.$router.push({path:'/userpage/connect'})
        }
      }
    }
  }
</script>