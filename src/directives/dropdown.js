/*
 * @Description: 下拉指令
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:11:50 +0800
 * @LastEditors: JackChou
 */
export default {
  bind(el, binding, VNode) {
    const handler = () => {
      el.parentElement.classList.toggle('open')
    }

    const documentHandler = e => {
      const target = e.target

      if (target.isSameNode(el) || el.contains(target)) return
      el.parentElement.classList.remove('open')
    }

    el.addEventListener('click', handler, false)
    document.addEventListener('click', documentHandler, false)

    el.destroy = () => {
      el.removeEventListener('click', handler, false)
      document.removeEventListener('click', documentHandler, false)
      el.destroy = null
    }
  },
  unbind(el) {
    el.destroy()
  },
}
