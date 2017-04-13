;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? module.exports = factory(require('vue'))
        : typeof define === 'function' && define.amd
            ? define(['vue'], factory)
            : factory(global.Vue);
}(this, (function (Vue) {
    'use strict';
    var clickoutsideContext = '@@clickoutsideContext';

    Vue.directive('clickoutside', {
        bind: function (el, binding, vnode) {
            var documentHandler = function (e) {
                if (vnode.context && !el.contains(e.target)) {
                    vnode.context[el[clickoutsideContext].methodName]();
                }
            };
            el[clickoutsideContext] = {
                documentHandler: documentHandler,
                methodName: binding.expression,
                arg: binding.arg || 'click'
            };
            document.addEventListener(el[clickoutsideContext].arg, documentHandler);
        },
        update: function (el, binding) {
            el[clickoutsideContext].methodName = binding.expression;
        },
        unbind: function (el) {
            document.removeEventListener(el[clickoutsideContext].arg, el[clickoutsideContext].documentHandler);
        }
    });

})));