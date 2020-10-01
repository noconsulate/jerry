import Vue from 'vue'
import Vuex from 'vuex'
import { PRIVATE_KEY } from '../../secrets.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: '0x3c1567DB79E39c38b0f0d63184AfA8Ff0f1D57EB',
    privateKey: PRIVATE_KEY,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  
  }
})
