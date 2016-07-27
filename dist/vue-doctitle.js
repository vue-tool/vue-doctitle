/**
 * vue-doctitle v0.0.2
 * (c) 2016 bblue000
 * https://github.com/vue-tool/vue-doctitle
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.VueDocTitle = factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  function warn(msg) {
    /* istanbul ignore next */
    if (typeof console !== 'undefined') {
      console.error('[vue-doctitle] ' + msg);
    }
  }

  var VueDocTitle = (function () {
    function VueDocTitle() {
      babelHelpers.classCallCheck(this, VueDocTitle);
    }

    /* Installation */

    /**
     * @options {Object} - plugin options-- {String} defTitle, default title; {function} filter, title filter (when non-default title)
     */

    VueDocTitle.wrap = function wrap(router, options) {
      var filter = (options || {}).filter;
      var defTitle = (options || {}).defTitle || '';
      router.afterEach(function (transition) {
        var title = transition.to.doctitle;
        if (title && filter) {
          title = filter(title);
        } else {
          title = defTitle;
        }
        document.title = title;
      });
      return router;
    };

    return VueDocTitle;
  })();

  VueDocTitle.installed = false;

  VueDocTitle.install = function (Vue, options) {
    if (VueDocTitle.installed) {
      warn('already installed.');
      return;
    }
    Vue.directive('doctitle', {
      bind: function bind() {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
      },
      update: function update(newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        console.log('v-doctitle = ' + newValue);
        document.title = newValue;
      },
      unbind: function unbind() {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
      }
    });
    VueDocTitle.installed = true;
  };

  return VueDocTitle;

}));