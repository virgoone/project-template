import localeSettings from './en-US/settings'
import localeWorkplace from '../pages/workplace/locale/en-US'
import localeWelcome from '../pages/welcome/locale/en-US'
import locale403 from '../pages/403/locale/en-US'
import locale404 from '../pages/404/locale/en-US'
import locale500 from '../pages/500/locale/en-US'

export default {
  'menu.dashboard': 'Dashboard',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'navbar.docs': 'Docs',
  ...localeSettings,
  ...localeWorkplace,
  ...localeWelcome,
  ...locale403,
  ...locale404,
  ...locale500,
}
