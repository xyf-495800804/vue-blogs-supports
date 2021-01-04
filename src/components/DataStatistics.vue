<template>
  <!-- 数据管理页面 -->
  <div class="data-statistics">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/index' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="data-statistics-box">
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 400px; height: 500px"></div>
      <!-- 饼状图 -->
      <div id="myPie" style="width: 400px; height: 500px"></div>
    </div>
  </div>
</template>

<script>
// 导入echarts组件
import echarts from "echarts";
export default {
  name: "DataStatistics",
  data() {
    return {};
  },
  // 此时页面的元素,已经被渲染完毕
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: { text: "博客管理系统柱状图数据分析" },
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["博客列表", "评论列表", "留言列表"],
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 25,
      },
      series: [
        {
          name: "数量",
          type: "bar",
          data: [
            this.$store.state.blogsNumber,
            this.$store.state.contentsNumber,
            this.$store.state.opinionsNumber,
          ],
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
        },
      ],
    });
    let myPie = echarts.init(document.getElementById("myPie")); //饼状图
    myPie.setOption({
      title: {
        text: "博客站点的管理情况",
        subtext: "真实有效",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["博客列表", "评论列表", "留言列表"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: this.$store.state.blogsNumber, name: "博客列表" },
            { value: this.$store.state.contentsNumber, name: "评论列表" },
            { value: this.$store.state.opinionsNumber, name: "留言列表" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  },
};
</script>

<style lang="stylus" scoped>
.data-statistics-box {
  position: relative;
  margin-top: 20px;
  background: #fff;
  padding: 15px;
  box-shadow: 0 0 10px #f00;
}

#myPie {
  position: absolute;
  right: 25px;
  top: 25px;
}
</style>
