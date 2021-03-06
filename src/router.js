import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'App',
            component: (resolve) => require(['./app.vue'],resolve),
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: (resolve) => require(['./view/Login/index.vue'],resolve)
        },
        {
            path: '/managerpage',
            name: 'managerpage',
            component: (resolve) => require(['./view/ManagerPage/index.vue'],resolve),
            redirect: { name: 'user' },
            children: [
                {
                    path: 'manage',
                    name: 'manage',
                    component: (resolve) => require(['./view/HostInfo/index.vue'],resolve),
                    meta: {
                        keepAlive: true, //此组件需要被缓存
                        isBack: false //判断是否是通过返回按钮进入页面的
                    },
                },{
                    path: 'user',
                    name: 'user',
                    component: (resolve) => require(['./view/UserInfo/index.vue'],resolve),
                    meta: {
                        keepAlive: true, //此组件需要被缓存
                        isBack: false //判断是否是通过返回按钮进入页面的
                    },
                },{
                    path: 'service',
                    name: 'service',
                    component: (resolve) => require(['./view/ServiceInfo/index.vue'],resolve),
                    meta: {
                        keepAlive: true, //此组件需要被缓存
                        isBack: false //判断是否是通过返回按钮进入页面的
                    },
                },{
                    path: 'historyConnect',
                    name: 'historyConnect',
                    component: (resolve) => require(['./view/AllHistoryConnect/index.vue'],resolve),
                    meta: {
                        keepAlive: true, //此组件需要被缓存
                        isBack: false //判断是否是通过返回按钮进入页面的
                    },
                }
            ]
         },
        {
            path: '/userpage',
            name: 'userpage',
            component: (resolve) => require(['./view/UserPage/index.vue'],resolve),
            redirect: { name: 'information' },
            children: [
            {
                path: 'information',
                name: 'information',
                component: (resolve) => require(['./view/Information/index.vue'],resolve),
                meta: {
                    keepAlive: true, //此组件需要被缓存
                    isBack: false //判断是否是通过返回按钮进入页面的
                },
            },{
                path: 'connect',
                name: 'connect',
                component: (resolve) => require(['./view/Connect/index.vue'],resolve),
                meta: {
                    keepAlive: true, //此组件需要被缓存
                    isBack: false //判断是否是通过返回按钮进入页面的
                }
            },{
                path: 'history',
                name: 'history',
                component: (resolve) => require(['./view/HistoryConnect/index.vue'],resolve),
                meta: {
                    keepAlive: true, //此组件需要被缓存
                    isBack: false //判断是否是通过返回按钮进入页面的
                }
            }
            ]
        },
        {
            path: '/hostdetailinfo',
            name: 'hostdetailinfo',
            component: (resolve) => require(['./view/HostDetailInfo/index.vue'],resolve),
            meta: {
                keepAlive: true, //此组件需要被缓存
                isBack: false
            }
        },
        {
            path: '/servicedetail',
            name: 'servicedetail',
            component: (resolve) => require(['./view/ServiceDetail/index.vue'],resolve)
        }
    ]
})