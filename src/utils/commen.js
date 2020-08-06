// 通用方法
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
// 导出表格
function exportToExcel (id, name) {
  var xlsxParam = { raw: true }
  var wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam)
  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
  try {
    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name + '.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') {
    }
  }
  return wbout
}

// 判断字符、数组、对象是否为空 空返回true
function isNullAndEmpty (param) {
  if (param instanceof Array) { // 数组
    if (param.length > 0) {
      return false
    } else {
      return true
    }
  } else if (typeof param === 'string') { // 字符串
    if (param === undefined || param === null || param.trim() === '') {
      return true
    } else {
      return false
    }
  } else if (Object.prototype.toString.call(param) === '[object Object]') { // 对象
    for (var key in param) {
      return false
    }
    return true
  }
}

const timeJS = {
  formatTime (param, format) {
    let d = param === 0 ? new Date() : new Date(param)
    let year = d.getFullYear()
    let month = (d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
    let day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate()
    let hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours()
    let minute = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()
    let second = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds()
    switch (format) {
      case 'timestamp' :
        return d.valueOf()
      case 'yyyy':
        return year
      case 'yyyy-MM':
        return year + '-' + month
      case 'yyyy年MM月':
        return year + '年' + month + '月'
      case 'MM-dd':
        return month + '-' + day
      case 'MM月dd日':
        return month + '月' + day + '日'
      case 'yyyy-MM-dd':
        return year + '-' + month + '-' + day
      case 'yyyy年MM月dd日':
        return year + '年' + month + '月' + day + '日'
      case 'yyyy-MM-dd hh:mm:ss':
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      case 'yyyy年MM月dd日 hh时mm分ss秒':
        return year + '-' + month + '-' + day + ' ' + hour + '时' + minute + '分' + second + '秒'
      default:
        return d
    }
  },
  getNowTime (format) { // 获取当前时间
    return this.formatTime(0, format)
  },
  timeToStamp (timestamp, format) { // 时间戳转为日期格式
    return this.formatTime(timestamp, format)
  },
  compareTime (startTime, endTime) { // 比较时间大小
    if (new Date(endTime).valueOf() - new Date(startTime).valueOf() >= 0) {
      return true
    } else {
      return false
    }
  },
  countdown (time) { // 计算时间差，可用于倒计时
    let nowtime = new Date()
    let endtime = new Date(time)
    let lefttime = endtime.getTime() - nowtime.getTime()
    if (lefttime > 0) {
      let leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24))
      let lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24)
      let leftm = Math.floor(lefttime / (1000 * 60) % 60)
      let lefts = Math.floor(lefttime / 1000 % 60)
      if (leftd > 0) {
        return leftd + '天 ' + lefth + ':' + leftm + ':' + lefts
      } else {
        return lefth + ':' + leftm + ':' + lefts
      }
    } else {
      return false
    }
  }
}
export {
  exportToExcel,
  isNullAndEmpty,
  timeJS
}
