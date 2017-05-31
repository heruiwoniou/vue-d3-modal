(function ($) {
  var source = [
    {
      id: 1,
      name: '总裁办',
      children: [
        {
          id: 11,
          name: '唐雪飞',
          icon: 'dist/styles/images/action1.png',
          select: false
        }, {
          id: 12,
          name: '唐雪峰',
          icon: 'dist/styles/images/action2.png',
          select: false
        }, {
          id: 13,
          name: '股东甲',
          icon: 'dist/styles/images/action7.png',
          select: false
        }, {
          id: 14,
          name: '股东乙',
          icon: 'dist/styles/images/action8.png',
          select: false
        }
      ]
    }, {
      id: 2,
      name: '高教事业部',
      children: [
        {
          id: 21,
          name: '戴玲玉',
          icon: 'dist/styles/images/action3.png',
          select: false
        }, {
          id: 22,
          name: '韩春梅',
          icon: 'dist/styles/images/action4.png',
          select: false
        }, {
          id: 24,
          name: '综合管理部',
          children: [
            {
              id: 241,
              name: '另一个部门',
              children: [
                {
                  id: 242,
                  name: '戴玲玉',
                  icon: 'dist/styles/images/action3.png',
                  select: false
                }, {
                  id: 243,
                  name: '韩春梅',
                  icon: 'dist/styles/images/action4.png',
                  select: false
                }
              ]
            }, {
              id: 241,
              name: '侯军',
              icon: 'dist/styles/images/action5.png',
              select: false
            }
          ]
        }, {
          id: 25,
          name: '营销中心',
          children: [
            {
              id: 252,
              name: '刘佳',
              icon: 'dist/styles/images/action6.png',
              select: false
            }
          ]
        }
      ]
    }, {
      id: 3,
      name: '普教事业部',
      children: []
    }, {
      id: 4,
      name: '研发中心',
      children: []
    }
  ]
  var store = {
      source: source
    },
    methods = {
      remove: function (item) {
        item.select = false
      },
      clear: function () {
        deepSearch(this.source, function (node) {
          node.select = false
        })
      },
      sure: function () {
        parent
          .WebApi
          .close($.extend([], this.selected))
      },
      close: function () {
        parent
          .WebApi
          .close()
      }
    },
    appVm
  var treeNodes = Vue.component('treeNodes', {
    template: '#node-template',
    props: {
      deep: {
        type: Number,
        default: 0
      },
      source: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data: function () {
      return {expanded: false}
    },
    computed: {
      nodeDeepStyle: function () {
        return {
          paddingLeft: 10 * this.deep + 'px'
        }
      },
      personDeepStyle: function () {
        return {
          paddingLeft: 10 * (this.deep + 1) + 10 + 'px'
        }
      },
      trees: function () {
        return this
          .source
          .children
          .filter(function (o) {
            return o.children !== undefined
          })
      },
      nodes: function () {
        return this
          .source
          .children
          .filter(function (o) {
            return o.children === undefined
          })
      }
    },
    methods: {
      select: function (item) {
        item.select = !item.select
      }
    }
  })
  var deepSearch = function (nodes, action) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i]
      if (node.children !== undefined) {
        deepSearch(node.children, action)
      } else {
        if (node.select) {
          action(node)
        }
      }
    }
  }
  appVm = new Vue({
    el: '#app',
    data: store,
    computed: {
      selected: function () {
        var arr = []
        deepSearch(this.source, function (node) {
          arr.push(node)
        })
        return arr
      }
    },
    methods: methods
  })
})(jQuery)
