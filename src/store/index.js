import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 博客列表数量
    blogsNumber: 0,
    // 评论列表数量
    contentsNumber: 0,
    // 留言列表数量
    opinionsNumber: 0
  },
  mutations: {
    setBlogs(state, blogsNumber) {
      state.blogsNumber = blogsNumber;
    },
    setContents(state, contentsNumber) {
      state.contentsNumber = contentsNumber;
    },
    setOpinions(state, opinionsNumber) {
      state.opinionsNumber = opinionsNumber;
    }
  },
  actions: {},
  modules: {}
});
