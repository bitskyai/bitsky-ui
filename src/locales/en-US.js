import commonMessages from './en-US/commonMessages';
import home from './en-US/components/home';
import DiaUserInfoCmp from './en-US/components/DiaUserInfoCmp';
import DiaFooter from './en-US/components/DiaFooter';
import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import loginCtn from './en-US/containers/Login';
import agentsCtn from './en-US/containers/Agents';
import soisCtn from './en-US/containers/Sois';
import intelligencesCtn from './en-US/containers/intelligences';
import signupCtn from './en-US/containers/Signup';
// import settings from './en-US/settings';
export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  ...DiaFooter,
  ...DiaUserInfoCmp,
  ...home,
  ...commonMessages,
  ...globalHeader,
  ...menu,
  ...pwa,
  ...component,
  ...loginCtn,
  ...agentsCtn,
  ...soisCtn,
  ...intelligencesCtn,
  ...signupCtn
};
