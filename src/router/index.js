import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import roles from '../components/power/Roles'
import Categories from '../components/goods/Categories'
import Params from '../components/goods/Params'
import Goods from '../components/goods/Goods'
import Add from '../components/goods/Add'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  // 注意：在这里会有一个坑报错TypeError，原因是把component写成了components
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      //组件中的子组件，类似于之前常用的路由形式，在要显示的位置写上路由占位符
      //这种形式一般用在嵌套中，也就是说在一个页面中套另一个页面
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: roles },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: Add }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
//  to 将要访问的路径
//  from 代表从那个路径跳转而来
//  next 是一个函数，表示放行
//  next()放行，next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const token = window.sessionStorage.getItem('token')
  //console.log(token)
  if (!token) return next('/login')
  next()
})

export default router
