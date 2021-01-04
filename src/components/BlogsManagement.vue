<template>
  <!-- 博客列表页面 -->
  <div class="blogs-management">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>博客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容 -->
    <div class="blogs-box">
      <!-- 添加博客这一块 -->
      <div class="blogs-box-header">
        <el-input
          placeholder="请搜索博客标题"
          v-model="title"
          class="input-with-select"
          style="width: 380px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="seleteBlogs"
          ></el-button>
        </el-input>
        <el-button
          type="primary"
          class="input-box-btn"
          @click="dialogFormBlogs = true"
          >添加博客</el-button
        >
      </div>
      <!-- 博客表格展示 -->
      <div class="blogs-box-supports">
        <el-table :data="blogsList" stripe border style="width: 100%">
          <el-table-column label="#" type="index"> </el-table-column>
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="data" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="content" label="内容" width="180">
          </el-table-column>
          <el-table-column prop="gist" label="简介" width="180">
          </el-table-column>
          <el-table-column prop="labels" label="标签" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- scope.row当前列表的全部数据 -->
              <!-- 修改按钮 -->
              <el-button
                type="info"
                round
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row._id)"
                >编辑</el-button
              >
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
      </div>

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
    <!-- 添加博客对话框 -->
    <el-dialog
      title="添加博客"
      :visible.sync="dialogFormBlogs"
      center
      width="60%"
      @close="addDialogClosed"
    >
      <el-form :model="blogsData" label-width="100px" ref="addFormBlogs">
        <!-- 标题 -->
        <div>
          <p>标题</p>
          <el-input
            placeholder="请输入标题"
            v-model="blogsData.title"
            clearable
          >
          </el-input>
        </div>
        <!-- 标签 -->
        <div class="tag_wrap">
          <span>标签:</span>
          <el-tag
            :key="tag"
            v-for="tag in blogsData.labels"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </div>
        <!-- 简介 -->
        <div>
          <p>简介</p>
          <el-input
            type="textarea"
            :rows="2"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入简介"
            v-model="blogsData.gist"
          >
          </el-input>
        </div>
        <!-- 内容 -->
        <div>
          <p>内容(Markdoen编辑器)</p>
          <mavon-editor
            v-model="blogsData.content"
            ref="md"
            @imgAdd="$imgAdd"
            @change="change"
            style="min-height: 600px"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormBlogs = false">取 消</el-button>
        <el-button type="primary" @click="addDate">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BlogsManagement",
  data() {
    return {
      // 输入框默认值
      title: "",
      // 储存博客数据列表
      blogsList: [],
      // 添加博客的数据
      blogsData: {
        title: "", //标题
        data: "", //时间
        content: "", //内容
        gist: "", //简介
        labels: [], //标签
      },
      // 数据总条数
      total: 0,
      // 获取博客列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1, //前往的页数
        pagesize: 2, //设置页面为多少条一页
      },
      // 添加博客对话框默认值
      dialogFormBlogs: false,
      // 默认标签input为false
      inputVisible: false,
      // 默认标签input值为空
      inputValue: "",
    };
  },
  created() {
    this.getBlogsList();
  },
  methods: {
    // 获取博客数据
    getBlogsList() {
      this.$axios
        .post("/api/getListArticle", {
          pagesize: this.queryInfo.pagesize,
          pagenum: this.queryInfo.pagenum,
        })
        .then((res) => {
          this.blogsList = res.data.docs;
          // 为总数据条数赋值
          this.total = res.data.total;
          // 存放数据
          this.$store.commit("setBlogs", this.total);
        });
    },
    // 监听pagesize改变的事件
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getBlogsList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newsize) {
      this.queryInfo.pagenum = newsize;
      this.getBlogsList();
    },
    // 关掉标签
    handleClose(tag) {
      this.blogsData.labels.splice(this.blogsData.labels.indexOf(tag), 1);
    },
    // 标签变成input输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // input失去焦点触发变成标签值
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.blogsData.labels.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      //将下面上传接口替换为你自己的服务器接口
      axios({
        url: "/common/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((url) => {
        this.$refs.md.$img2Url(pos, url);
      });
    },
    // 富文本编辑器中的change
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.html = render;
    },
    // 监听表单关闭重置表单函数
    addDialogClosed() {
      this.blogsData = {};
    },
    // 获取发表时间
    getDate: function () {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date();
      y = mydate.getFullYear();
      m = mydate.getMonth() + 1;
      d = mydate.getDate();
      hh = mydate.getHours();
      mm = mydate.getMinutes();
      ss = mydate.getSeconds();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      return (this.date =
        y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss);
    },
    // 添加博客对话框中的添加
    addDate() {
      let self = this;
      if (this.blogsData.title.length == 0) {
        this.$notify({
          title: "提醒",
          message: "请输入标题",
          type: "warning",
        });
        return;
      }
      if (this.blogsData.content.length == 0) {
        this.$notify({
          title: "提醒",
          message: "请输入内容",
          type: "warning",
        });
        return;
      }
      if (this.blogsData.gist.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入简介",
          type: "warning",
        });
        return;
      }
      let _id = this.blogsData._id;
      this.blogsData.data = this.getDate();
      this.blogsData = {
        _id: _id,
        title: this.blogsData.title,
        data: this.blogsData.data,
        content: this.blogsData.content,
        gist: this.blogsData.gist,
        labels: this.blogsData.labels,
      };
      if (!_id) {
        // 保存接口
        this.$axios
          .post("/api/saveBlogs", {
            articleInformation: this.blogsData,
          })
          .then((res) => {
            if (res.data.err_code == 200) {
              self.$message({
                message: res.data.message,
                type: "success",
              });
              // 添加博客对话框关闭
              this.dialogFormBlogs = false;
              // 执行获取数据函数
              this.getBlogsList();
            }
          });
      } else {
        //更新接口
        this.$axios
          .post("/api/updateArticle", {
            articleInformation: this.blogsData,
          })
          .then((res) => {
            if (res.data.err_code == 200) {
              self.$message({
                message: "更新博客成功",
                type: "success",
              });
              // 更新博客对话框关闭
              this.dialogFormBlogs = false;
              // 执行获取数据函数
              this.getBlogsList();
            }
          });
      }
    },
    // 博客编辑按钮
    async showEditDialog(_id) {
      this.dialogFormBlogs = true;
      await this.$axios
        .post("/api/lookUpArticle", {
          _id: _id,
        })
        .then((res) => {
          let updateDate = {
            _id: res.data.docs[0]._id,
            title: res.data.docs[0].title,
            content: res.data.docs[0].content,
            gist: res.data.docs[0].gist,
            labels: res.data.docs[0].labels,
          };
          // console.log(updateDate);
          this.blogsData = updateDate;
        });
    },
    // 删除博客文章接口
    async removeUsersById(_id) {
      let self = this;
      self
        .$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          self.$axios
            .post("/api/deleteArticle", {
              _id: _id,
            })
            .then((res) => {
              self.$message({
                type: "success",
                message: res.data.message,
              });
              self.getBlogsList();
            });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 博客搜索功能
    seleteBlogs() {
      // console.log(this.title);
      const self = this;
      this.$axios
        .post("/api/seleteblog", {
          params: {
            title: self.title,
          },
        })
        .then((res) => {
          if (res.data.err_code == 1) {
            this.$message({
              showClose: true,
              message: "亲！未找到相关数据奥！",
              type: "warning",
            });
          } else if (res.data.err_code == 200) {
            this.$message({
              showClose: true,
              message: "查询成功,请查看",
              type: "success",
            });
            this.blogsList = res.data.docs;
            this.total = res.data.total;
          }
        });
      // 赋值为空
      this.title = "";
    },
  },
};
</script>

<style lang="stylus" scoped>
.blogs-box {
  margin-top: 20px;
  background: #fff;
  padding: 15px;
  box-shadow: 0 0 10px #f00;
}

.input-box-btn {
  margin-left: 15px;
}

.blogs-box-supports {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 15px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-dialog__body p {
  font-size: 16px;
  color: #6a6da9;
  margin-bottom: 15px;
}

.el-dialog__body div {
  margin-bottom: 20px;
}

.el-dialog__body .tag_wrap span {
  margin-right: 8px;
  line-height: 32px;
}

.el-dialog__body div:last-child {
  margin-bottom: 0px;
}
</style>
