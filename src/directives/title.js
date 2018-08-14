/**
 * 弹出标题的函数
 * @param {DOM} el 
 * @param {String} title 
 */
function showTitle(el, title) {
  const popover = getPopover()
  const popoverStyle = popover.style

  if (title === undefined) {
    popoverStyle.display = 'none'
  } else {
    const elRect = el.getBoundingClientRect()
    const elComputedStyle = window.getComputedStyle(el, null)
    const rightOffset = parseInt(elComputedStyle.getPropertyValue('padding-right')) || 0
    const topOffset = parseInt(elComputedStyle.getPropertyValue('padding-top')) || 0

    popoverStyle.visibility = 'hidden'
    popoverStyle.display = 'block'
    popover.querySelector('.popover-content').textContent = title
    popoverStyle.left = elRect.left - popover.offsetWidth / 2 + (el.offsetWidth - rightOffset) / 2 + 'px'
    popoverStyle.top = elRect.top - popover.offsetHeight + topOffset + 'px'
    popoverStyle.display = 'block'
    popoverStyle.visibility = 'visible'
  }
}
/**
 * 创建提示框
 */
function getPopover() {
  let popover = document.querySelector('.title-popover')

  if (!popover) {
    const tpl = `
        <div class="popover title-popover top fade in" style="position:fixed;">
          <div class="arrow"></div>
          <div class="popover-content"></div>
        </div>
      `
    const fragment = document.createRange().createContextualFragment(tpl)

    document.body.appendChild(fragment)
    popover = document.querySelector('.title-popover')
  }

  return popover
}

// 导出指令对象
export default {
  /**
   * bind 只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置
   * 指令对象的钩子函数的额参数
   * el:指定所绑定的元素，可用来操作 DOM
   * binding:一个对象，binding.value 表示指令的绑定值
   * vnode:Vue 编译生成的虚拟节点
   * oldVnode:上一个虚拟节点，仅在 update 和componentUpdate 钩子函数中调用
   */
  bind(el, binding, vnode) {
    const events = ['mouseenter', 'mouseleave', 'click']
    // 事件处理函数
    const handler = (event) => {
      if (event.type === 'mouseenter') {
        //   鼠标移入 显示标题
        showTitle(el, binding.value)
      } else {
        showTitle()
      }
    }
    // 在 el 元素上监听 event 事件
    events.forEach((event) => {
      el.addEventListener(event, handler, false)
    })

    // 在 el 元素上添加一个属性，以在 其他钩子函数中访问
    el.destroy = () => {
      // 移除事件监听
      events.forEach((event) => {
        el.removeEventListener(event, handler, false)
      })
      //   移除 destory 属性
      el.destroy = null
    }
  },
  unbind(el) {
    //  移除事件监听和事件绑定
    el.destroy()
  }
}
