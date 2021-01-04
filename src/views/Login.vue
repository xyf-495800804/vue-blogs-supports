<template>
  <div class="login">
    <!-- 头部 -->
    <div class="login-header-box">
      <div class="login-header">
        <img src="../assets/image/header_web.png" alt="" />
        <span class="login-header-tittle">螃蟹博客后台管理系统</span>
      </div>
    </div>
    <!-- 中间块级 -->
    <div class="login-block">
      <div class="login-block-img">
        <img src="../assets/image/大象.jpg" alt="" />
      </div>
      <div class="login-block-content">
        <div class="login-block-content-h">
          <h4>用户登录</h4>
        </div>
        <div class="login-block-content-input">
          <el-input
            placeholder="请输入用户名"
            size="small"
            v-model="username"
            clearable
          >
            <template slot="prepend"
              ><i class="el-icon-s-platform"></i
            ></template>
          </el-input>
        </div>
        <div class="login-block-content-input">
          <el-input
            placeholder="请输入密码"
            size="small"
            v-model="password"
            clearable
            show-password
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </div>
        <div class="login-block-content-tag" @click="$router.push('/forget')">
          <a href="javascript:;">忘记密码?</a>
        </div>
        <div class="login-block-content-btn" @click="blogsLogin">
          <el-button type="success" plain size="small" style="width: 100%"
            >登录</el-button
          >
        </div>
        <div class="login-block-content-notice">
          <div class="login-block-content-notic-tittle">
            登录密码遗失,请联系网站管理员</br>
            微信：AgonyFFF</br>
            邮箱：xyf0722@qq.com
          </div>
        </div>
        <div class="login-block-content-detail">
          <img src="../assets/image/wechat.jpg" alt="微信">
          <span>手机扫一扫,加微信更便捷</span>
        </div>
        <div class="login-block-content-detail">
          <img src="../assets/image/qq.jpg" alt="QQ">
          <span>手机扫一扫,加QQ更便捷</span>
        </div>
      </div>
    </div>
    <!-- 脚部 -->
    <div class="login-footer">
		版权所有© Copyright 1999-2020  螃蟹软件股份有限公司　　中国·孝感孝南区书院街街道 东区8栋宿舍410
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "admin", //用户名
      password: "123456", //密码
    };
  },
  methods: {
    // 博客登录触发事件
    blogsLogin() {
      if (
        (this.username != undefined && this.username.length == 0) ||
        (this.password != undefined && this.username.length == 0)
      ) {
        this.$message({
          showClose: true,
          message: "未填写用户名和密码",
          type: "warning",
        });
      } else {
        this.$axios
          .post("/api/login", {
            name: this.username,
            password: this.password,
          })
          .then((res) => {
            if (res.data.err_code == 0) {
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "warning",
              });
              // 将token存入当中 // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
              //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
              //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在sessionStorage 中
              window.sessionStorage.setItem(
                "token",
                res.data.session + new Date()
              );
              // 登录跳转
              this.$router.push("/home/index");
              console.log(res.data.session);
            } else if (res.data.err_code == 1) {
              this.$message({
                showClose: true,
                message: "用户名或密码不正确",
                type: "warning",
              });
            } else if (res.data.err_code == 500) {
              this.$message({
                showClose: true,
                message: "服务器开小差啦",
                type: "warning",
              });
            }
          });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.login {
  width: 1160px;
  height: 100%;
  margin: 0 auto;

  @media screen and (max-width: 1000px) {
    width: 990px;
  }
}

.login-header-box {
  margin: 25px 0 45px;
}

.login-header {
  position: relative;
  padding: 0 20px;
  height: 51.4px;
}

.login-header img {
  width: 45px;
  height: 45px;
  padding: 0 5px 0 0;
  margin-top: 4px;
}

.login-header .login-header-tittle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #1069a4;
  font-family: 'microsoft YaHei';
  margin-left: 5px;
}

.login-block {
  display: flex;
  border: 4px solid #ededed;
  border-radius: 4px;
  background: #f5f5f5;
  margin: 0px 12px;
}

.login-block-img {
  flex: 9;
  padding: 0 10px;
  height: 458.7px;
}

.login-block-img img {
  width: 100%;
  height: 100%;
}

.login-block-content {
  flex: 5;
  background-color: #FFFFFF;
  padding: 15px;
  margin: 0 10px;
  height: 100%;
}

.login-block-content-h h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.login-block-content-input {
  padding: 0 15px;
  margin-bottom: 15px;
}

.login-block-content-tag {
  width: 100px;
  padding: 0 15px;
  margin-bottom: 15px;
  text-align: right;
  margin-left: 255px;
}

.login-block-content-tag a {
  width: 80px;
  color: #337ab7;
  text-decoration: none;
}

.login-block-content-btn {
  padding: 0 15px;
}

.login-block-content-btn >>> .el-button--success.is-plain {
  color: #8B658B;
  background: #E6E6FA;
  border-color: #E6E6FA;
}

.login-block-content-btn >>> .el-button--success.is-plain:hover {
  background: #8B658B;
  color: #FFFFFF;
}

.login-block-content-notice {
  padding: 0 15px;
  margin-top: 30px;
  font-size: 14px;
  margin-bottom: 15px;
}

.login-block-content-notic-tittle {
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}

.login-block-content-detail {
  padding: 15px;
}

.login-block-content-detail img {
  width: 90px;
  height: 90px;
  vertical-align: middle;
}

.login-block-content-detail span {
  color: #8B658B;
}

.login-footer {
  text-align: center;
  color: #8099af;
  font: normal 12px / 20px microsoft YaHei;
  padding: 15px;
  borderbox-sizing: border-box;
}
</style>
