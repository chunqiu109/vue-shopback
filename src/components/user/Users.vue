<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片区域  -->
    <el-card class="box-card">
      <!--  这个是el中的分栏间隔组件，row代表行，col代表所在行的每一列（类似于tr,td）
        gutter属性表示每列之间的间隔，span属性代表每列本身的宽度-->
      <el-row :gutter="20">
        <el-col :span="8">
          <!--    el-input中只有使用v-model双向绑定属性之后输入框才可用
                clearable属性表示输入框可清空
                clear事件：点击输入框中的清空叉号的时候触发，以下的写法表示清空输入框的内容之后再次查询后台，然后显示没有条件查询所有数据
                -->
          <el-input placeholder="请输入内容" v-model="queryParam.query" clearable @clear="queryUserList">
            <el-button slot="append" icon="el-icon-search" @click="queryUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!--   用户列表区域   -->
      <el-table :data="userList" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="姓名" prop="username"></el-table-column>
        <el-table-column align="center" label="邮箱" prop="email"></el-table-column>
        <el-table-column align="center" label="电话" prop="mobile"></el-table-column>
        <el-table-column align="center" label="角色" prop="role_name"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <!-- 作用域插槽 -->
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            <!-- 分配角色按钮
                  content属性表示鼠标放上去的时候提示的文字，
                  effect表示鼠标放上去时候的背景颜色，
                  enterable表示鼠标离开之后文字消失  -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页区域    -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParam.pagenum"
        :page-size="queryParam.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!--   添加用户对话框   -->
    <!-- dialog 对话框组件  visible.sync的值为布尔值，true则显示对话框，false隐藏对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form ref="addUserFormRef" :model="addUserForm" :rules="addUserFormRules" label-width="70px">
        <!--    用户名    -->
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <!--    密码    -->
        <el-form-item label="密 码:" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <!--    邮箱    -->
        <el-form-item label="邮 箱:" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <!--    电话    -->
        <el-form-item label="电 话:" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!--  修改用户对话框  -->
    <el-dialog title="修改用户" width="50%" :visible.sync="editDialogVisible" @close="editDialogClosed">
      <el-form ref="editUserFormRef" :model="editUserForm" :rules="editUserFormRules" label-width="70px">
        <!--    用户名    -->
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <!--    邮箱    -->
        <el-form-item label="邮 箱:" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <!--    电话    -->
        <el-form-item label="电 话:" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      // 验证邮箱的规则
      var checkEmail = (rule, value, cb) => {
        //验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
          // 合法邮箱
          return cb()
        }
        cb(new Error('请输入合法的邮箱！'))
      }
      //验证手机号的规则
      var checkPhone = (rule, value, cb) => {
        //验证手机号的正则表达式
        const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regPhone.test(value)) {
          // 合法手机号
          return cb()
        }
        cb(new Error('请输入合法的手机号！'))
      }
      return {
        //获取用户列表参数对象
        queryParam: {
          query: '',
          //当前页数
          pagenum: 1,
          //每页显示数量
          pagesize: 2
        },
        userList: [],
        total: 0,
        //添加用户对话框的显示和隐藏
        addDialogVisible: false,
        //编辑用户对话框的显示和隐藏
        editDialogVisible: false,
        // 删除用户对话框的显示和隐藏
        delDialogVisible: false,
        // 添加用户表单
        addUserForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        // 添加用户表单验证规则
        addUserFormRules: {
          // 验证用户名是否合法
          username: [
            { required: true, message: '请输入登录名称！', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符！', trigger: 'blur' }
          ],
          // 验证密码是否合法
          password: [
            { required: true, message: '请输入登录密码！', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符！', trigger: 'blur' }
          ],
          // 验证邮箱是否合法
          email: [
            { required: true, message: '请输入邮箱地址！', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          // 验证手机号是否合法
          mobile: [
            { required: true, message: '请输入手机号！', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ]
        },
        // 修改用户表单
        editUserForm: {},
        // 修改用户表单验证规则
        editUserFormRules: {
          // 验证密码是否合法
          password: [
            { required: true, message: '请输入登录密码！', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符！', trigger: 'blur' }
          ],
          // 验证邮箱是否合法
          email: [
            { required: true, message: '请输入邮箱地址！', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          // 验证手机号是否合法
          mobile: [
            { required: true, message: '请输入手机号！', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      //获取用户列表
      this.queryUserList()
    },
    methods: {
      async queryUserList() {
        const { data: result } = await this.$http.get('users', { params: this.queryParam })
        if (result.meta.status !== 200) return this.$message.error('获取用户列表失败')
        this.userList = result.data.users
        this.total = result.data.total
      },
      //监听每页显示数量事件，数据改变需要更新queryParam中的数据，再从新调用接口返回修改完页码的数据
      handleSizeChange(newsize) {
        this.queryParam.pagesize = newsize
        this.queryUserList()
      },
      //监听页码改变事件
      handleCurrentChange(newnum) {
        this.queryParam.pagenum = newnum
        this.queryUserList()
      },
      //监听switch状态的改变
      async userStateChanged(userInfo) {
        //这里要注意：大坑大坑！！！！put方法中一定要写``,不可以写单引号或者双引号！！！！否则${}中的数据后台无法解析
        const { data: result } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
        if (result.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error('修改失败:' + result.meta.msg)
        }
        this.$message.success(result.meta.msg)
      },
      // 添加用户
      addUser() {
        this.$refs.addUserFormRef.validate(async valid => {
          // 获取表单失败
          if (!valid) return
          //发送添加用户请求
          const { data: result } = await this.$http.post('users', this.addUserForm)
          if (result.meta.status !== 201) {
            return this.$message.error('添加用户失败：' + result.meta.msg)
          }
          this.$message.success(result.meta.msg)
          // 添加完毕之后关闭对话框
          this.addDialogVisible = false
          //从新获取数据
          this.queryUserList()
        })
      },
      // 监听添加用户对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      // 监听修改用户对话框的关闭事件
      editDialogClosed() {
        this.$refs.editUserFormRef.resetFields()
      },
      //展示编辑对话框
      async showEditDialog(userId) {
        // 根据用户id 查询数据
        const { data: result } = await this.$http.get('/users/' + userId)
        if (result.meta.status !== 200) return this.$message.error('查询失败！')
        this.editUserForm = result.data
        // 展示对话框
        this.editDialogVisible = true
      },
      // 编辑用户
      editUser() {
        this.$refs.editUserFormRef.validate(async valid => {
          if (!valid) return
          // 发起修改用户信息的数据请求
          const { data: result } = await this.$http.put('users/' + this.editUserForm.id, {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          })
          if (result.meta.status !== 200) return this.$message.error('修改失败！')
          // 关闭对话框
          this.editDialogVisible = false
          // 刷新数据
          this.queryUserList()
          // 提示信息
          this.$message.success('修改成功！')
        })
      },
      // 根据id删除用户操作
      async removeUserById(id) {
        // $confirm需要按需导入并挂载到vue中，如果不catch，用户在点击取消的时候就会报错
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // 如果用户点击取消confirmResult=cancel，如果用户点击确认如果用户点击取消confirmResult=confirm
        if (confirmResult !== 'confirm') return this.$message.info('已经取消删除！')
        const { data: result } = await this.$http.delete('users/' + id)
        if (result.meta.status !== 200) return this.$message.error('删除失败：' + result.meta.msg)
        this.$message.success('删除成功！')
        // 删除成功之后刷新列表
        this.queryUserList()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
