<!--
自定义组件的配置加载：
  首先在components文件夹下边创建自己的组件（文件名大写，vue的拓展名）
  template标签中填写静态资源，script填写动作，style标签填写样式
  在router的主文件中(index.js)导入自定义组件，并且配置路由映射
  在app.vue文件中添加组件占位符router-view,之后组件的布局就会呈现在相应的位置
-->

<template>
    <div class="login_container">
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
        <!-- 登陆表单区域 -->
        <!-- 登录表单区域 -->
        <!-- el-ui表单验证：
          只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
         -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
          <!-- el-form-item标签会自动修改部分样式，使得各个元素之间的布局美观：比如margin-bottom -->
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  // data的return中的是与form表单中的:model相互绑定的对象，使用v-model来使用对象中的值
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // 在from中定义的ref属性loginFormRef可以使用this.$refs.loginFormRef获取，在调用el-ui中所提供的的方法resetFields()重置表单
      // this表示当前的login.vue
      this.$refs.loginFormRef.resetFields()
    },
    //登录预校验
    login() {
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：
      // 是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      // validate方法中的是一个匿名函数，有一个参数valid,代表是否成功的布尔类型值
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // 1.以下语法为对象的解构：将响应的对象中的data属性解构出来并且重命名为result 语法 var {felid:renamefelid} = object
        // 2.响应的对象是promise，则加上await和async,能够转化为普通的对象（个人理解，需要深入的研究）
        const { data: result } = await this.$http.post('login', this.loginForm)
        if (result.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        // 1.将登录成功之后的token保存到客户端的sessionstorage中
        //  1.1项目中除了登录之外的API接口，必须在登陆之后才能访问
        //  1.2token只应在当前网站打开期间生效，所以放在sessionstorage中
        window.sessionStorage.setItem('token', result.data.token)
        // 2.通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<!-- scoped属性表示style中的样式只在当前组件生效，可避免命名冲突的问题，
如果没有scope属性，那么此样式就会在全局生效 -->
<style lang="less" scoped>
  .login_container {
    background: #2b4b6b;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 3px;
    background: #fff;
  }
  .avatar_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    box-shadow: 0 0 10px #ddd;
    border: 1px solid #eee;
    background-color: #fff;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .btns {
    /*display属性规定元素应该生成框的类型 此处是指以flex布局形式。
      flex是Flexibe Box 的缩写,意思为”弹性布局”,
      用来为盒子模型提供最大的灵活性;
      任何一个容器都可以指定为 flex 布局
      注意 : 设为 flex 布局以后,子元素的float clear和vertical-align 属性将失效

      justify-content属性为水平对齐方式（与之对应的垂直对齐方式属性为align-items，align-content），
      flex-end表示从行尾起始位置开始排列
      */
    display: flex;
    justify-content: flex-end;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    /*box-sizing 属性允许以特定的方式定义匹配某个区域的特定元素
      为元素设定的宽度和高度决定了元素的边框盒。
      就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
      通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
      border-box可允许子元素不超过父元素边框（个人理解，但是具体的作用暂不清楚）
      此时元素的width属性不能指定为固定值，否则子元素的大小是固定的，不可随意改变，从而border-box就会失效*/
    box-sizing: border-box;
    width: 100%;
  }
</style>
