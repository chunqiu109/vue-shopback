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
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children"
                        :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="delRightById(scope.row, item2.id)">{{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable
                            @close="delRightById(scope.row, item3.id)">{{item3.authName}}
                    </el-tag>
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
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <!-- 分配权限按钮 -->
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRightDialog(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--   分配权限对话框   -->
    <!-- dialog 对话框组件  visible.sync的值为布尔值，true则显示对话框，false隐藏对话框 -->
    <el-dialog title="分配权限" :visible.sync="rightDialogVisible" width="50%" @close="rightDialogClosed">
      <!--        <span>这是一段信息</span>-->
      <!-- 树形控件:
        :data 表示需要展示的数据集合
        :props表示需要展示的属性
        show-checkbox 表示展示复选框
        node-key 表示节点唯一标志
        default-expand-all 表示默认展开所有
        default-checked-keys 表示默认选中哪些节点的key
        ref
       -->
      <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all
               :default-checked-keys="leafKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 角色列表
        roleList: [],
        // 分配权限对话框
        rightDialogVisible: false,
        // 树形控件的属性绑定对象
        treeProps: {
          label: 'authName',
          children: 'children'
        },
        roleId: '',
        // 权限树
        rightslist: [],
        // 三级id权限集合
        leafKeys: []
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
      },
      async showRightDialog(role) {
        this.roleId = role.id
        const { data: result } = await this.$http.get('rights/tree')
        if (result.meta.status !== 200) {
          return this.$message.error('修改失败:' + result.meta.msg)
        }
        this.rightslist = result.data
        // this.$message.success(result.meta.msg)
        this.getLeafKeys(role, this.leafKeys)
        this.rightDialogVisible = true
      },
      // 通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys中
      getLeafKeys(node, arr) {
        // 三级权限没有children属性，将id放入数组中
        if (!node.children) {
          return arr.push(node.id)
        }
        // 遍历children属性
        node.children.forEach(item => this.getLeafKeys(item, arr))
      },
      // 监听权限分配对话框关闭事件： 将三级权限的id清空
      rightDialogClosed() {
        this.leafKeys = []
        this.rightDialogVisible = false
      },
      // 分配权限
      async allotRights() {
        console.log('我来分配权限')
        const keys = [
          ...this.$refs.treeRef.getCheckedKeys(), // ...表示将数组中的值全部展开
          ...this.$refs.treeRef.getHalfCheckedKeys()
        ]
        console.log(keys)
        const idStr = keys.join(',')
        const { data: result } = await this.$http.post(
          `roles/${this.roleId}/rights`,
          { rids: idStr }
        )
        if (result.meta.status !== 200) return this.$message.error('分配失败！')
        this.$message.success('分配成功！')
        this.getRoleList()
        this.rightDialogVisible = false
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
