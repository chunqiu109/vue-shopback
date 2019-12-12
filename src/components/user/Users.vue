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

      <!--   用户列表区域   -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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
        this.userList = result.data.users
        console.log(this.userList)
        this.total = result.data.total
      }
    }
  }
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
}
</style>
