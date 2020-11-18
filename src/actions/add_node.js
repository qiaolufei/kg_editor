import store from '../store/store'
export default{
  getDefaultCfg () {
    return {
      trigger: 'shift'
    }
  },
  getEvents () {
    return {
      'canvas:dblclick': 'onClick' // 双击画布添加节点
    }
  },
  onClick (ev) {
    let obj = {
      id: String('node' + (store.state.dataList.nodes.length + 1)),
      label: String(store.state.dataList.nodes.length + 1),
      x: ev.canvasX,
      y: ev.canvasY
    }
    this.graph.addItem('node', obj)
    store.commit('addNode', obj)
  }
}