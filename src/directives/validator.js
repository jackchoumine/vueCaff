/*
 * @Description: 表单验证指令
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:14:31 +0800
 * @LastEditors: JackChou
 */
// TODO 重点理解
function validate(el, modifiers, bindingValue) {
  bindingValue = bindingValue && typeof bindingValue === 'object' ? bindingValue : {}
  const value = typeof el.value === 'string' ? el.value.trim() : ''
  const { title = '该项', error } = bindingValue
  let defaultError = ''

  if (modifiers.required && value === '') {
    defaultError = `${title}不能为空`
  } else if (bindingValue.target) {
    const target = document.querySelector(bindingValue.target)
    const targetValue = target ? target.value : null

    if (targetValue !== value) {
      defaultError = `输入的${title}不匹配`
    }
  } else if (bindingValue.regex) {
    try {
      if (!bindingValue.regex.test(value)) {
        defaultError = `${title}格式不正确`
      }
    } catch (e) {}
  }

  if (defaultError) {
    if (error === undefined) {
      showError(el, defaultError)
    } else {
      showError(el, error)
    }
  } else {
    showError(el)
  }
}

function showError(el, error) {
  const parentElement = el.parentElement
  const errorElement = getErrorElement(el)

  if (error === undefined) {
    errorElement.style.display = 'none'
    parentElement.classList.remove('has-error')
  } else {
    errorElement.textContent = error
    errorElement.style.display = 'block'
    parentElement.classList.add('has-error')
  }
}

function getErrorElement(el) {
  const parentElement = el.parentElement
  let errorElement = parentElement.querySelector('.help-block')

  if (!errorElement) {
    const tpl = `<span class="help-block"></span>`
    const fragment = document.createRange().createContextualFragment(tpl)

    parentElement.appendChild(fragment)
    errorElement = parentElement.querySelector('.help-block')
  }

  return errorElement
}

export default {
  bind(el, binding, VNode) {
    const { value, arg, modifiers } = binding
    const eventType = ['change', 'blur', 'input'].indexOf(arg) !== -1 ? arg : 'change'
    const defaultHandler = () => {
      showError(el)
    }
    const handler = () => {
      validate(el, modifiers, value)
    }

    el.addEventListener('input', defaultHandler, false)
    el.addEventListener(eventType, handler, false)

    el.destroy = () => {
      el.removeEventListener('input', defaultHandler, false)
      el.removeEventListener(eventType, handler, false)
      el.destroy = null
    }
  },
  inserted(el, binding, VNode) {
    const { value, modifiers } = binding
    const form = el.closest('[data-validator-form]')
    const submitBtn = form ? form.querySelector('[type=submit]') : null

    if (submitBtn) {
      const submitHandler = () => {
        validate(el, modifiers, value)

        const errors = form.querySelectorAll('.has-error')

        if (!errors.length) {
          submitBtn.canSubmit = true
        } else {
          submitBtn.canSubmit = false
        }
      }

      submitBtn.addEventListener('click', submitHandler, false)

      el.destroySubmitBtn = () => {
        submitBtn.removeEventListener('click', submitHandler, false)
        el.destroySubmitBtn = null
      }
    }
  },
  unbind(el) {
    el.destroy()
    if (el.destroySubmitBtn) el.destroySubmitBtn()
  },
}
/* 
被绑定元素插入父节点时调用，该钩子保证了父节点的存在，因此可以在这里访问父节点 。
{
  inserted(el, binding, VNode) {},
}
<input v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }">
binding.name：指令名，不包括 v- 前缀，这里是 'validator' ；
binding.value：指令的绑定值，这里是 { regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' } ；
binding.arg：传给指令的参数，这里是 'input' ；
binding.modifiers：一个包含修饰符的对象，这里是 { required: true } ；
*/
