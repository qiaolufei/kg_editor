<template>
  <div class="toolbar">
    <v-toolbar height="50">
      <v-tooltip v-for="(item, index) in tools" :key="index" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="comment_event(item.event)" icon v-bind="attrs" v-on="on">
            <v-icon style="color:#35495E">{{item.icon}}</v-icon>
          </v-btn>
          <template style="color:#C0C4CC" v-if="index==8">
              {{size}}%
          </template>
          <template v-else-if="index==10">
              <v-spacer></v-spacer>
          </template>
          <template v-else-if="index==2 || index == 5 || index == 7 || index == 11 || index == 12">
          <v-divider
            vertical
          ></v-divider>
        </template>
        </template>
        <span>{{item.tip}}</span>
      </v-tooltip>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100
    },
    selectedNodeId: {
      type: String,
      default: ''
    },
    selectedEdgeId: {
      type: String,
      default: ''
    },
    graph: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    selectedEdgeId: {
      handler (newVal, oldVal) {
        if (newVal !== '') {
          let edgeArr = this.$store.state.dataList.edges.filter((item) => {
            return item.id === newVal
          })
          this.edge = edgeArr[0]
        }
      }
    },
    selectedNodeId: {
      handler (newVal, oldVal) {
        if (newVal !== '') {
          let nodeArr = this.$store.state.dataList.nodes.filter((item) => {
            return item.id === newVal
          })
          this.node = nodeArr[0]
          this.radius = nodeArr[0].size[0] / 2
        }
      }
    }
  },
  data: () => ({
    tools: [
      { icon: 'mdi-undo-variant', tip: '撤销 Ctrl+Z', event: 'revoke' },
      { icon: 'mdi-backup-restore', tip: '重做', event: 'restore' },
      { icon: 'mdi-content-copy', tip: '复制 Ctrl+C', event: 'copy' },
      { icon: 'mdi-content-paste', tip: '粘贴 Ctrl+V', event: 'paste' },
      { icon: 'mdi-trash-can-outline', tip: '删除 Ctrl+Backspace', event: 'delete' },
      { icon: 'mdi-vector-arrange-above', tip: '置于顶层', event: 'onTop' },
      { icon: 'mdi-vector-arrange-below', tip: '置于底层', event: 'onBottom' },
      { icon: 'mdi-magnify-plus-outline', tip: '放大', event: 'plus' },
      { icon: 'mdi-magnify-minus-outline', tip: '缩小', event: 'minus' },
      { icon: 'mdi-arrow-collapse-all', tip: '适应画布', event: 'adaptCanvas' },
      { icon: 'mdi-cloud-upload', tip: '导入文件', event: 'importFile' },
      { icon: 'mdi-file-image', tip: '导出图片', event: 'saveImage' },
      { icon: 'mdi-help-box', tip: '帮助', event: 'help' }
    ],
    node: {},
    edge: {}
  }),
  mounted () {
    // window.addEventListener('keyup', this.handleKeyup)
    this.keyCodeForEvent()
  },
  methods: {
    comment_event (event) { // 事件中转
      this[event]()
    },
    revoke () {},
    restore () {
      location.reload()
    },
    copy () {},
    paste () {},
    delete () {
      if (this.selectedEdgeId === '' && this.selectedNodeId === '') {
        this.$message.error('未选择元素！')
      } else if (this.selectedEdgeId !== '') {
        this.graph.removeItem(this.selectedEdgeId)
        this.$emit('update:selectedEdgeId', '')
      } else if (this.selectedNodeId !== '') {
        this.graph.removeItem(this.selectedNodeId)
        this.$emit('update:selectedNodeId', '')
      }
    },
    onTop () {
      if (this.selectedEdgeId === '' && this.selectedNodeId === '') {
        this.$message.error('未选择元素！')
      } else if (this.selectedEdgeId !== '') {
        this.graph.getEdges().forEach((edge) => {
          console.log(edge)
          if (edge._cfg.id === this.selectedEdgeId) {
            edge.toFront()
          }
        })
      } else if (this.selectedNodeId !== '') {
        this.graph.getNodes().forEach((node) => {
          if (node._cfg.id === this.selectedNodeId) {
            node.toFront()
          }
        })
      }
    },
    onBottom () {
      if (this.selectedEdgeId === '' && this.selectedNodeId === '') {
        this.$message.error('未选择元素！')
      } else if (this.selectedEdgeId !== '') {
        this.graph.getEdges().forEach((edge) => {
          if (edge._cfg.id === this.selectedEdgeId) {
            edge.toBack()
          }
        })
      } else if (this.selectedNodeId !== '') {
        this.graph.getNodes().forEach((node) => {
          if (node._cfg.id === this.selectedNodeId) {
            node.toBack()
          }
        })
      }
    },
    plus () {
      const currentZoom = Number(this.graph.getZoom())
      this.graph.zoomTo(currentZoom + 0.1)
      this.size = ((currentZoom + 0.1) * 100).toFixed(0)
    },
    minus () {
      const currentZoom = Number(this.graph.getZoom())
      this.graph.zoomTo(currentZoom - 0.1)
      this.size = ((currentZoom + 0.1) * 100).toFixed(0)
    },
    adaptCanvas () {
      this.graph.fitView(20)
      this.graph.fitCenter()
      this.graph.zoomTo(1)
    },
    importFile () {},
    saveImage () {
      this.graph.downloadFullImage('graph', 'image/png', {
        backgroundColor: '#fff',
        padding: [15, 15, 15, 15]
      })
    },
    help () {
      window.open('https://github.com/qiaolufei/kg_editor')
    },
    // 模拟组合键触发函数
    keyCodeForEvent () {
      let code = 0
      let code2 = 0
      let _this = this
      document.onkeydown = function (e) {
        let evn = e || event
        let key = evn.keyCode || evn.which || evn.charCode
        if (key === 17) {
          code = 17
        }
        if (key === 8) {
          code2 = 8
        }
        if (code === 17 && code2 === 8) {
          _this.delete()
          code = 0
          code2 = 0
        }
      }
      document.onkeyup = function (e) {
        if (e.keyCode === 17) {
          code = 0
        }
        if (e.keyCode === 13) {
          code2 = 0
        }
      }
    }

  }
}
</script>
<style lang="less">
.toolbar{
  position: fixed;
  background: #fff;
  width: 100%;
  z-index: 999;
}
</style>
