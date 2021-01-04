<template>
  <!-- 首页页面 -->
  <div class="index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>小螃蟹</el-breadcrumb-item>
      <el-breadcrumb-item>个人展示</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="index-box">
      <h1>欢迎来到小螃蟹个人博客管理系统</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
};
</script>

<style lang="stylus" scoped>
.index {
  width: 100%;
  height: 100%;
}

.index-box {
  text-align: center;
  color: skyblue;
}
</style>
