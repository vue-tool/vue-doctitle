/**
 * @Vue     {Object} - Vue
 * @options {Object} - plugin options
 */
class VueDocTitle {
  static install (Vue, options) {
    Vue.directive('doctitle', {
      bind: function () {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
      },
      update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        console.log('v-doctitle = ' + newValue)
        document.title = newValue
      },
      unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
      }
    })
  }
  /**
   * @options {Object} - plugin options-- {String} defTitle, default title
   */
  static wrap (router, options) {
    let defTitle = (options || {}).defTitle || ''
    router.afterEach(function (transition) {
      // body...
      console.log('成功浏览到: ' + transition.to.path)
      let title = transition.to.doctitle || defTitle
      document.title = title
    })
    return router
  }
}
export default VueDocTitle
