export default{
  getEvents () {
    return {
      'node:mouseover': 'onMouseover',
      'node:mouseleave': 'onMouseleave',
      'node:mousedown': 'onMousedown'
    }
  },
  onMouseover (e) { // 鼠标移入显示锚点
    e.item._cfg.model.linkPoints.bottom = true
    this.graph.refreshItem(e.item)
  },
  onMouseleave (e) { // 鼠标移出隐藏锚点
    e.item._cfg.model.linkPoints.bottom = false
    this.graph.refreshItem(e.item)
  },
  onMousedown (e) {
    const edge = this.graph.findAllByState('edge', 'selected')
    if (edge.length !== 0) {
      this.graph.setItemState(edge[0], 'selected', false)
    }
    if (e.target.cfg.className === 'link-point-bottom') { // 点击锚点
      this.graph.setMode('addEdge')
    } else { // 点击节点
      this.graph.setMode('default')
    }
  }
}
