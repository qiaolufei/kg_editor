export default{
  size: [60, 60],
  linkPoints: { // 锚点
    bottom: false,
    stroke: '#4682B4',
    fill: '#fff',
    size: 10
  },
  style: {
    fill: '#4682B4', // 填充色
    stroke: '#4682B4', // 描边颜色
    lineWidth: 1, // 描边宽度
    shadowColor: '#909399', // 阴影颜色
    shadowBlur: 10, // 阴影范围
    shadowOffsetX: 3, // 阴影 x 方向偏移量
    shadowOffsetY: 3, // 阴影 y 方向偏移量
    cursor: 'pointer'
  },
  labelCfg: {
    position: 'center', // 文本位置
    style: {
      fill: '#fff', // 文本颜色
      fontWeight: 400,
      opacity: 1, // 文本透明度
      fontFamily: '微软雅黑', // 文本字体
      fontSize: 18 // 文本字体大小
    }
  }
}
