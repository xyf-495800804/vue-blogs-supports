<template>
  <div class="register">
    <!-- 头部 -->
    <div class="register-header">
      <div class="container">
        <h1><span>注册账户</span><small>Register An Account</small></h1>
      </div>
    </div>
    <!-- 中间模块 -->
    <div class="register-block">
      <div class="register-block-container">
        <div class="register-block-container-h">
          <h1>立即注册用户</h1>
        </div>
        <div class="register-block-container-p">
          <p>
            当您注册用户名密码时，系统会向您提示设置密码的长度。以便更安全地保护账户。
          </p>
        </div>
        <div class="register-block-container-form">
          <div class="register-block-cotainer-form-input">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              size="small"
              class="demo-ruleForm"
              status-icon
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="ruleForm.username"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" label="邮箱">
                <el-input
                  v-model="ruleForm.email"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input
                  style="width: 300px"
                  v-model.number="ruleForm.age"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="ruleForm.checkPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="register-block-warning">
          <img src="../assets/image/prompt.png" alt="警告" />
          <span
            >温馨提示：若未及时收到密码找回邮件，请自行登录预留邮箱，在收件箱或垃圾箱中查看。</span
          >
        </div>
      </div>
    </div>
    <!-- 脚部 -->
    <div class="register-footer">
      <p>
        版权所有© Copyright 1999-2020 螃蟹软件股份有限公司
        中国·孝感孝南区书院街街道 东区8栋宿舍410
      </p>
    </div>
    <div class="register-footer">
      <p>
          版权所有© Copyright 1999-2020 螃蟹软件股份有限公司</br>
          中国·孝感孝南区书院街街道 东区8栋宿舍410
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      ruleForm: {
        username: "", //用户名
        password: "", //密码
        checkPassword: "", //确认密码
        email: "", //邮箱
        age: "", //年龄
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 22,
            message: "长度在 2 到 22 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            min: 2,
            max: 22,
            message: "长度在 2 到 22 个字符",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        age: [
          { required: true, trigger: "blur", message: "请输入真实年龄" },
          { validator: checkAge, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 触发注册事件
    register() {
      this.$axios
        .post("/api/register", {
          name: this.ruleForm.username,
          password: this.ruleForm.password,
          checkPassword: this.ruleForm.checkPassword,
          email: this.ruleForm.email,
          age: this.ruleForm.age,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.err_code == 0) {
            this.$message({
              showClose: true,
              message: "用户名注册成功！",
              type: "success",
            });
            this.$router.push("/login");
          } else if (res.data.err_code == 1) {
            this.$message({
              showClose: true,
              message: "该用户名已被使用,请换一个",
              type: "warning",
            });
          } else if (res.data_err_code == 500) {
            this.$message({
              showClose: true,
              message: "服务器开小差啦!",
              type: "error",
            });
          }
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.register {
  display: block;
  width: 100%;
  height: 845px;
  background: #ebebeb;
}

.register-header {
  text-align: center;
  background: #428bca;
  padding: 42px 0;
  margin-bottom: 25px;
}

.container h1 {
  margin: 0;
  font-weight: 400;
  height: 45.6px;
  line-height: 45.6px;
  color: #fff;
}

.container h1 span {
  font-size: 42px;
}

.container h1 small {
  font-size: 27.3px;
  margin-left: 8px;
}

.register-block {
  width: 68%;
  padding: 0 15px;
  background: #ffffff;
  margin: auto;
  margin-bottom: 35px;
}

.register-block-container {
  padding: 35px;
  overflow: hidden;
}

.register-block-container-h {
  width: 65%;
  text-align: center;
}

.register-block-container-h h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-family: inherit;
  font-weight: 400;
  color: #303030;
}

.register-block-container-p {
  margin: 25px 0;
  text-indent: 1em;
}

.register-block-container-p p {
  font-size: 14px;
  color: #505050;
  text-align: center;
}

.register-block-cotainer-form-input {
  margin-left: 50%;
  transform: translateX(-50%);
}

.register-block-warning {
  text-align: center;
  margin-top: 25px;
}

.register-block-warning img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.register-block-warning span {
  font-size: 14px;
  color: #FF0000;
  margin-left: 12px;
}

.register-footer {
  // height: 100%;
  text-align: center;
  color: #8099af;
  font: normal 12px / 20px microsoft YaHei;
  padding: 15px;
  box-sizing: border-box;
}
</style>
