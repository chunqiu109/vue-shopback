<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!--   订单列表区域   -->
      <el-table :data="orderList" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="订单编号" prop="order_number" width="180px"></el-table-column>
        <el-table-column align="center" label="订单价格" prop="order_price"></el-table-column>
        <el-table-column align="center" label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === '0'" type="danger">未付款</el-tag>
            <el-tag v-else type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否发货" prop="is_send"></el-table-column>
        <el-table-column align="center" label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showBox"></el-button>
            <el-button size="mini" type="success" icon="el-icon-location" @click="showProgressBox"></el-button>
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

    <!--  修改订单对话框  -->
    <el-dialog title="修改地址" width="50%" :visible.sync="addressVisible" @close="addressDialogClosed">
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <!--    省市区县级联选择框    -->
        <el-form-item label="省市区/县:" prop="address1">
          <el-cascader expand-trigger="hover" :options="cityData" v-model="addressForm.address1">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 展示物流进度的对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(progress, index) in progressInfo"
          :key="index"
          :timestamp="progress.time">
          {{progress.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
  import cityData from './citydata.js'

  export default {
    data() {
      return {
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        orderList: [],
        total: 0,

        // 控制修改地址对话框
        addressVisible: false,
        // 控制展示物流进度对话框
        progressVisible: false,

        // 地址表单
        addressForm: {
          address1: [],
          address2: ''
        },
        addresslist: [],
        // 地址表单验证规则
        addressFormRules: {
          address1: [
            { required: true, message: '请选择省市区县', trigger: 'blur' }
          ],
          address2: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ]
        },
        cityData,
        reverse: true,
        progressInfo: []
      }
    },
    created() {
      this.getOrderList()
    },
    methods: {
      async getOrderList() {
        const { data: result } = await this.$http.get('orders', { params: this.queryInfo })
        if (result.meta.status !== 200) {
          return this.$message.error('查询订单列表失败！')
        }
        this.orderList = result.data.goods
        this.total = result.data.total
        console.log(this.orderList)
        return this.$message.success('查询订单列表成功！')
      },
      // 每页显示数量改变触发的函数
      handleSizeChange(newsize) {
        this.queryInfo.pagesize = newsize
        this.getOrderList()
      },
      // 页数改变触发的函数
      handleCurrentChange(newnum) {
        this.queryInfo.pagenum = newnum
        this.getOrderList()
      },

      // 修改订单地址对话框
      showBox() {
        this.addressVisible = true
      },
      // 监听订单地址对话框关闭事件
      addressDialogClosed() {
        this.$refs.addressFormRef.resetFields()
      },
      // 展示物流对话框
       async showProgressBox() {
        const { data: res } = await this.$http.get('/kuaidi/804909574412544580')

        if (res.meta.status !== 200) {
          return this.$message.error('获取物流进度失败！')
        }

        this.progressInfo = res.data

        this.progressVisible = true
        console.log(this.progressInfo)
      },
      handleChange() {
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-cascader {
    width: 100%;
  }
</style>
