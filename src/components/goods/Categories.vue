<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片区域  -->
    <el-card class="box-card">
      <!--  这个是el中的分栏间隔组件，row代表行，col代表所在行的每一列（类似于tr,td）
        gutter属性表示每列之间的间隔，span属性代表每列本身的宽度-->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!--   商品分类列表区域   -->
      <tree-table class="treeTable" :data="catelist" :columns=columns index-text="#" show-index :expand-type="false"
                  :selection-type="false" border>
        <!--    是否有效    -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
        <!--    排序    -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!--    操作    -->
        <template slot="operation">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!--      分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="querInfo.pagenum"
        :page-size="querInfo.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!--   添加商品分类对话框   -->
    <!-- dialog 对话框组件  visible.sync的值为布尔值，true则显示对话框，false隐藏对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form ref="addCateFormRef" :model="addCateForm" :rules="addCateFormRules" label-width="100px">
        <!--    分类名称    -->
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <!--    父级分类    -->
        <el-form-item label="父级分类:">
          <!-- options 用来指定数据源
               props 用来指定配置对象 ：声明展示数据的规则
               v-model 展示的元素id（此id是props属性中value的集合）
               clearable 可以清空
               change-on-select 任意一级都可以选中-->
          <el-cascader class="parentCate" :props="{ expandTrigger: 'hover', checkStrictly: true }" :options="parentCatelist" v-model="selectedKeys" @change="parentCateChanged" clearable>
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 分类集合
        catelist: [],
        // 查询参数
        querInfo: {
          type: 3,
          pagenum: 1,
          pagesize: 5
        },
        total: 0,
        // 为table指定列的定义
        columns: [
          {
            label: '分类名称',
            prop: 'cat_name',
            align: 'center',
            headerAlign: 'center'
          },
          {
            label: '是否有效',
            type: 'template',
            template: 'isok',
            align: 'center',
            headerAlign: 'center'
          },
          {
            label: '排序',
            prop: 'cat_level',
            type: 'template',
            template: 'order',
            align: 'center',
            headerAlign: 'center'
          },
          {
            label: '操作',
            type: 'template',
            template: 'operation',
            align: 'center',
            headerAlign: 'center'
          }
        ],
        // 添加分类对话框
        addDialogVisible: false,

        // 添加分类的表单数据对象
        addCateForm: {
          // 将要添加的分类的名称
          cat_name: '',
          // 父级分类的Id
          cat_pid: 0,
          // 分类的等级，默认要添加的是1级分类
          cat_level: 0
        },
        // 添加分类表单的验证规则对象
        addCateFormRules: {
          cat_name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ]
        },
        // 父级分类数组
        parentCatelist: [],
        parentCatelist1: [],
        // 指定级联选择器的配置对象
        parentCate: {
          value: '',
          label: '',
          children: {}
        },
        // 选中的父级分类的Id数组
        selectedKeys: []
      }
    },
    created() {
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const { data: result } = await this.$http.get('categories', { params: this.querInfo })

        if (result.meta.status !== 200) {
          return this.$message.error('获取商品分类失败！')
        }
        this.catelist = result.data.result
        this.total = result.data.total
      },
      handleSizeChange(newsize) {
        this.querInfo.pagesize = newsize
        this.getCateList()
      },
      handleCurrentChange(newnum) {
        this.querInfo.pagenum = newnum
        this.getCateList()
      },
      // 展示添加分类对话框
      showAddCateDialog() {
        this.getParentVateList()
        this.addDialogVisible = true
      },
      addDialogClosed() {
        this.addDialogVisible = false
      },
      // 获取父级分类
      async getParentVateList() {
        const { data: result } = await this.$http.get('categories', { params: { type: 2 } })

        if (result.meta.status !== 200) {
          return this.$message.error('获取父级商品分类失败！')
        }
        this.parentCatelist = result.data
        const str = JSON.stringify(this.parentCatelist).toString().replace(/cat_id/g, 'value').replace(/cat_name/g, 'label')
        this.parentCatelist = JSON.parse(str)
        console.log(this.parentCatelist)
      },
      //当父级分类选择发生变化的时候触发此函数
      parentCateChanged() {
        //打印选择父级元素的id
        console.log(this.selectedKeys)
      }
    }
  }
</script>

<style lang="less" scoped>
 .treeTable {
    margin-top: 15px;
    font-size: 12px;
  }
 .parentCate {
   width: 100%;
 }
</style>
