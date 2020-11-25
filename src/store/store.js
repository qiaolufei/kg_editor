import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  dataList: {
    nodes: [],
    edges: []
  }
}

const mutations = {
  clearData (state) { // 清空数据
    state.dataList = {
      nodes: [],
      edges: []
    }
  },
  addNode (state, param) { // 添加节点
    state.dataList.nodes.push(param)
  },
  addEdge (state, param) { // 添加连线
    state.dataList.edges.push(param)
  },
  deleteNode (state, param) { // 删除节点
    let index = state.dataList.nodes.findIndex(function (value) {
      return value.id === param.id
    })
    state.dataList.nodes.splice(index, 1)
  },
  deleteEdge (state, param) { // 删除连线
    let index = state.dataList.edges.findIndex(function (value) {
      return value.id === param.id
    })
    state.dataList.edges.splice(index, 1)
  },
  updateNode (state, param) { // 更新节点
    state.dataList.nodes.forEach((item, index) => {
      if (item.id === param.id) {
        state.dataList.nodes[index] = param
      }
    })
  },
  updateEdge (state, param) { // 更新节点
    state.dataList.edges.forEach((item, index) => {
      if (item.id === param.id) {
        state.dataList.edges[index] = param
      }
    })
  }
}

export default new Vuex.Store({
  state, mutations
})
