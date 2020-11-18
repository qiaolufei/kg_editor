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
        <!-- <div
          class="index__main-right__pot"
          :style="{ right: !drawer ? '-1vw' : '22.2%' }"
          @click="drawer = !drawer"
        ></div> -->
        <div class="index__main-right" :style="{ width: drawer ? '25%' : '0' }">
          <Sidebar ref="sidebar" :graph="graph" :selectedNodeId="selectedNodeId"></Sidebar>
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import Toolbar from '@/components/toolbar'
import Sidebar from '@/components/sidebar'
import G6 from '@antv/g6'
import defaultNode from '@/default/default_node'
import defaultEdge from '@/default/default_edge'
import addNode from '@/actions/add_node'
import hoverNode from '@/actions/hover_node'
import addEdge from '@/actions/add_edge'
export default {
  components: {
    Toolbar,
    Sidebar
  },
  data: () => ({
    drawer: true,
    graph: null,
    selectedNodeId: '',
    item: {},
    addingEdge: true,
    edge: null
  }),
  mounted () {
    this.initG6()
  },
  methods: {
    nodeChange1 () {
      this.graph.updateItem(this.node.id, this.node)
      this.$store.commit('updateNode', this.node)
    },
    initG6 () {
      G6.registerBehavior('hover-node', hoverNode)
      // 双击添加节点
      G6.registerBehavior('click-add-node', addNode)
      // 添加连线
      G6.registerBehavior('click-add-edge', addEdge)
      // 缩略图
      let minimap = new G6.Minimap({
        container: this.$refs.sidebar.$refs.minimap,
        size: [
          this.$refs.sidebar.$refs.minimap.offsetWidth - 8,
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
            'hover-node',
            'zoom-canvas', // 缩放canvas
            'drag-canvas', // 拖拽canvas
            {
              type: 'drag-node' // 拖拽node
            },
            'click-add-node',
            'click-select',
            'activate-relations'
          ],
          addEdge: [
            'click-add-edge',
            'hover-node',
            'zoom-canvas',
            'drag-canvas',
            'click-add-node',
            'activate-relations'
          ]
        },
        defaultNode: defaultNode,
        defaultEdge: defaultEdge,
        nodeStateStyles: {
          selected: {
            stroke: '#409eff',
            lineWidth: 1,
            fill: '#409eff'
          }
        }
      })
      this.graph.data(this.$store.state.dataList)
      this.graph.render()
      // 点击节点
      this.graph.on('nodeselectchange', (e) => {
        this.item = e
        this.selectedNodeId = e.select ? e.selectedItems.nodes[0]._cfg.id : ''
      })
      // 拖动节点
      this.graph.on('node:dragend', (e) => {
        let itemModel = e.item.getModel()
        itemModel.fixed = true
        itemModel.fx = e.x
        itemModel.fy = e.y
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
      height: 88vh;
      border: 1px solid #3333;
      margin-top: 2vw;
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
