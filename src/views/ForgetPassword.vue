<template>
  <div class="forget-password">
    <div class="forget-password-h">
      <h1>
        <span>有些东西一旦忘记就不再拥有啦</span
        ><small>Forget The Password</small>
      </h1>
    </div>
    <div class="forget-password-img">
      <img src="../assets/image/maomi.jpg" alt="" />
    </div>
    <el-button
      class="forgotBtn"
      type="danger"
      icon="el-icon-back"
      circle
      @click="$router.replace('/login')"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  name: "ForgetPassword",
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$notify({
        title: "提示",
        message: "关上吧,丢了就丢了,没什么大不了的！",
        duration: 0,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.forget-password {
  width: 100%;
  height: 100%;
}

.forget-password-h {
  padding: 42px 0;
  background: #428bca;
}

.forget-password h1 {
  text-align: center;
  margin: 0;
  font-weight: 400;
  height: 45.6px;
  line-height: 45.6px;
  color: #fff;
}

.forget-password h1 span {
  font-size: 42px;
}

.forget-password h1 small {
  font-size: 27.3px;
  margin-left: 8px;
}

.forget-password-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 350px;
  opacity: 0.7;
  box-shadow: 10px 10px rgba(25, 25, 25, 0.1);
}

.forget-password-img img {
  width: 100%;
  height: 100%;
}

.forgotBtn {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
