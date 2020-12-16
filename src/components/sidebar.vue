<template>
  <div>
    <v-app>
      <v-expansion-panels multiple tile class="panel" v-model="bigPanels">
        <v-expansion-panel>
          <v-expansion-panel-header style="font-weight: bold">
            配置器
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-expansion-panels
              v-if="selectedNodeId"
              multiple
              tile
              class="littlepanel"
              v-model="littlePanels"
              accordion
            >
              <v-expansion-panel tile>
                <v-expansion-panel-header> 节点样式 </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >&emsp;&emsp;半径：<el-input
                        @input="nodeChange"
                        v-model="radius"
                        style="width: 40%"
                        type="number"
                        size="mini"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >背景颜色：<el-color-picker
                        @change="nodeChange"
                        v-model="node.style.fill"
                        style="vertical-align: top"
                        size="mini"
                        show-alpha
                      ></el-color-picker>
                    </el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >边框宽度：<el-input
                        @input="nodeChange"
                        v-model="node.style.lineWidth"
                        style="width: 40%"
                        type="number"
                        size="mini"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >边框颜色：<el-color-picker
                        @change="nodeChange"
                        v-model="node.style.stroke"
                        style="vertical-align: top"
                        size="mini"
                      ></el-color-picker>
                    </el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >阴影颜色：<el-color-picker
                        @change="nodeChange"
                        v-model="node.style.shadowColor"
                        style="vertical-align: top"
                        size="mini"
                      ></el-color-picker>
                    </el-col>
                    <el-col :span="12"
                      >阴影范围：<el-input
                        @input="nodeChange"
                        v-model="node.style.shadowBlur"
                        style="width: 40%"
                        type="number"
                        size="mini"
                      ></el-input
                    ></el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >X&nbsp;偏移量：<el-input
                        @input="nodeChange"
                        v-model="node.style.shadowOffsetX"
                        style="width: 40%"
                        type="number"
                        size="mini"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >Y&nbsp;偏移量：<el-input
                        @input="nodeChange"
                        v-model="node.style.shadowOffsetY"
                        style="width: 40%"
                        type="number"
                        size="mini"
                      ></el-input
                    ></el-col>
                  </el-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel tile>
                <v-expansion-panel-header> 节点文本 </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="24"
                      >内容：<el-input
                        @input="nodeChange"
                        v-model="node.label"
                        style="width: 81%"
                        size="mini"
                      ></el-input
                    ></el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >大小：<el-input
                        @input="nodeChange"
                        v-model="node.labelCfg.style.fontSize"
                        style="width: 60%"
                        size="mini"
                        type="number"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >粗细：<el-input
                        @input="nodeChange"
                        v-model="node.labelCfg.style.fontWeight"
                        :min="100"
                        :max="900"
                        :step="100"
                        style="width: 60%"
                        size="mini"
                        type="number"
                      ></el-input
                    ></el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >颜色：<el-color-picker
                        @change="nodeChange"
                        v-model="node.labelCfg.style.fill"
                        style="vertical-align: top"
                        size="mini"
                      ></el-color-picker>
                    </el-col>
                    <el-col :span="12"
                      >定位：<el-select
                        @change="nodeChange"
                        v-model="node.labelCfg.position"
                        style="width: 60%"
                        size="mini"
                      >
                        <el-option
                          v-for="item in placeList"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option> </el-select
                    ></el-col>
                  </el-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels
              v-if="selectedEdgeId"
              multiple
              tile
              class="littlepanel"
              v-model="littlePanels"
              accordion
            >
              <v-expansion-panel tile>
                <v-expansion-panel tile>
                  <v-expansion-panel-header>
                    连线样式
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >类型：<el-select
                        @change="edgeChange"
                        v-model="edge.type"
                        style="width: 60%"
                        size="mini"
                      >
                        <el-option
                          v-for="item in lineList"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option> </el-select
                    ></el-col>
                  </el-row>
                    <el-row type="flex" :gutter="20">
                      <el-col :span="12"
                        >宽度：<el-input
                          @input="edgeChange"
                          v-model="edge.style.lineWidth"
                          style="width: 40%"
                          type="number"
                          size="mini"
                        ></el-input
                      ></el-col>
                      <el-col :span="12"
                        >颜色：<el-color-picker
                          @change="edgeChange"
                          v-model="edge.style.stroke"
                          style="vertical-align: top"
                          size="mini"
                        ></el-color-picker>
                      </el-col>
                    </el-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel-header> 连线文本 </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="24"
                      >内容：<el-input
                        @input="edgeChange"
                        v-model="edge.label"
                        style="width: 81%"
                        size="mini"
                      ></el-input
                    ></el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >大小：<el-input
                        @input="edgeChange"
                        v-model="edge.labelCfg.style.fontSize"
                        style="width: 60%"
                        size="mini"
                        type="number"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >粗细：<el-input
                        @input="edgeChange"
                        v-model="edge.labelCfg.style.fontWeight"
                        :min="100"
                        :max="900"
                        :step="100"
                        style="width: 60%"
                        size="mini"
                        type="number"
                      ></el-input
                    ></el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >颜色：<el-color-picker
                        @change="edgeChange"
                        v-model="edge.labelCfg.style.fill"
                        style="vertical-align: top"
                        size="mini"
                      ></el-color-picker>
                    </el-col>
                    <el-col :span="12"
                      >定位：<el-select
                        @change="edgeChange"
                        v-model="edge.labelCfg.position"
                        style="width: 60%"
                        size="mini"
                      >
                        <el-option
                          v-for="item in placeList1"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option> </el-select
                    ></el-col>
                  </el-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="panel" tile>
          <v-expansion-panel-header style="font-weight: bold">
            导航器
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div ref="minimap" class="g6-minimap"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-app>
  </div>
</template>
<script>
export default {
  props: {
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
    lineList: ['line', 'polyline', 'arc', 'quardratic', 'cubic', 'cubic-horizontal'],
    placeList: ['center', 'top', 'bottom', 'left', 'right'],
    placeList1: ['start', 'middle', 'end'],
    bigPanels: [0, 1],
    littlePanels: [0, 1],
    radius: '',
    node: {
      style: {},
      labelCfg: {
        style: {}
      }
    },
    edge: {
      style: {},
      labelCfg: {
        style: {}
      }
    }
  }),
  methods: {
    nodeChange () {
      this.node.size = [this.radius * 2, this.radius * 2]
      this.graph.updateItem(this.node.id, this.node)
      this.$store.commit('updateNode', this.node)
    },
    edgeChange () {
      this.graph.updateItem(this.edge.id, this.edge)
      this.$store.commit('updateEdge', this.edge)
    }
  }
}
</script>
<style lang="less" scoped>
.g6-minimap {
  width: 100%;
  height: 20vw;
  border: 1px solid #35495e;
}
/deep/ .el-col-12 {
  margin-top: 5px;
}
/deep/ .panel .v-expansion-panel-content__wrap {
  padding: 0 3px 10px 3px;
  box-sizing: border-box;
}
/deep/ .littlepanel .v-expansion-panel-content__wrap {
  padding: 0 10px 10px 20px;
  box-sizing: border-box;
}
</style>
