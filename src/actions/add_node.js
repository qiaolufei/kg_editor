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
      x: ev.x,
      y: ev.y
    }
    this.graph.addItem('node', obj)
    store.commit('addNode', obj)
    // 操作记录
    let logObj = {
      id: String('log' + (store.state.log.length + 1)),
      action: 'addNode',
      data: obj
    }
    store.commit('addLog', logObj)
  }
}
