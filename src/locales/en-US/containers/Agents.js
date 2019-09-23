/*
 * Agents Messages
 *
 * This contains all the text for the Agents container.
 */

// import { defineMessages } from 'react-intl';

// export default defineMessages({
export default {
  'app.containers.Agents.second': 'second',
  'app.containers.Agents.header': 'Agents',
  'app.containers.Agents.emptyAgents':
    'You don\'t have any <a href="https://docs.munew.io/guide/concepts/agent" target="_blank">Agents</a>',
  'app.containers.Agents.registerNow': 'Register',
  'app.containers.Agents.drawerTitleCreate': 'Register an Agent',
  'app.containers.Agents.drawerTitleUpdate': 'Modify this Agent',
  'app.containers.Agents.registerAgentDescription':
    'Agent is the client that collect the intelligences your SOIs created. It has several types: <a href="#" target="_blank">browser extension</a>, <a href="#" target="_blank">service</a>, you also can develop an agent by yourself',
  'app.containers.Agents.deleteAgentDescription': 'Are you sure delete this Agent?',
  'app.containers.Agents.deleteAgentSuccessful': 'Delete Agent Successful',
  'app.containers.Agents.agentName': 'Name',
  'app.containers.Agents.agentNamePlaceholder': "Please enter your Agent's name",
  'app.containers.Agents.agentNameInvalid':
    'Agent Name is invalid, please enter 3 to 50 characters',
  'app.containers.Agents.agentNameExample': 'Chrome Extension',
  'app.containers.Agents.agentNameDescription':
    'Give a meaningful name to your Agent, between 1 to 100 characters',
  'app.containers.Agents.agentDescription': 'Description',
  'app.containers.Agents.agentDescriptionPlaceholder': 'Type some words to describe your agent',
  'app.containers.Agents.agentDescriptionInvalid':
    'Agent description is too long, please enter 1 to 200 characters',
  'app.containers.Agents.agentDescriptionExample': 'My First Chrome Extension Agent',
  'app.containers.Agents.agentDescriptionDescription':
    'Give a meaningful description to your Agent, between 1 to 200 characters',
  'app.containers.Agents.baseURL': 'Base URL',
  'app.containers.Agents.baseURLEmptyError': 'Please enter a valid base URL',
  'app.containers.Agents.baseURLExample': 'http://localhost:3000',
  'app.containers.Agents.baseURLDescription':
    'Base url of your service agent, make sure DIA Agent can access your service agent',
  'app.containers.Agents.registerAgentSuccessful': 'Register SOI Successful',
  'app.containers.Agents.healthDescription':
    'Health check API endpoint for your SOI(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your SOI. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>',
  'app.containers.Agents.agentType': 'Agent Type',
  'app.containers.Agents.agentTypePlaceHolder': 'Please select your Agent Type',
  'app.containers.Agents.agentTypeDescription':
    'Please select your Agent Type. <a href="https://docs.munew.io/guide/concepts/agent" target="_blank">Learn More.</a>',
  'app.containers.Agents.browserExtensionAgent': 'Browser Extension',
  'app.containers.Agents.serviceAgent': 'Serivce Agent',
  'app.containers.Agents.agentConfiguration': 'Agent Configuration',
  'app.containers.Agents.agentConfigurationDescription':
    'Configure your agent based on your need, otherwise you can keep it as default.',
  'app.containers.Agents.activeAgent': 'Active',
  'app.containers.Agents.watchingNewJobDescription':
    'After you configure correctly, then you can active this agent, it will check whether has new intelligences need to collect every {pollingInterval} second. You can change this value in <a href="#pollingInterval">Polling Interval</a>',
  'app.containers.Agents.privateMode': 'Private Mode',
  'app.containers.Agents.privateModeDescription':
    'Private mode means your agent will only collect intelligences that created by yourself',
  'app.containers.Agents.switchOn': 'ON',
  'app.containers.Agents.switchOff': 'OFF',
  'app.containers.Agents.diaBaseURL': 'DIA Base URL',
  'app.containers.Agents.diaBaseURLPlaceholder': 'Please enter a valid URL',
  'app.containers.Agents.diaBaseURLExample': 'https://munew.io',
  'app.containers.Agents.diaBaseURLDescription':
    'Base url of your DIA. For example: <span class="ant-typography"><code>https://munew.io</code></span>',
  'app.containers.Agents.invalidURL':
    'The url you enter is invalid, please enter valid url. For example: https://munew.io',
  'app.containers.Agents.invalidInteger': 'Please enter valid integer',
  'app.containers.Agents.advanced': 'Advanced',
  'app.containers.Agents.advancedDescription':
    'Most of time you can use default setting, only change it when you know',
  'app.containers.Agents.pollingInterval': 'Polling Interval',
  'app.containers.Agents.pollingIntervalPlaceholder':
    'Please enter polling interval value, like 30',
  'app.containers.Agents.pollingIntervalExample': '30',
  'app.containers.Agents.pollingIntervalDescription':
    'How frequently to check whether need to collect new intelligences',
  'app.containers.Agents.maxWaitingTime': 'Max Waiting Time',
  'app.containers.Agents.maxWaitingTimePlaceholder': 'Please enter waiting time, like 5',
  'app.containers.Agents.maxWaitingTimeExample': '5',
  'app.containers.Agents.maxWaitingTimeDescription':
    'Max waiting time between two collecting jobs. Value Range: <span class="ant-typography"><code>[(Max\n      Waiting Time/2), Max Waiting Time]</code></span>',
  'app.containers.Agents.maxCollectTime': 'Max Collect Time',
  'app.containers.Agents.maxCollectTimePlaceholder': 'Please enter max collect time, like 50',
  'app.containers.Agents.maxCollectTimeExample': '50',
  'app.containers.Agents.maxCollectTimeDescription':
    'Browser has memory leak issue if continue to open urls. To avoid this, need to close window when reach max collect times. Collect Time equal to how many request send to DIA to get intelligence.',
  'app.containers.Agents.agentIdleTime': 'Agent Idle Time',
  'app.containers.Agents.agentIdleTimePlaceholder': 'Please enter agent idel time value, like 50',
  'app.containers.Agents.agentIdleTimeExample': '50',
  'app.containers.Agents.agentIdleTimeDescription':
    'How long time browser need to wait to restart collect intelligences after close browser window. This time is used for browser to release memory.',
  'app.containers.Agents.concurrentCollectIntelligences': 'Concurrent Collect Intelligences',
  'app.containers.Agents.concurrentCollectIntelligencesPlaceholder':
    'Please enter concurrent collect intelligences, like 1',
  'app.containers.Agents.concurrentCollectIntelligencesExample': '1',
  'app.containers.Agents.concurrentCollectIntelligencesDescription':
    'How many intelligences need to be concurrent collected',
  'app.containers.Agents.requestTimeout': 'Request Timeout',
  'app.containers.Agents.requestTimeoutPlaceholder': 'Please enter request timeout value, like 90',
  'app.containers.Agents.requestTimeoutExample': '90',
  'app.containers.Agents.requestTimeoutDescription':
    'If the request takes longer than <span class="ant-typography"><code>timeout</code></span>, the request will be aborted',
  'app.containers.Agents.maxRetryTime': 'Max Retry Time',
  'app.containers.Agents.maxRetryTimePlaceholder': 'Please enter max retry time value, like 3',
  'app.containers.Agents.maxRetryTimeExample': '3',
  'app.containers.Agents.maxRetryTimeDescription':
    'Max retry time if send collected intelligences fail, if retried max time, then it will send back to DIA and mark those intelligences fail',
  'app.containers.Agents.httpMethod': 'HTTP Method',
  'app.containers.Agents.httpMethodPlaceHolder': 'Please select your HTTP method',
  'app.containers.Agents.httpMethodDescription':
    'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>',
  'app.containers.Agents.urlPath': 'URL Path',
  'app.containers.Agents.urlPathPlaceHolder': 'Please enter your URL path',
  'app.containers.Agents.urlPathDescription':
    'URL path of your RESTFul API. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>',
  'app.containers.Agents.healthTitle': 'Health Check',
  'app.containers.Agents.getIntelligences': 'Get Intelligences',
  'app.containers.Agents.getIntelligencesDescription':
    "Configure RESTFul API to get intelligences from DIA. Normally you don't need to change this value, only change this when you re-implement DIA. ",
  'app.containers.Agents.unregisterAgent': 'Unregister Agent',
  'app.containers.Agents.unregisterAgentDescription':
    "You need to register this agent before you can use it.  <a href='https://docs.munew.io/how-tos/how-to-register-an-agent' target='_blank'>How to register an Agent</a>",
  'app.containers.Agents.checkingDIAHealth': 'Checking DIA health... [ {method} ] {url}',
  'app.containers.Agents.activateDescription':
    'Activate this agent, after activate then this agent will start collect intelligences',
  'app.containers.Agents.deactivateDescription':
    'Deactivate this agent, after deactivate then this agent will stop collect intelligences',
  'app.containers.Agents.activateAgentSuccess': 'Successfully activate this agent',
  'app.containers.Agents.deactivateAgentSuccess': 'Successfully deactivate this agent',
};
