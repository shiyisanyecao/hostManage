<template>
    <div id="app">
        <header-com v-show="!(path==='/login')"></header-com>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件 -->
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件 -->
        </router-view>
        <!--<router-view></router-view>-->
    </div>
</template>

<script>
import HeaderCom from './component/Header/index'
require('!style-loader!css-loader!./assets/style/index.css');
require('!style-loader!css-loader!element-theme-chalk');
require('!style-loader!css-loader!element-ui/lib/theme-chalk/index.css');

export default {
    name: 'App',
    data() {
        return {
            path: ''
        }
    },
    mounted() {
      this.path = this.$route.path;
    },
    watch: {
        $route(to,from) {
            this.path = to.path;
        }
    },
    components: {
        HeaderCom
    }
}
</script>

<style scoped>
</style>
