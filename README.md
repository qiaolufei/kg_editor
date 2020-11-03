#### VueTemplate
> 基于Vue.js 2.9.6搭建，引入多个插件，实现快速进入项目开发状态，多个用法在项目中都有示例。
##### 引入的插件
- ##### Vuex  https://www.npmjs.com/package/vuex
    - 新建store/store.js,有简单的state、mutations、actions、getters示例
- ##### Axios http://www.axios-js.com/
	- 在utils/http.js里进行二次封装get、post、delete、put方法，在api.js里统一管理请求。(参考 https://www.cnblogs.com/chaoyuehedy/p/9931146.html )
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
- ##### file-saver https://github.com/eligrey/FileSaver.js
- ##### xlsx https://github.com/SheetJS/js-xlsx
	- 导出EXCEL
	- 在commen.js里封装，实现外部调用
	``` 
	import { exportToExcel } from '../utils/commen'
	exportToExcel('#id', '文件名')
	```
- ##### commen.js
	- 定义全局可调用的方法
		- exportToExcel (id, name)：导出Excel
		- isNullAndEmpty (param)： 判断字符串、数组、对象是否为空
		- funJS：函数相关方法
    	  - throttle (fn, delay)：节流
    	  - debounce (fn, delay)：防抖 
		- timeJS: 时间相关方法
  		  - getNowTime (format)：获取当前时间，传入需要的格式
  		  - timeToStamp (timestamp, format)：时间戳转为日期格式
  		  - compareTime (startTime, endTime)：比较时间大小
  		  - countdown (time)：计算时间差，可用于倒计时
        - arrayJS：数组相关方法
          - unqiueArr (arr)：数组去重
          - tileArr (arr)：平铺多维数组
          - arrOperation (arr1, arr2, mode)：两个数组之间的运算(交集、差集、补集、并集)
        - objectJS：对象相关方法
          - deepClone (obj)：深拷贝对象
          - clearValue (obj)：清空所有value(string为''/Array为[]/Number为0/Boolean为true)