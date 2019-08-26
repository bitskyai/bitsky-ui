import commonMessages from './en-US/commonMessages';
import home from './en-US/components/home';
import DiaUserInfoCmp from './en-US/components/DiaUserInfoCmp';
import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
// import settings from './en-US/settings';
export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  ...DiaUserInfoCmp,
  ...home,
  ...commonMessages,
  ...globalHeader,
  ...menu,
  ...pwa,
  ...component,
};
