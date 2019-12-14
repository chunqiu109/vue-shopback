<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片区域  -->
    <el-card class="box-card">

      <!--    权限列表用户区域    -->
      <el-table :data="rightList" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="权限名称" prop="authName"></el-table-column>
        <el-table-column align="center" label="路径" prop="path"></el-table-column>
        <el-table-column align="center" label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag type="info" v-else-if="scope.row.level==='1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
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
        // 权限列表
        rightList: [],
        type: 'list'
      }
    },
    created() {
      this.getRightList()
    },
    methods: {
      async getRightList() {
        const { data: result } = await this.$http.get('rights/list')
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.rightList = result.data
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
