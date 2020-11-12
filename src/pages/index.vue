<template>
  <div class="index">
    <v-app>
      <Toolbar></Toolbar>
      <div class="index__main">
        <div
          ref="G6"
          id="G6"
          class="index__main-left"
          :style="{ width: drawer ? '78%' : '100%' }"
        ></div>
        <div
          class="index__main-right__pot"
          :style="{ right: !drawer ? '-1vw' : '22.2%' }"
          @click="drawer = !drawer"
        ></div>
        <div class="index__main-right" :style="{ width: drawer ? '25%' : '0' }">
          <Sidebar ref="sidebar" :selectedNodeId="selectedNodeId"></Sidebar>
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import Toolbar from '@/components/toolbar'
import Sidebar from '@/components/sidebar'
import G6 from '@antv/g6'
export default {
  components: {
    Toolbar,
    Sidebar
  },
  // computed: {
  //   dataListChange () {
  //     return this.$store.state.dataList.nodes
  //   }
  // },
  // watch: {
  //   dataListChange () {
  //     this.graph.destroy() // 销毁画布
  //     this.initG6()
  //   }
  // },
  data: () => ({
    drawer: true,
    graph: '',
    selectedNodeId: ''
  }),
  mounted () {
    this.initG6()
  },
  methods: {
    initG6 () {
      let _this = this
      G6.registerBehavior('click-add-node', {
        getDefaultCfg () {
          return {
            trigger: 'shift'
          }
        },
        // 双击添加节点
        getEvents () {
          return {
            'canvas:dblclick': 'onClick'
          }
        },
        onClick (ev) {
          let obj = {
            id: String(_this.$store.state.dataList.nodes.length + 1),
            label: String(_this.$store.state.dataList.nodes.length + 1),
            x: ev.canvasX,
            y: ev.canvasY
          }
          this.graph.addItem('node', obj)
          _this.$store.commit('addNode', {
            obj: obj
          })
        }
      })
      G6.registerBehavior('click-add-edge', {
        // 添加连线
        getEvents () {
          return {
            'node:click': 'onClick',
            mousemove: 'onMousemove',
            'edge:click': 'onEdgeClick' // 点击空白处，取消边
          }
        },
        onClick (ev) {
          const node = ev.item
          const graph = this.graph
          const point = {
            x: ev.x,
            y: ev.y
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
            _this.$store.commit('addEdge', {
              obj: obj
            })
            this.addingEdge = true
          }
        },
        onMousemove (ev) {
          const point = {
            x: ev.x,
            y: ev.y
          }
          if (this.addingEdge && this.edge) {
            this.graph.updateItem(this.edge, {
              target: point
            })
          }
        },
        onEdgeClick (ev) {
          const currentEdge = ev.item
          // 拖拽过程中，点击会点击到新增的边上
          if (this.addingEdge && this.edge === currentEdge) {
            this.graph.removeItem(this.edge)
            this.edge = null
            this.addingEdge = false
          }
        }
      })
      // 缩略图
      let minimap = new G6.Minimap({
        container: this.$refs.sidebar.$refs.minimap,
        size: [
          this.$refs.sidebar.$refs.minimap.offsetWidth - 80,
          this.$refs.sidebar.$refs.minimap.offsetHeight
        ]
      })
      this.graph = new G6.Graph({
        container: 'G6',
        width: this.$refs.G6.offsetWidth,
        height: this.$refs.G6.offsetHeight,
        plugins: [minimap],
        layout: {
          type: 'force',
          nodeStrength: -30,
          preventOverlap: true,
          nodeSize: 40,
          edgeStrength: 0.1,
          linkDistance: 100
        },
        modes: {
          default: [
            'zoom-canvas', // 缩放canvas
            'drag-canvas', // 拖拽canvas
            {
              type: 'drag-node' // 拖拽node
            },
            'click-add-node',
            'click-add-edge',
            'click-select',
            'activate-relations'
          ]
        },
        defaultNode: {
          size: [80, 80],
          color: '#409eff'
        },
        defaultEdge: {
          size: 1,
          color: '#409eff',
          style: {
            endArrow: true,
            startArrow: false
          }
        },
        nodeStateStyles: {
          selected: {
            stroke: '#fff',
            lineWidth: 1,
            fill: 'steelblue'
          }
        }
      })
      this.graph.data(this.$store.state.dataList)
      this.graph.render()
      // 点击节点
      this.graph.on('nodeselectchange', (e) => {
        this.selectedNodeId = e.select ? e.selectedItems.nodes[0]._cfg.id : ''
      })
      this.graph.on('node:dragend', function (ev) {
        let itemModel = ev.item.getModel()
        itemModel.fixed = true
        itemModel.fx = ev.x
        itemModel.fy = ev.y
      })
    }
  }
}
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  &__main {
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    &-left {
      height: 88vh;
      border: 2px solid #3333;
      margin: 2vw 2vw 0 2vw;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    &-right {
      height: 90vh;
      border: 1px solid #3333;
      margin-top: 30px;
      overflow-y: scroll;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      &__pot {
        position: absolute;
        width: 2vw;
        height: 2vw;
        background: #35495e;
        border-radius: 1vw;
        clip: rect(0px 1vw 2vw 0px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        top: 50%;
        cursor: pointer;
        z-index: 1000 !important;
      }
      &__pot:hover {
        background: #dcdfe6;
      }
    }
  }
}
</style>
