#### VueTemplate
> 基于Vue.js 2.9.6搭建，引入多个插件，实现快速进入项目开发状态，多个用法在项目中都有示例。
##### 引入的插件
- ###### Axios http://www.axios-js.com/
	- 在utils/http.js里进行二次封装get、post、delete、put方法（参考https://www.cnblogs.com/chaoyuehedy/p/9931146.html），在api.js里统一管理请求。
- ##### qs https://www.npmjs.com/package/qs
	- 用途：序列化和反序列化
	- 在main.js引入，可全局使用  ```this.$qs```
	- 在api.js单独引入
- ##### element-ui https://element.eleme.cn/#/zh-CN
	- 在main.js引入，可全局使用
	- 解决了打包后的样式问题
- ##### ECharts https://echarts.apache.org/zh/index.html
	- 在main.js引入，可全局使用```this.$echarts```
	- 在index.html里有简单的示例
- ##### vue-print-nb https://www.npmjs.com/package/vue-print-nb
	- 打印插件
	- 在index.html里有简单的示例
- ##### file-saver https://github.com/eligrey/FileSaver.js、xlsx https://github.com/SheetJS/js-xlsx
	- 在commen.js里封装，实现外部调用
	``` 
	import { exportToExcel } from '../utils/commen'
	exportToExcel('#id', '文件名')
	```
- ##### commen.js
	- 定义全局可调用的方法
		- exportToExcel：导出Excel
		- isNullAndEmpty： 判断字符串或者数组是否为空