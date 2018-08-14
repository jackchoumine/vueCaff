// 本地存储对象
const ls = localStorage

export default {
  //   保存到本地
  setItem(name, value) {
    ls.setItem(name, JSON.stringify(value))
  },
  //   获取本地数据
  getItem(name) {
    try {
      return JSON.parse(ls.getItem(name))
    } catch (e) {
      return null
    }
  },
  //   移除本地保存的数据
  removeItem(name) {
    ls.removeItem(name)
  }
}
