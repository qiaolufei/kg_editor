<template>
  <div class="index">
    <v-app>
      <Toolbar :size="size" :graph="graph" :selectedNodeId.sync="selectedNodeId" :selectedEdgeId.sync="selectedEdgeId"></Toolbar>
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
          <Sidebar ref="sidebar" :graph="graph" :selectedNodeId="selectedNodeId" :selectedEdgeId="selectedEdgeId"></Sidebar>
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
import selectEdge from '@/actions/select_edge'
export default {
  components: {
    Toolbar,
    Sidebar
  },
  data: () => ({
    drawer: true,
    graph: null,
    selectedNodeId: '',
    selectedEdgeId: '',
    item: {},
    addingEdge: true,
    edge: null,
    size: 100
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
      G6.registerBehavior('select-edge', selectEdge)
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
            // 'edge-tooltip'
            'select-edge'
          ],
          addEdge: [
            'click-add-edge',
            'hover-node',
            'zoom-canvas',
            'drag-canvas',
            'click-add-node'
          ]
        },
        defaultNode: defaultNode,
        defaultEdge: defaultEdge,
        edgeStateStyles: {
          hover: {
            stroke: '#409eff' // 颜色
          },
          selected: {
            stroke: '#409eff' // 颜色
          }
        },
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
        this.selectedEdgeId = ''
        this.selectedNodeId = e.select ? e.selectedItems.nodes[0]._cfg.id : ''
      })
      this.graph.on('edge:click', (e) => {
        this.selectedNodeId = ''
        this.selectedEdgeId = e.item._cfg.id
      })
      this.graph.on('canvas:click', (e) => {
        this.selectedNodeId = ''
        this.selectedEdgeId = ''
      })
      this.graph.on('viewportchange', (e) => {
        if (e.action === 'zoom') {
          this.size = (Number(this.graph.getZoom()) * 100).toFixed(0)
        }
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
.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
</style>
