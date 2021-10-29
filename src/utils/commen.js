// 通用方法
// 判断字符、数组、对象是否为空 空返回true
const isNullAndEmpty = (param) => {
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

const objectJS = { // 对象相关方法
  deepClone (obj, hash = new WeakMap()) { // 深拷贝对象
    if (obj === null) return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== 'object') return obj
    if (hash.get(obj)) return hash.get(obj)
    let cloneObj = new obj.constructor()
    hash.set(obj, cloneObj)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloneObj[key] = this.deepClone(obj[key], hash)
      }
    }
    return cloneObj
  }
}

export {
  isNullAndEmpty, objectJS
}
