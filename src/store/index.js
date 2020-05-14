import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  cartList: []
}

export default new Vuex.Store({
  state,
  // 1.mutations对state的数据进行操作
  // 2.mutations方法都是单一的
  mutations,
  actions,
})
