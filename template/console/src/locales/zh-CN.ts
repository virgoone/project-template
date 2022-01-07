import localeSettings from './zh-CN/settings'
import localeWorkplace from '../pages/workplace/locale/zh-CN'
import localeWelcome from '../pages/welcome/locale/zh-CN'
import locale403 from '../pages/403/locale/zh-CN'
import locale404 from '../pages/404/locale/zh-CN'
import locale500 from '../pages/500/locale/zh-CN'

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
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeWorkplace,
  ...localeWelcome,
}
