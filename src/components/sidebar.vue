<template>
  <div>
    <v-app>
      <v-expansion-panels multiple tile v-model="bigPanels">
        <v-expansion-panel>
          <v-expansion-panel-header style="font-weight: bold">
            配置器
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-expansion-panels multiple tile v-model="littlePanels" accordion>
              <v-expansion-panel tile>
                <v-expansion-panel-header> 位置 </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <el-row type="flex" :gutter="20">
                      <el-col :span="12"
                        >X：<el-input
                          v-model="node.x"
                          style="width: 60%"
                          type="number"
                          size="mini"
                        ></el-input
                      ></el-col>
                      <el-col :span="12"
                        >Y：<el-input
                          v-model="node.y"
                          style="width: 60%"
                          type="number"
                          size="mini"
                        ></el-input
                      ></el-col>
                    </el-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel tile>
                <v-expansion-panel-header> 样式 </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >半径：<el-input
                        style="width: 60%"
                        type="number"
                        size="mini"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >背景颜色：<el-color-picker
                        v-model="node.color"
                        style="vertical-align: top"
                        size="mini"
                        show-alpha
                      ></el-color-picker>
                    </el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >边框：<el-input
                        style="width: 60%"
                        type="number"
                        size="mini"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >边框颜色：<el-color-picker
                        style="vertical-align: top"
                        size="mini"
                      ></el-color-picker>
                    </el-col>
                  </el-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel tile>
                <v-expansion-panel-header> 文本 </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="24"
                      >内容：<el-input v-model="node.label" style="width: 80%" size="mini"></el-input
                    ></el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >大小：<el-input
                        style="width: 60%"
                        size="mini"
                        type="number"
                      ></el-input
                    ></el-col>
                    <el-col :span="12"
                      >粗细：<el-input
                        style="width: 60%"
                        size="mini"
                        type="number"
                      ></el-input
                    ></el-col>
                  </el-row>
                  <el-row type="flex" :gutter="20">
                    <el-col :span="12"
                      >颜色：<el-color-picker
                        style="vertical-align: top"
                        size="mini"
                      ></el-color-picker>
                    </el-col>
                    <el-col :span="12"
                      >定位：<el-select
                        v-model="fontPlace"
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
  props: ['selectedNodeId'],
  watch: {
    selectedNodeId: {
      handler (newVal, oldVal) {
        if (newVal !== '') {
          let nodeArr = this.$store.state.dataList.nodes.filter((item) => {
            return item.id === newVal
          })
          this.node = nodeArr[0]
        }
      }
    }
  },
  data: () => ({
    fontPlace: '居中',
    placeList: ['居中', '上', '下', '左', '右'],
    bigPanels: [0, 1],
    littlePanels: [0, 1, 2],
    node: {
    }
  })
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
  padding: 0 0 10px 0;
}
</style>
