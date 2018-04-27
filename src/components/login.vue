<template>
  <login @submit="login" style="border: 1px solid #000;" :logining="loginded" :imgsrc="imgurl">
    <div slot="title">登录</div>
  </login>
</template>
<script>
    import login from './logintest.vue'
    export default {
        components:{
            login
        },
        data () {
            return {
              loginded:false,
              imgurl:'123'

            }
        },
        methods: {
            login:function (params) {

            }
        }
    };
</script>




