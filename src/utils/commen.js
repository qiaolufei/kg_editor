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

export {
  exportToExcel,
  isNullAndEmpty
}
