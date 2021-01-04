<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div class="left-menu">
        <img src="../../public/favicon.svg" alt="螃蟹" />
        <span>螃蟹博客后台管理系统</span>
      </div>
      <div class="right-menu">
        <img src="../assets/gif/吉他小子.gif" alt="吉他" />
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>admin</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 展开与折叠 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#8b658b"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-icon4"></i>
              <span>小螃蟹</span>
            </template>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="iconfont icon-iconfonticon-baobia"></i>
                <span @click="skip('/home/index')">个人展示</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-bokeyuan"></i>
              <span>博客管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="iconfont icon-iconfonticon-baobia"></i>
                <span @click="skip('/home/blogsmanagement')">博客列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-pinglun"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="iconfont icon-iconfonticon-baobia"></i>
                <span @click="skip('/home/commentsmanagement')">评论列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-icon-test"></i>
              <span>留言管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="iconfont icon-iconfonticon-baobia"></i>
                <span @click="skip('/home/messagesmanagement')">留言列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-data"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="iconfont icon-iconfonticon-baobia"></i>
                <span @click="skip('/home/datastatistics')">数据管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体中心区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    // 点击按钮,切换菜单的折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 绑定点击事件无效的解决方案
    //  @click.native="logout"
    logout() {
      // 清除sessionStorage的token值
      window.sessionStorage.removeItem("token");
      this.$router.replace("/login");
    },
    // 跳转
    skip(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="stylus" scoped>
.iconfont {
  margin-right: 10px;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background: #8b658b;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
}

.el-header .left-menu {
  display: flex;
  align-items: center;
}

.left-menu img {
  margin: 0 15px 0 15px;
  width: 45px;
  height: 45px;
}

.right-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  line-height: 60px;
}

.right-menu img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 8px;
}

.right-menu .el-icon-caret-bottom {
  // margin-top: 50px;
  // color: red;
  font-size: 12px;
  width: 12px;
  height: 12px;
}

.el-aside {
  background: #8b658b;
}

.el-main {
  background: #EAEDF1;
}

.toggle-button {
  background-color: #8b658b;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
