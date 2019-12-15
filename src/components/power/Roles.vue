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
            <!-- <pre>
             {{scope.row}}
           </pre> -->
            <el-row :class="['bdbottom', i1===0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children"
                    :key="item1.id">
              <!--  一级权限  -->
              <el-col :span="5">
                <el-tag closable @close="delRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限和三级权限   -->
              <el-col :span="19">
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="delRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="delRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
      },
      // 根据id删除对应的权限
      async delRightById(role, rightId) {
        const confirmResult = await this.$confirm(
          '此操作将永久删除该文件, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('取消了删除！')
        }
        const { data: result } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
        console.log(result)
        role.children = result.data
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-tag {
    margin: 7px;
  }

  .bdbottom {
    border-bottom: 1px solid #eee;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }
  .vcenter {
    display: flex;
    align-items: center;
  }
</style>
