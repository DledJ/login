<template>
    <div class="login-con" @keydown.enter="handleSubmit">
        <Card :bordered="false">
            <slot name="title"></slot>
            <div class="form-con">
                <Form ref="loginForm" :model="form" :rules="rules">
                    <FormItem prop="userName">
                        <Input v-model="form.userName" placeholder="请输入用户名">
                        <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="form.password" placeholder="请输入密码">
                        <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                  <FormItem prop="code" style="position: relative;">
                    <Input type="text" v-model="form.code" placeholder="请输入校验码"  style="width: 40%;">
                      <span slot="prepend">
                          <Icon :size=" 14" type="locked"></Icon>
                      </span>
                    </Input>
                    <div class="codeClass" @click="changeImg"><img :src="codesrc" alt=""></div>
                  </FormItem>
                    <slot></slot>
                    <FormItem>
                        <Button @click="handleSubmit" type="primary" long :class="{disabled:login}">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>

</template>
<script>
    export default {
        name:'login',
        props:{
          logining:Boolean,
          imgsrc:String
        },
      computed:{
          login:function () {
            return this.logining
          }
      },
        data () {
          const validateCode = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入校验码'));
            } else {
              let reg =  /^\d{4,6}$/
              if (!reg.test(value)) {
                // 对第二个密码框单独验证
                callback(new Error('请输入正确的校验码'));
              }
              callback();
            }
          };
          const validatePass = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入密码'));
              } else {
                  let reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/
                  if (!reg.test(value)) {
                      // 对第二个密码框单独验证
                      callback(new Error('请输入正确的密码'));
                  }
                  callback();
              }
          };

            return {
                codesrc:this.imgrul,
                form: {
                    userName: '',
                    password: '',
                    code:''
                },
                rules: {
                    userName: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }

                    ],
                    password: [
                        { validator:validatePass, trigger:'blur'}
                    ],
                    code: [
                        { validator:validateCode, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.logining = true
                        this.$emit('submit',this.form)
                    }
                });
            },
            changeImg () {
              this.codesrc = this.imgrul+'?d='+ new Date().getTime()
            }

        }
    };
</script>

<style>
    .form-con{
        padding: 10px 0 0;
    }
    .login-con{
        width: 300px;}
    .codeClass{
      position:absolute;top:0;right:0;width: 35%;height: 30px;border: 1px solid #000;
    }
    .disabled{
      pointer-events: none;
      background-color: #eee;
    }
</style>
