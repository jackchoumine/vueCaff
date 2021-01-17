/*
 * @Description: 本地存储
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 20:13:28 +0800
 * @LastEditors: JackChou
 */
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
  },
}
