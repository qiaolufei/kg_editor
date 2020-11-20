export default{
  getEvents () {
    return {
      'edge:mouseover': 'onMouseover',
      'edge:mouseout': 'onMouseout',
      'edge:click': 'onEdgeClick',
      'canvas:click': 'onCanvasClick'
    }
  },
  changeSelected () { // 取消选中状态
    const node = this.graph.findAllByState('node', 'selected')
    if (node.length !== 0) {
      this.graph.setItemState(node[0], 'selected', false)
    }
    const edge = this.graph.findAllByState('edge', 'selected')
    if (edge.length !== 0) {
      this.graph.setItemState(edge[0], 'selected', false)
    }
  },
  onMouseover (e) { // 鼠标移入
    this.graph.setItemState(e.item, 'hover', true)
  },
  onMouseout (e) { // 鼠标移出
    this.graph.setItemState(e.item, 'hover', false)
  },
  onEdgeClick (e) { // 鼠标点击
    this.changeSelected()
    this.graph.setItemState(e.item, 'selected', true)
  },
  onCanvasClick () { // 取消选中
    this.changeSelected()
  }
}
