<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="queryGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="queryGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
        </el-col>
      </el-row>

      <!--   商品列表区域   -->
      <el-table :data="goodsList" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column align="center" label="商品价格（元）" prop="goods_price" width="110px"></el-table-column>
        <el-table-column align="center" label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页区域    -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //获取商品列表参数对象
        queryInfo: {
          query: '',
          //当前页数
          pagenum: 1,
          //每页显示数量
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        //添加用户对话框的显示和隐藏
        addDialogVisible: false
      }
    },
    created() {
      this.queryGoodsList()
    },
    methods: {
      async queryGoodsList() {
        const { data: res } = await this.$http.get('goods', {
          params: this.queryInfo
        })

        if (res.meta.status !== 200) {
          return this.$message.error('获取商品列表失败！')
        }

        this.$message.success('获取商品列表成功！')
        console.log(res.data)
        this.goodsList = res.data.goods
        this.total = res.data.total
      },
      //监听每页显示数量事件，数据改变需要更新queryParam中的数据，再从新调用接口返回修改完页码的数据
      handleSizeChange(newsize) {
        this.queryInfo.pagesize = newsize
        this.queryGoodsList()
      },
      //监听页码改变事件
      handleCurrentChange(newnum) {
        this.queryInfo.pagenum = newnum
        this.queryGoodsList()
      }
    }
  }
</script>

<style scoped>

</style>
