<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片区域  -->
    <el-card>
      <!--  警告信息    -->
      <el-alert title="添加商品信息" type="info" :closable="false" center show-icon></el-alert>

      <!--   步骤条 active 默认激活第几步，从0 开始  -->
      <el-steps :space="200" :active="active - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!--      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->

      <!--   tab标签页
         tab标签页和步骤条的联动效果
         当tab标签页发生变化的时候，name属性也会发生变化，并将name的值绑定到v-model中，
         而v-model中绑定的是active这个对象，也就是说name和active保持联动并且一致
         在步骤条中active属性又和active对象绑定到了一起，也就是说name属性，active属性，active对象三者的值一起联动并保持一致
         但是在步骤条中的active属性是数字类型，active对象是字符串，使用（String - number）= number的类型转化就可以实现了
         这样就可以使三者的数值真正的保持一致并一起联动

         before-leave切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
        -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs v-model="active" :tab-position="tabPosition" :before-leave="beforeTabLeave" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称:" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader expand-trigger="hover" :options="catelist" :props="cateProps" v-model="addForm.goods_cat"
                           @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!--      渲染表单的item项        -->
            <el-form-item :label="item.attr_name" v-for="(item, i) in manyTableData" :key="i">
              <!--      复选框组      -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox border size="small" :label="cb" v-for="(cb, cb1) in item.attr_vals" :key="cb1"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!--      渲染表单的item项        -->
            <el-form-item :label="item.attr_name" v-for="(item, i) in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!--     上传组件
                   action表示图片要上传到的后台服务器地址
                   list-type 表示图片显示的ui样式
                   -->
            <el-upload :headers="headerObj" :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :on-success="handleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="previewImg">
    </el-dialog>
  </div>
</template>

<script>

  import _ from 'lodash'

  export default {
    data() {
      return {
        active: '0',
        tabPosition: 'left',

        // 添加商品表单
        addForm: {
          goods_name: '',
          goods_price: 0,
          goods_weight: 0,
          goods_number: 0,
          // 商品所属的分类数组
          goods_cat: [],
          // 图片的数组
          pics: [],
          // 商品的详情描述
          goods_introduce: '',
          attrs: []
        },
        // 添加商品表单验证规则
        addFormRules: {
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' }
          ],
          goods_number: [
            { required: true, message: '请输入商品数量', trigger: 'blur' }
          ],
          goods_cat: [
            { required: true, message: '请选择商品分类', trigger: 'blur' }
          ]
        },
        // 商品分类列表
        catelist: [],

        // 指定级联选择器的配置对象
        cateProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        // 动态参数列表
        manyTableData: [],
        // 静态属性列表
        onlyTableData: [],
        // 上传图片的URL地址
        uploadURL: 'http://localhost:8888/api/private/v1/upload',
        headerObj: {
          Authorization: window.sessionStorage.getItem('token')
        },
        previewPath: '',
        previewVisible: false
      }
    },
    created() {
      this.getCateList()
    },
    methods: {
      async getCateList() {
        console.log('123')
        const { data: result } = await this.$http.get('categories')
        console.log(result)
        if (result.meta.status !== 200) {
          return this.$message.error('获取商品分类失败！')
        }
        this.catelist = result.data
        console.log(this.catelist)
      },
      handleChange() {
        if (this.addForm.goods_cat.length !== 3) {
          this.addForm.goods_cat = []
          return
        }
      },
      // 标签页发生改变时触发此函数，activeName表示即将要切换的标签页的名字，oldActiveName表示切换之前的标签页的名字
      beforeTabLeave(activeName, oldActiveName) {
        if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
          this.$message.error('请填写商品分类！')
          return false
        }
      },
      // tab标签页被点击时触发
      async tabClicked() {
        // 如果点击的是动态参数面板
        if (this.active === '1') {
          // 发送请求获取动态参数数据
          const { data: result } = await this.$http.get(
            `categories/${this.cateId}/attributes`,
            {
              params: { sel: 'many' }
            }
          )

          if (result.meta.status !== 200) {
            this.$message.error('获取动态参数列表失败')
          }
          result.data.forEach(item => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
          })
          this.manyTableData = result.data
          console.log(this.manyTableData)
        } else if (this.active === '2') {
          // 发送请求获取动态参数数据
          const { data: result } = await this.$http.get(
            `categories/${this.cateId}/attributes`,
            {
              params: { sel: 'only' }
            }
          )

          if (result.meta.status !== 200) {
            this.$message.error('获取静态属性列表失败')
          }
          this.onlyTableData = result.data
          console.log(this.onlyTableData)
        }
      },

      // 处理图片预览效果
      handlePreview(file) {
        const url = file.response.data.url.replace('127.0.0.1', 'localhost')
        this.previewPath = url
        console.log(this.previewPath)
        this.previewVisible = true
      },
      // 处理移除图片的操作
      handleRemove(file) {
        // 获取需要移除图片的临时路径
        const filePath = file.response.data.tmp_path
        // 从表单的图片数组中找到要移除图片的索引 index表示数组中的每一项， 箭头后边表示的是满足的条件
        const i = this.addForm.pics.findIndex(index => index.pic === filePath)
        // 根据索引值将图片从数组中移除
        this.addForm.pics.splice(i, 1)
      },

      // 上传图片成功之后触发的事件
      handleSuccess(response) {
        // 拼接一个图片对象
        const picinfo = { pic: response.data.tmp_path }
        // 将图片信息对象 push到pics数组中
        this.addForm.pics.push(picinfo)
        // console.log(this.addForm)
      },
      add() {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) {
            return this.$message.error('请填写必要的表单项！')
          }
          // lodash 深拷贝，由于goods_cat绑定到级联选择器的v-model中，只允许为数组
          // 所以拷贝一个一模一样的对象从重新赋值
          const form = _.cloneDeep(this.addForm)
          form.goods_cat = form.goods_cat.join(',')

          // 处理动态参数
          this.manyTableData.forEach(item => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(' ')
            }
            this.addForm.attrs.push(newInfo)
          })
          // 处理静态属性
          this.onlyTableData.forEach(item => {
            const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
            this.addForm.attrs.push(newInfo)
          })
          form.attrs = this.addForm.attrs
          console.log(form)

          // 发起请求添加商品
          // 商品的名称，必须是唯一的
          const { data: res } = await this.$http.post('goods', form)

          if (res.meta.status !== 201) {
            return this.$message.error('添加商品失败！')
          }

          this.$message.success('添加商品成功！')
          // 编程式导航跳转到商品列表页面
          this.$router.push('/goods')
        })
      }
    },
    computed: {
      cateId() {
        if (this.addForm.goods_cat.length === 3) {
          return this.addForm.goods_cat[2]
        }
        return null
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-checkbox {
    margin: 0 10px 0 0 !important;
  }
  .btnAdd {
    margin-top: 15px;
  }
  .previewImg {
    width: 100%;
  }
</style>
