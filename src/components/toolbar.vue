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
          <template v-else-if="index==2 || index == 5 || index == 7 || index == 11 || index == 13">
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
  data: () => ({
    size: 100,
    tools: [
      { icon: 'mdi-undo-variant', tip: '撤销 Ctrl+Z', event: 'revoke' },
      { icon: 'mdi-backup-restore', tip: '重做', event: 'restore' },
      { icon: 'mdi-content-copy', tip: '复制 Ctrl+C', event: 'copy' },
      { icon: 'mdi-content-paste', tip: '粘贴 Ctrl+V', event: 'paste' },
      { icon: 'mdi-trash-can-outline', tip: '删除 Delete', event: 'delete' },
      { icon: 'mdi-vector-arrange-above', tip: '置于顶层', event: 'plus' },
      { icon: 'mdi-vector-arrange-below', tip: '置于底层', event: 'plus' },
      { icon: 'mdi-magnify-plus-outline', tip: '放大', event: 'plus' },
      { icon: 'mdi-magnify-minus-outline', tip: '缩小', event: 'minus' },
      { icon: 'mdi-arrow-collapse-all', tip: '适应画布', event: 'adaptCanvas' },
      { icon: 'mdi-cloud-upload', tip: '导入文件', event: 'importFile' },
      { icon: 'mdi-file-image', tip: '导出图片', event: 'saveImage' },
      { icon: 'mdi-file-pdf', tip: '导出PDF', event: 'savePDF' },
      { icon: 'mdi-help-box', tip: '帮助', event: 'help' }
    ]
  }),
  methods: {
    comment_event (event) { // 事件中转
      this[event]()
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
