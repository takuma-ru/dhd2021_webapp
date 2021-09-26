export default {
  install (vue) {
    vue.prototype.$setInterval = (func, intervalMilliSec) => {
      const id = setInterval(() => {
        func()
      }, intervalMilliSec)
      return id
    }
  }
}