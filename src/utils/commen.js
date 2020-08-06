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

const funJS = { // 函数相关方法
  throttle (fn, delay) { // 节流
    var lastTime = 0 // 记录上一次函数触发的时间
    return function () {
      let nowTime = Date.now() // 记录上一次函数触发的时间
      if (nowTime - lastTime > delay) {
        fn().call(this) // 修正this指向
        lastTime = nowTime // 同步时间
      }
    }
  },
  debounce (fn, delay) { // 防抖
    var timer = null // 记录上一次的延时器
    return function () {
      clearTimeout(timer) // 清除上一次的延时器
      timer = setTimeout(function () {
        fn.apply(this)
      }, delay)
    }
  }
}

const timeJS = { // 时间相关方法
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

const arrayJS = { // 数组相关方法
  unqiueArr (arr) { // 数组去重
    let [...arr1] = new Set(arr)
    return arr1
  },
  tileArr (arr) { // 平铺多维数组
    return arr.reduce((acc, cur) =>
      acc.concat(Array.isArray(cur) ? this.tileArr(cur) : cur), [])
  },
  arrOperation (arr1, arr2, mode) { // 两个数组之间的运算
    let arr11 = new Set(arr1)
    let arr22 = new Set(arr2)
    switch (mode) {
      case 1: // 交集
        return arr1.filter(x => arr22.has(x))
      case 2: // 差集
        return arr1.filter(x => !arr22.has(x))
      case 3: // 补集
        return [...arr1.filter(x => !arr22.has(x)), ...arr2.filter(x => !arr11.has(x))]
      case 4: // 并集
        return Array.from(new Set([...arr1, ...arr2]))
    }
  }
}

const objectJS = {
  cloneObject (target, source) { // 深拷贝对象
    var names = Object.getOwnPropertyNames(source) // 获取对象的所有属性名
    for (var i = 0; i < names.length; i++) {
      var desc = Object.getOwnPropertyDescriptor(source, names[i])
      if (typeof (desc.value) === 'object' && desc.value !== null) {
        var obj
        if (Array.isArray(desc.value)) {
          obj = []
        } else {
          obj = {}
        }
        Object.defineProperty(target, names[i], {
          configurable: desc.configurable, // 不可删除
          enumerable: desc.enumerable, // 是否可遍历
          value: obj, // 值
          writable: desc.writable // 是否可修改
        })
        this.cloneObject(obj, desc.value)
      } else {
        Object.defineProperty(target, names[i], desc)
      }
    }
  },
  clearValue (obj) { // 清空所有value(string为''/Array为[]/Number为0/Boolean为true)
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = ''
      } else if (obj[key] instanceof Array) {
        obj[key] = []
      } else if (typeof obj[key] === 'number') {
        obj[key] = 0
      } else if (typeof obj[key] === 'boolean') {
        obj[key] = true
      }
    }
  }
}
export {
  exportToExcel,
  isNullAndEmpty,
  funJS, timeJS, arrayJS, objectJS
}
