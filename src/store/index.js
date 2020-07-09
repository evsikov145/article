import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import posts from './module/posts'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    a: user,
    b: posts
  }
})
