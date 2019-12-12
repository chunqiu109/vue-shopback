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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"><el-button type="primary">添加用户</el-button></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //获取用户列表参数对象
        queryParam: {
          query: '',
          //当前页数
          pagenum: 1,
          //每页显示数量
          pagesize: 10
        },
        userList: [],
        total: 0
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
        this.userList = result.data
        this.total = result.total
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
