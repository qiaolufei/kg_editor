import store from '../store/store'
export default{
  getEvents () {
    return {
      'node:click': 'onClick',
      mousemove: 'onMousemove',
      'edge:click': 'onEdgeClick'
    }
  },
  onClick (e) {
    const node = e.item
    this.item = e.item
    const graph = this.graph
    const point = {
      x: e.x,
      y: e.y
    }
    const model = node.getModel()
    if (this.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: model.id
      })
      this.edge = null
      this.addingEdge = false
    } else {
      let obj = {
        source: model.id,
        target: point
      }
      this.edge = graph.addItem('edge', obj)
      store.commit('addEdge', obj)
      this.addingEdge = true
      e.item._cfg.model.linkPoints.bottom = false
      this.graph.refreshItem(e.item)
    }
  },
  onMousemove (e) {
    const point = {
      x: e.x,
      y: e.y
    }
    if (this.addingEdge && this.edge) {
      if (e.item !== null && e.item._cfg.type === 'node') { // 判断是否为节点
        this.graph.updateItem(this.edge, {
          target: e.item._cfg.id
        })
      } else {
        this.graph.updateItem(this.edge, {
          target: point
        })
      }
    }
  },
  onEdgeClick (e) {
    const currentEdge = e.item
    if (this.addingEdge && this.edge === currentEdge) { // 点击空白处后移除连线
      let index = store.state.dataList.edges.length - 1
      store.commit('deleteEdge', store.state.dataList.edges[index])
      this.graph.removeItem(this.edge)
      this.edge = null
      this.addingEdge = false
    }
    this.graph.setMode('default')
  }
}
