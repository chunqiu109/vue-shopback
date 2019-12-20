import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/css/global.css'
// 引入字体图标样式
import './assets/css/fonts/iconfont.css'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 引入树形控件
import TreeTable from 'vue-table-with-tree-grid'

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
//axios请求拦截器
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  //为请求头对象添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须returnconfig
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  // console.log(config)
  NProgress.done()
  //在最后必须returnconfig
  return config
})

Vue.prototype.$http = axios

// 定义一个全聚德时间过滤器
Vue.filter('dateFormat', function (orginValue) {
  const date = new Date(orginValue)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDay() + '').padStart(2, '0')
  const hour = (date.getHours() + '').padStart(2, '0')
  const minute = (date.getMinutes() + '').padStart(2, '0')
  const second = (date.getSeconds() + '').padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
