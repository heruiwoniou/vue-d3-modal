(function (global) {
  function When2do (fn, times) {
    this.times = times || 10
    this.condition = fn
    this.t = null
    this.error = 0

    var that = this
    return new Promise(function (resolve, reject) {
      that.t = setTimeout(function () {
        if (that.condition()) {
          clearTimeout(that.t)
          that.t = null
          resolve()
        } else if (that.error++ > that.times) {
          reject(new Error('Did not meet the conditions'))
        } else {
          that.t = setTimeout(arguments.callee.bind(this), 500)
        }
      })
    })
  }

  global.When2do = When2do
})(this)
