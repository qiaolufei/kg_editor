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

// 判断字符、数组是否为空 空返回true
function isNullAndEmpty (param) {
  if (param instanceof Array) {
    if (param.length > 0) {
      return false
    } else {
      return true
    }
  } else {
    if (param === undefined || param === null || param === '' || param === 'null') {
      return true
    } else {
      return false
    }
  }
}
export {
  exportToExcel,
  isNullAndEmpty
}
