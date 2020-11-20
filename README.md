<h1 align="center">知识图谱编辑器(KG-Editor)</h1>
<div align="center">

基于 [Vue 2.x](https://cn.vuejs.org/v2/guide/) +  [G6 3.8](https://g6.antv.vision/zh)  + [Vuetify](https://vuetifyjs.com/en/) 的可视化知识图谱编辑器(KG-Editor)

</div>

## 功能介绍

- [x] 添加节点---双击画布空白处添加节点
- [x] 编辑节点---点击节点后可在右侧配置器进行编辑节点
- [x] 添加连线---鼠标移入节点后显示锚点，点击锚点后便作为起始节点，点击其它节点实现连线
- [x] 编辑连线---点击连线后可在右侧配置器进行编辑连线
- [x] 缩略图&emsp;---右侧导航器实现缩略图
- [ ] 撤销功能
  - [ ] 点击按钮撤销
  - [ ] Ctrl + Z撤销
- [ ] 重做功能
- [ ] 复制节点功能
  - [ ] 点击按钮复制
  - [ ] Ctrl + C复制
- [ ] 粘贴节点功能
  - [ ] 点击按钮粘贴
  - [ ] Ctrl + V粘贴
- [ ] 删除节点、连线功能
  - [ ] 点击按钮删除
  - [ ] Delete删除
- [ ] 置于顶层功能
- [ ] 置于底层功能
- [ ] 放大画布功能
  - [ ] 点击按钮放大
  - [x] 鼠标滚轮上滑
- [ ] 缩小画布功能
  - [ ] 点击按钮缩小
  - [x] 鼠标滚轮下滑
- [ ] 上传数据文件生成知识图谱功能
- [ ] 导出图片功能
- [ ] 导出PDF功能
## 项目目录
```py
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── actions                                 // G6事件
│   │   ├── add_edge.js                         // 添加连线
│   │   ├── add_node.js                         // 添加节点
│   │   ├── hover_node.js                       // hover节点
│   │   ├── select_edge.js                      // 选择连线
│   ├── components                              // 组件
│   │   ├── sidebar.vue                         // 侧导航栏
│   │   ├── toolbar.vue                         // 主功能栏
│   ├── default                                 // 默认配置
│   │   ├── default_edge.js                     // 连线默认样式
│   │   ├── default_node.js                     // 节点默认样式
│   ├── store
│   │   ├── store.js                            // 全局数据配置
│   ├── pages
│   │   ├── index.vue                           // 主页面
_________
```
## 学习使用
```
# 克隆仓库
$ git clone https://github.com/qiaolufei/kg_editor.git

# 安装依赖
$ npm install / cnpm install

# 运行示例
$ npm run dev
```
