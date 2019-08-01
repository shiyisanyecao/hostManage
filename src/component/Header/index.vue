<template>
    <div class="header-com">
        <span></span>
        <span @click="quit">退出</span>
    </div>
</template>
<script>
    import axios from 'axios';
    require('!style-loader!css-loader!./index.css');
    export default {
        data() {
            return {
            }
        },
        methods: {
            deleteUser() {
                axios.get('http://localhost:8080/user/quit')
                    .then(res => {
                    if(res.data.data) {
                        this.$alert('退出成功');
                        this.$router.push('/');
                } else {
                        this.$alert('退出失败');
                }
                })
            },
            deleteManager() {
                axios.get('http://localhost:8080/host/quit')
                    .then(res => {
                    if(res.data) {
                    this.$alert('退出成功');
                    this.$router.push('/')
                } else {
                    this.$alert('退出失败')
                }
            })
            },
            quit() {
                if(localStorage.getItem('status') == 'user') {
                    this.$alert('确认退出吗？','',{
                        confirmButtonText: '确定？',
                        cancelButtonText: '取消'
                    }).then(() => {
                        this.deleteUser();
                }).catch(() => {
                        this.$alert('已取消退出登录')
                    })

                } else if(localStorage.getItem('status') == 'manager') {
                    this.$alert('确认退出吗？','',{
                        confirmButtonText: '确定？',
                        cancelButtonText: '取消'
                    }).then(() => {
                        this.deleteManager();
                }).catch(() => {
                        this.$alert('已取消退出登录')
                    })
                }
            }
        }
    }
</script>