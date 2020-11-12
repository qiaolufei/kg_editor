import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态
const state = {
  dataList: {
    nodes: [],
    edges: []
  }
}

// 更改状态(不包含异步操作)
const mutations = {
  addNode (state, param) { // 添加节点
    state.dataList.nodes.push(param.obj)
  },
  addEdge (state, param) { // 添加连线
    state.dataList.edges.push(param.obj)
  }
}

// 异步更改状态
const actions = {
  changeNameWithParamAsync (context, param) {
    setTimeout(() => {
      context.commit('changeNameWithParam', param)
    }, 1000)
  }
}

// state的派生状态(相当于一种计算属性)
const getters = {
  customFormatterName: (state) => (val) => {
    let postfix = ''
    if (state.name === '路非') {
      postfix = val
    }
    return state.name + postfix
  }
}

export default new Vuex.Store({
  state, mutations, actions, getters
})
