import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import Home from "../views/Home.vue";
import Index from "../components/Index.vue";
import BlogsManagement from "../components/BlogsManagement.vue";
import CommentsManagement from "../components/CommentsManagement.vue";
import MessageManagement from "../components/MessagesManagement.vue";
import DataStatistics from "../components/DataStatistics.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/forget",
    name: "ForgetPassword",
    component: ForgetPassword
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/home/index",
    children: [
      {
        path: "/home/index",
        name: "Index",
        component: Index
      },
      {
        path: "/home/blogsmanagement",
        name: "BlogsManagement",
        component: BlogsManagement
      },
      {
        path: "/home/commentsmanagement",
        name: "CommentsManagement",
        component: CommentsManagement
      },
      {
        path: "/home/messagesmanagement",
        name: "MessageManagement",
        component: MessageManagement
      },
      {
        path: "/home/datastatistics",
        name: "DataStatistics",
        component: DataStatistics
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (
    to.path === "/login" ||
    to.path === "/register" ||
    to.path === "/forget"
  ) {
    return next();
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) {
    return next("/login");
  }
  next();
});

export default router;
