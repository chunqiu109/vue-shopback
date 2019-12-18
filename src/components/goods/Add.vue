<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片区域  -->
    <el-card class="box-card">
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
        -->
      <template>
        <el-tabs v-model="active" :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="基本信息" name="0">用户管理</el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: '0',
        tabPosition: 'left'
      }
    },
    created() {
    },
    methods: {
      next() {
        if (this.active++ > 5) this.active = 0
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
