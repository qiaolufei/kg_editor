export default{
  type: 'line',
  style: {
    stroke: '#C0C4CC', // 颜色
    lineWidth: 1, // 宽度
    lineAppendWidth: 0, // 鼠标检测宽度
    startArrow: false, // 开始箭头
    endArrow: true, // 结束箭头
    cursor: 'pointer'
  },
  label: '',
  labelCfg: {
    position: 'middle', // 位置
    refX: 0, // X偏移量
    refY: 0, // Y偏移量
    autoRotate: true, // 跟随边旋转
    style: {
      fill: '#4682B4', // 文本颜色
      fontWeight: 400,
      opacity: 1, // 文本透明度
      fontFamily: '微软雅黑', // 文本字体
      fontSize: 14 // 文本字体大小
    }
  }
}
