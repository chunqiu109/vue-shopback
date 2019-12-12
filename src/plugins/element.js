import Vue from 'vue'
// 插件中用到哪些组件就需要导入哪些组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup
} from 'element-ui'

// 将上边导入的组件注册到vue中
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)

// 将Message挂载到vue中，相当于给vue增加了一个属性$message
Vue.prototype.$message = Message
