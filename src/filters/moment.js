/*
 * @Description: 过滤器
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:15:34 +0800
 * @LastEditors: JackChou
 */
import moment from 'moment'
moment.locale('zh-cn')

const dataFormate = (value, ...rest) => {
  const date = value
  //   验证日期是否合法
  if (moment(date).isValid()) {
    //   获取第二个参数
    const key = rest.shift()
    if (typeof key === 'string') {
      switch (key) {
        case 'from': {
          //   格式化日期为多久之前
          value = moment(date).from()
          // 获取第三个参数
          const otherOpts = rest.shift()
          if (otherOpts && typeof otherOpts === 'object') {
            //   如果参数对象有 startOf 属性，就用 startOf 的值作为开始时间
            value = moment(date)
              .startOf(otherOpts.startOf)
              .from()
          }
          break
        }
        default:
          value = moment(date).formate(key)
      }
    }
  }
  return value
}

export default dataFormate
