// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
// import VueAxios from 'vue-axios'


axios.defaults.withCredentials = true;
// Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
