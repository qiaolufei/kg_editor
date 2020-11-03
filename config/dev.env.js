// 开发环境变量
'use strict'
const merge = require('webpack-merge') // 合并对象
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, { // 合并两个配置文件对象生成一个新的配置文件
  NODE_ENV: '"development"'
})
