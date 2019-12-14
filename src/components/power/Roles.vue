<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片区域  -->
    <el-card class="box-card">
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!--    权限列表用户区域    -->
      <el-table :data="roleList" border stripe>
        <!--  展开列  -->
        <el-table-column align="center" type="expand">
          <template slot-scope="scope">
            {{scope.row.children}}
          </template>
        </el-table-column>
        <!--  索引列  -->
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="角色名称" prop="roleName"></el-table-column>
        <el-table-column align="center" label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column align="center" label="操作" width="300px">
          <template>
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <!-- 分配权限按钮 -->
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
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
        // 角色列表
        roleList: []
      }
    },
    created() {
      this.getRoleList()
    },
    methods: {
      async getRoleList() {
        const { data: result } = await this.$http.get('roles')
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.roleList = result.data
        console.log(result.data)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
