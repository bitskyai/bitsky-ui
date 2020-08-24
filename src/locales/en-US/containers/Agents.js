/*
 * Agents Messages
 *
 * This contains all the text for the Agents container.
 */

// import { defineMessages } from 'react-intl';

// export default defineMessages({
export default {
  'app.containers.Agents.second': 'second',
  'app.containers.Agents.header': 'Producers',
  'app.containers.Agents.emptyAgents':
    'You don\'t have any <a href="https://docs.bitsky.ai/overview#producer" target="_blank">Producers</a>. <a href="https://docs.bitsky.ai/overview#producer" target="_blank">How to register a Producer Configuration</a> will show you step by step to regiter a Producer',
  'app.containers.Agents.registerNow': 'Register',
  'app.containers.Agents.drawerTitleCreate': 'Register a Producer',
  'app.containers.Agents.drawerTitleUpdate': 'Modify this Producer',
  'app.containers.Agents.activeAgentTip':
    'This producer is in Active status, you need to Deactivate it before you can modify',
  'app.containers.Agents.registerAgentDescription':
    'Producer is the client that collect the tasks your Retailer Services created. It has several types: <a href="#" target="_blank">Headless</a>, <a href="#" target="_blank">Service</a>, you also can develop a producer by yourself',
  'app.containers.Agents.deleteAgentDescription': 'Are you sure delete this Producer?',
  'app.containers.Agents.deleteAgentSuccessful': 'Delete Producer Successful',
  'app.containers.Agents.agentName': 'Name',
  'app.containers.Agents.agentNamePlaceholder': "Please enter your Producer's name",
  'app.containers.Agents.agentNameInvalid':
    'Producer Name is invalid, please enter 1 to 100 characters',
  'app.containers.Agents.agentNameExample': 'Hello World',
  'app.containers.Agents.agentNameDescription':
    'Give a meaningful name to your Producer, between 1 to 100 characters',
  'app.containers.Agents.agentDescription': 'Description',
  'app.containers.Agents.agentDescriptionPlaceholder': 'Type some words to describe your producer',
  'app.containers.Agents.agentDescriptionInvalid':
    'Producer description is too long, please enter 1 to 200 characters',
  'app.containers.Agents.agentDescriptionExample': 'My First Producer',
  'app.containers.Agents.agentDescriptionDescription':
    'Give a meaningful description to your Producer, between 1 to 200 characters',
  'app.containers.Agents.baseURL': 'Base URL',
  'app.containers.Agents.baseURLEmptyError': 'Please enter a valid base URL',
  'app.containers.Agents.baseURLExample': 'http://localhost:3000',
  'app.containers.Agents.baseURLDescription':
    'Base url of your service producer, make sure DIA Producer can access your service producer',
  'app.containers.Agents.registerAgentSuccessful': 'Register Retailer Service Successful',
  'app.containers.Agents.healthDescription':
    'Health check API endpoint for your Retailer Service(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your Retailer Service. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>',
  'app.containers.Agents.agentType': 'Producer Type',
  'app.containers.Agents.agentTypePlaceHolder': 'Please select your Producer Type',
  'app.containers.Agents.agentTypeDescription':
    'Please select your Producer Type. <a href="https://docs.bitsky.ai/overview#producer" target="_blank">Learn More.</a>',
  'app.containers.Agents.browserExtensionAgent': 'Browser Extension Producer',
  'app.containers.Agents.headlessAgent': 'Headless Producer',
  'app.containers.Agents.serviceAgent': 'Serivce Producer',
  'app.containers.Agents.agentConfiguration': 'Configuration',
  'app.containers.Agents.agentConfigurationDescription':
    'Configure your producer based on your need, otherwise you can keep it as default.',
  'app.containers.Agents.activeAgent': 'Active',
  'app.containers.Agents.watchingNewJobDescription':
    'After you configure correctly, then you can active this producer, it will check whether has new tasks need to collect every {pollingInterval} second. You can change this value in <a href="#pollingInterval">Polling Interval</a>',
  'app.containers.Agents.privateMode': 'Private Mode',
  'app.containers.Agents.privateModeDescription':
    'Private mode means your producer will only collect tasks that created by yourself',
  'app.containers.Agents.switchOn': 'ON',
  'app.containers.Agents.switchOff': 'OFF',
  'app.containers.Agents.diaBaseURL': 'DIA Base URL',
  'app.containers.Agents.diaBaseURLPlaceholder': 'Please enter a valid URL',
  'app.containers.Agents.diaBaseURLExample': 'https://bitsky.ai',
  'app.containers.Agents.diaBaseURLDescription':
    'Base url of your DIA. For example: <span class="ant-typography"><code>https://bitsky.ai</code></span>',
  'app.containers.Agents.invalidURL':
    'The url you enter is invalid, please enter valid url. For example: https://bitsky.ai',
  'app.containers.Agents.invalidInteger': 'Please enter valid integer',
  'app.containers.Agents.advanced': 'Advanced',
  'app.containers.Agents.advancedDescription':
    'Most of time you can use default setting, only change it when you know',
  'app.containers.Agents.pollingInterval': 'Polling Interval',
  'app.containers.Agents.pollingIntervalPlaceholder':
    'Please enter polling interval value, like 30',
  'app.containers.Agents.pollingIntervalExample': '30',
  'app.containers.Agents.pollingIntervalDescription':
    'How frequently to check whether need to collect new tasks',
  'app.containers.Agents.maxWaitingTime': 'Max Waiting Time',
  'app.containers.Agents.maxWaitingTimePlaceholder': 'Please enter waiting time, like 5',
  'app.containers.Agents.maxWaitingTimeExample': '5',
  'app.containers.Agents.maxWaitingTimeDescription':
    'Max waiting time between two collecting jobs. Value Range: <span class="ant-typography"><code>[(Max\n      Waiting Time/2), Max Waiting Time]</code></span>',
  'app.containers.Agents.maxCollectTime': 'Max Collect Time',
  'app.containers.Agents.maxCollectTimePlaceholder': 'Please enter max collect time, like 10000',
  'app.containers.Agents.maxCollectTimeExample': '10000',
  'app.containers.Agents.maxCollectTimeDescription':
    'Browser has memory leak issue if continue to open urls. To avoid this, need to close window when reach max collect times. Collect Time equal to how many request send to DIA to get intelligence.',
  'app.containers.Agents.agentIdleTime': 'Producer Idle Time',
  'app.containers.Agents.agentIdleTimePlaceholder':
    'Please enter producer idel time value, like 50',
  'app.containers.Agents.agentIdleTimeExample': '50',
  'app.containers.Agents.agentIdleTimeDescription':
    'How long time browser need to wait to restart collect tasks after close browser window. This time is used for browser to release memory.',
  'app.containers.Agents.concurrentCollectIntelligences': 'Concurrent Collect Tasks',
  'app.containers.Agents.concurrentCollectIntelligencesPlaceholder':
    'Please enter concurrent collect tasks, like 1',
  'app.containers.Agents.concurrentCollectIntelligencesExample': '1',
  'app.containers.Agents.concurrentCollectIntelligencesDescription':
    'How many tasks need to be concurrent collected',
  'app.containers.Agents.requestTimeout': 'Request Timeout',
  'app.containers.Agents.requestTimeoutPlaceholder': 'Please enter request timeout value, like 90',
  'app.containers.Agents.requestTimeoutExample': '90',
  'app.containers.Agents.requestTimeoutDescription':
    'If the request takes longer than <span class="ant-typography"><code>timeout</code></span>, the request will be aborted',
  'app.containers.Agents.maxRetryTime': 'Max Retry Time',
  'app.containers.Agents.maxRetryTimePlaceholder': 'Please enter max retry time value, like 3',
  'app.containers.Agents.maxRetryTimeExample': '3',
  'app.containers.Agents.maxRetryTimeDescription':
    'Max retry time if send collected tasks fail, if retried max time, then it will send back to DIA and mark those tasks fail',
  'app.containers.Agents.httpMethod': 'HTTP Method',
  'app.containers.Agents.httpMethodPlaceHolder': 'Please select your HTTP method',
  'app.containers.Agents.httpMethodDescription':
    'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>',
  'app.containers.Agents.urlPath': 'URL Path',
  'app.containers.Agents.urlPathPlaceHolder': 'Please enter your URL path',
  'app.containers.Agents.urlPathDescription':
    'URL path of your RESTFul API. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>',
  'app.containers.Agents.healthTitle': 'Health Check',
  'app.containers.Agents.getIntelligences': 'Get Tasks',
  'app.containers.Agents.getIntelligencesDescription':
    "Configure RESTFul API to get tasks from DIA. Normally you don't need to change this value, only change this when you re-implement DIA. ",
  'app.containers.Agents.unregisterAgent': 'Unregister Producer',
  'app.containers.Agents.unregisterAgentDescription':
    "You need to register this producer before you can use it.  <a href='https://docs.bitsky.ai/how-tos/how-to-register-an-agent' target='_blank'>How to register a Producer</a>",
  'app.containers.Agents.checkingDIAHealth': 'Checking DIA health... [ {method} ] {url}',
  'app.containers.Agents.activateDescription':
    'Activate this producer, after activate then this producer will start collect tasks',
  'app.containers.Agents.deactivateDescription':
    'Deactivate this producer, after deactivate then this producer will stop collect tasks',
  'app.containers.Agents.disconnectDescription':
    'Disconnect all the producer currently connect to this producer, after disconnect successful will generate new globalId',
  'app.containers.Agents.activateAgentSuccess': 'Successfully activate this producer',
  'app.containers.Agents.deactivateAgentSuccess': 'Successfully deactivate this producer',
  'app.containers.Agents.disconnectAgentSuccess': 'Successfully disconnect this producer',
};
