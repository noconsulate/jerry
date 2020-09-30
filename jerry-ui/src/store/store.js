import Vue from 'vue'
import Vuex from 'vuex'
import { PRIVATE_KEY } from '../../secrets.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: '0x43e0eeC2f9d5d8cfB8Eca8427598bf04184f9450',
    privateKey: PRIVATE_KEY,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  
  }
})
