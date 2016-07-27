function warn (msg) {
  /* istanbul ignore next */
  if (typeof console !== 'undefined') {
    console.error('[vue-doctitle] ' + msg)
  }
}

class VueDocTitle {
  /**
   * @options {Object} - plugin options-- {String} defTitle, default title; {function} filter, title filter (when non-default title)
   */
  static wrap (router, options) {
    let filter = (options || {}).filter
    let defTitle = (options || {}).defTitle || ''
    router.afterEach(function (transition) {
      var title = transition.to.doctitle
      if (title && filter) {
        title = filter(title)
      } else {
        title = defTitle
      }
      document.title = title
    })
    return router
  }
}

/* Installation */
VueDocTitle.installed = false

VueDocTitle.install = function (Vue, options) {
  if (VueDocTitle.installed) {
    warn('already installed.')
    return
  }
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
  VueDocTitle.installed = true
}

export default VueDocTitle
