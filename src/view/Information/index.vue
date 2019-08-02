<template>
    <div>
        <table border="1" cellspacing="0" cellpadding="0">
            <tr>
                <th>班级</th>
                <th>姓名</th>
                <th>性别</th>
                <th>学号</th>
            </tr>
            <tr>
                <td  rowspan="2">201班</td><td>张三</td><td>man</td><td>001</td>
            </tr>
            <tr>
                <td>张sam</td><td>man</td><td>002</td>
            </tr>
        </table>
    </div>
</template>

<script>
    require('!style-loader!css-loader!./index.css');
    export default {
        data() {
            return {

            }
        },
        methods: {
            getInfo() {

            }
        },
        mounted() {
            this.getInfo();
        }
    }
</script>