import localeSettings from './zh-CN/settings'
import localeWorkplace from '../pages/workplace/locale/zh-CN'
import localeWelcome from '../pages/welcome/locale/zh-CN'

export default {
  'menu.dashboard': '仪表盘',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'navbar.docs': '文档中心',
  ...localeSettings,
  ...localeWorkplace,
  ...localeWelcome,
}
