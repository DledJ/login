import Login from './logintest.vue'


 const login = function(Vue) {
    Vue.component(Login.name, Login)
  }

// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  login(window.Vue);
}

export default{
  login
}
