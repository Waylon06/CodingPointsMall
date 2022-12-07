import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogined: sessionStorage.getItem('token') ? true : false,
    cartTotal: 0,
    userInfo: {
      username: "游客",
      coin: "--",
      headImg: require("@/assets/img/userImg.png"),
    }
  },
  getters: {
  },
  mutations: {
    changeIsLogined(state, val) {
      state.isLogined = val
    },
    changeCartTotal(state, val) {
      state.cartTotal = val
    },
    changeUserInfo(state, val) {
      state.userInfo = val
    }
  },
  actions: {
  },
  modules: {
  }
})
