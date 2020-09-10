import DiaFooter from './en-US/components/DiaFooter';
import DiaUserInfoCmp from './en-US/components/DiaUserInfoCmp';
import agentsCtn from './en-US/containers/Agents';
import commonMessages from './en-US/commonMessages';
import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import home from './en-US/components/home';
import intelligencesCtn from './en-US/containers/intelligences';
import intelligencesHistoryCtn from './en-US/containers/IntelligencesHistory';
import loginCtn from './en-US/containers/Login';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import errorMsg from './en-US/error';
import settingsCtn from './en-US/containers/Settings';
import signupCtn from './en-US/containers/Signup';
import retailersCtn from './en-US/containers/Retailers';
import HeadlessAgentCtn from './en-US/containers/HeadlessAgent';
import ServiceAgentCtn from './en-US/containers/ServiceAgent';
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
  ...errorMsg,
  ...component,
  ...loginCtn,
  ...agentsCtn,
  ...retailersCtn,
  ...settingsCtn,
  ...intelligencesCtn,
  ...intelligencesHistoryCtn,
  ...signupCtn,
  ...HeadlessAgentCtn,
  ...ServiceAgentCtn,
};
