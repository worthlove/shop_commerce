/* eslint-disable no-tabs */
// 节流工具函数
/**
 * @param {*} fn 是我们需要包装的事件回调
 * @param {*} wait 是每次推迟执行的等待时间
 */
const throttle = (fn, wait = 1500) => {
  let inThrottle, lastFn, lastTime
  return function () {
    const context = this
    const args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
export default throttle

// 1、监听 scroll、mousemove 等事件 - 节流（每隔一秒计算一次位置）
// 2、监听浏览器窗口 resize 操作 - 防抖（只需计算一次）
// 3、键盘文本输入的验证 - 防抖（连续输入文字后发送请求进行验证，验证一次就好）
// 4、提交表单 - 防抖（多次点击变为一次）
// 5、search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
// 6、登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖

// Vue中的使用(index.vue)：
// <script>
// 	import debounce from "../utils/debounce";
//  import throttle from "../utils/throttle";
//
// 	methods:{
// 		// 防抖方法
// 		change: debounce (function () {
// eslint-disable-next-line no-tabs
// 			// 逻辑
// 		},1000)
//
// 		// 节流方法
// 		change: throttle(function () {
// 			// 逻辑
//     },1000)
// eslint-disable-next-line no-tabs
// 	}
// </script>
