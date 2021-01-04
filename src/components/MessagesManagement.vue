<template>
  <!-- 留言列表页面 -->
  <div class="messages-management">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="messages-management-box">
      <!-- 评论数据搜索 -->
      <el-input
        placeholder="请输入留言内容"
        v-model="messages"
        class="input-with-select"
        style="width: 380px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 评论列表表格 -->
      <el-table :data="messagesData" border stripe style="width: 100%">
        <el-table-column type="index" label="#" width="180"> </el-table-column>
        <el-table-column prop="data" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="phoneName" label="联系方式(称呼)">
        </el-table-column>
        <el-table-column prop="opinions" label="留言内容"> </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <!-- scope.row当前列表的全部数据 -->
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              round
              icon="el-icon-delete"
              size="mini"
              @click="removeUsersById(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessagesManagement",
  data() {
    return {
      // 搜索评论数据
      messages: "",
      // 存储评论表格的数据
      messagesData: [],
      // 数据总条数
      total: 0,
      // 获取评论列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1, //前往的页数
        pagesize: 2, //设置页面为多少条一页
      },
    };
  },
  created() {
    this.getOpinionsList();
  },
  methods: {
    // 获取评论列表数据
    getOpinionsList() {
      this.$axios
        .post("/api/getopinions", {
          pagesize: this.queryInfo.pagesize,
          pagenum: this.queryInfo.pagenum,
        })
        .then((res) => {
          this.messagesData = res.data.docs;
          // 为总数据条数赋值
          this.total = res.data.total;
          // console.log(this.messagesData);
          // 存放数据
          this.$store.commit("setOpinions", this.total);
        })
        .catch(() => {
          this.$message.error("服务器开小差啦奥!");
        });
    },
    // 监听pagesize改变的事件
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getOpinionsList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newsize) {
      this.queryInfo.pagenum = newsize;
      this.getOpinionsList();
    },
    // 删除留言事件
    removeUsersById(_id) {
      let self = this;
      self
        .$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          self.$axios
            .post("/api/deleteopinions", {
              _id: _id,
            })
            .then((res) => {
              self.$message({
                type: "success",
                message: res.data.message,
              });
              // 重新获取评论数据
              self.getOpinionsList();
            });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.messages-management-box {
  margin-top: 20px;
  background: #fff;
  padding: 15px;
  box-shadow: 0 0 10px #f00;
}

.el-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
}
</style>
