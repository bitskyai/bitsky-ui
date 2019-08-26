/*
 * Agents Messages
 *
 * This contains all the text for the Agents container.
 */

// import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Agents';

// export default defineMessages({
export default {
  second: {
    id: `${scope}.second`,
    defaultMessage: "second"
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Agents',
  },
  emptyAgents: {
    id: `${scope}.emptyAgents`,
    defaultMessage: `You don't have any <a href="https://docs.munew.io/guide/concepts/agent" target="_blank">Agents</a>`
  },
  registerNow: {
    id: `${scope}.registerNow`,
    defaultMessage: `Register`
  },
  drawerTitle: {
    id: `${scope}.drawerTitle`,
    defaultMessage: `Register an Agent`
  },
  registerAgentDescription: {
    id: `${scope}.registerAgentDescription`,
    defaultMessage: 'Agent is the client that collect the intelligences your SOIs created. It has several types: <a href="#" target="_blank">browser extension</a>, <a href="#" target="_blank">service</a>, you also can develop an agent by yourself'
  },
  deleteAgentDescription: {
    id: `${scope}.deleteAgentDescription`,
    defaultMessage: 'Are you sure delete this Agent?'
  },
  deleteAgentSuccessful: {
    id: `${scope}.deleteAgentSuccessful`,
    defaultMessage: 'Delete Agent Successful'
  },
  agentName: {
    id: `${scope}.agentName`,
    defaultMessage: `Name`
  },
  agentNamePlaceholder: {
    id: `${scope}.agentNamePlaceholder`,
    defaultMessage: `Please enter your Agent's name`
  },
  agentNameInvalid: {
    id: `${scope}.agentNameInvalid`,
    defaultMessage: `Agent Name is invalid, please enter 3 to 50 characters`
  },
  agentNameExample: {
    id: `${scope}.agentNameExample`,
    defaultMessage: 'Chrome Extension'
  },
  agentNameDescription: {
    id: `${scope}.agentNameDescription`,
    defaultMessage: 'Give a meaningful name to your Agent, between 1 to 100 characters'
  },
  agentDescription: {
    id: `${scope}.agentDescription`,
    defaultMessage: `Description`
  },
  agentDescriptionPlaceholder: {
    id: `${scope}.agentDescriptionPlaceholder`,
    defaultMessage: `Type some words to describe your agent`
  },
  agentDescriptionInvalid: {
    id: `${scope}.agentDescriptionInvalid`,
    defaultMessage: `Agent description is too long, please enter 1 to 200 characters`
  },
  agentDescriptionExample: {
    id: `${scope}.agentDescriptionExample`,
    defaultMessage: 'My First Chrome Extension Agent'
  },
  agentDescriptionDescription: {
    id: `${scope}.agentDescriptionDescription`,
    defaultMessage: 'Give a meaningful description to your Agent, between 1 to 200 characters'
  },
  baseURL: {
    id: `${scope}.baseURL`,
    defaultMessage: 'Base URL'
  },
  baseURLEmptyError: {
    id: `${scope}.baseURLEmptyError`,
    defaultMessage: 'Please enter a valid base URL'
  },
  baseURLExample: {
    id: `${scope}.baseURLExample`,
    defaultMessage: 'http://localhost:3000'
  },
  baseURLDescription: {
    id: `${scope}.baseURLDescription`,
    defaultMessage: 'Base url of your service agent, make sure DIA Agent can access your service agent'
  },
  registerAgentSuccessful: {
    id: `${scope}.registerAgentSuccessful`,
    defaultMessage: 'Register SOI Successful'
  },
  healthDescription: {
    id: `${scope}.healthDescription`,
    defaultMessage: 'Health check API endpoint for your Agent(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your Agent. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>'
  },
  agentType: {
    id: `${scope}.agentType`,
    defaultMessage: 'Agent Type'
  },
  agentTypePlaceHolder: {
    id: `${scope}.agentTypePlaceHolder`,
    defaultMessage: 'Please select your Agent Type'
  },
  agentTypeDescription: {
    id: `${scope}.agentTypeDescription`,
    defaultMessage: 'Please select your Agent Type. <a href="https://docs.munew.io/guide/concepts/agent" target="_blank">Learn More.</a>'
  },
  browserExtensionAgent: {
    id: `${scope}.browserExtensionAgent`,
    defaultMessage: 'Browser Extension'
  },
  serviceAgent: {
    id: `${scope}.serviceAgent`,
    defaultMessage: 'Serivce Agent'
  },
  agentConfiguration:{
    id: `${scope}.agentConfiguration`,
    defaultMessage: 'Agent Configuration'
  },
  agentConfigurationDescription:{
    id: `${scope}.agentConfigurationDescription`,
    defaultMessage: 'Configure your agent based on your need, otherwise you can keep it as default.'
  },
  activeAgent: {
    id: `${scope}.activeAgent`,
    defaultMessage: `Active`
  },
  activeAgentDescription: {
    id: `${scope}.watchingNewJobDescription`,
    defaultMessage: `After you configure correctly, then you can active this agent, it will check whether has new intelligences need to collect every {pollingInterval} second. You can change this value in <a href="#pollingInterval">Polling Interval</a>`
  },
  privateMode: {
    id: `${scope}.privateMode`,
    defaultMessage: `Private Mode`
  },
  privateModeDescription: {
    id: `${scope}.privateModeDescription`,
    defaultMessage: `Private mode means your agent will only collect intelligences that created by yourself`
  },
  switchOn: {
    id: `${scope}.switchOn`,
    defaultMessage: `ON`
  },
  switchOff: {
    id: `${scope}.switchOff`,
    defaultMessage: `OFF`
  },
  diaBaseURL: {
    id: `${scope}.diaBaseURL`,
    defaultMessage: `DIA Base URL`
  },
  diaBaseURLPlaceholder: {
    id: `${scope}.diaBaseURLPlaceholder`,
    defaultMessage: `Please enter a valid URL`
  },
  diaBaseURLExample: {
    id: `${scope}.diaBaseURLExample`,
    defaultMessage: `https://munew.io`
  },
  diaBaseURLDescription: {
    id: `${scope}.diaBaseURLDescription`,
    defaultMessage: `Base url of your DIA. For example: <span class="ant-typography"><code>https://munew.io</code></span>`
  },
  invalidURL: {
    id: `${scope}.invalidURL`,
    defaultMessage: `The url you enter is invalid, please enter valid url. For example: https://munew.io`
  },
  invalidInteger: {
    id: `${scope}.invalidInteger`,
    defaultMessage: `Please enter valid integer`
  },
  advanced: {
    id: `${scope}.advanced`,
    defaultMessage: `Advanced`
  },
  advancedDescription: {
    id: `${scope}.advancedDescription`,
    defaultMessage: `Most of time you can use default setting, only change it when you know`
  },
  pollingInterval: {
    id: `${scope}.pollingInterval`,
    defaultMessage: `Polling Interval`
  },
  pollingIntervalPlaceholder: {
    id: `${scope}.pollingIntervalPlaceholder`,
    defaultMessage: `Please enter polling interval value, like 30`
  },
  pollingIntervalExample: {
    id: `${scope}.pollingIntervalExample`,
    defaultMessage: `30`
  },
  pollingIntervalDescription: {
    id: `${scope}.pollingIntervalDescription`,
    defaultMessage: `How frequently to check whether need to collect new intelligences`
  },
  maxWaitingTime: {
    id: `${scope}.maxWaitingTime`,
    defaultMessage: `Max Waiting Time`
  },
  maxWaitingTimePlaceholder: {
    id: `${scope}.maxWaitingTimePlaceholder`,
    defaultMessage: `Please enter waiting time, like 5`
  },
  maxWaitingTimeExample: {
    id: `${scope}.maxWaitingTimeExample`,
    defaultMessage: `5`
  },
  maxWaitingTimeDescription: {
    id: `${scope}.maxWaitingTimeDescription`,
    defaultMessage: `Max waiting time between two collecting jobs. Value Range: <span class="ant-typography"><code>[(Max
      Waiting Time/2), Max Waiting Time]</code></span>`
  },
  maxCollectTime: {
    id: `${scope}.maxCollectTime`,
    defaultMessage: `Max Collect Time`
  },
  maxCollectTimePlaceholder: {
    id: `${scope}.maxCollectTimePlaceholder`,
    defaultMessage: `Please enter max collect time, like 50`
  },
  maxCollectTimeExample: {
    id: `${scope}.maxCollectTimeExample`,
    defaultMessage: `50`
  },
  maxCollectTimeDescription: {
    id: `${scope}.maxCollectTimeDescription`,
    defaultMessage: `Browser has memory leak issue if continue to open urls. To avoid this, need to close window when reach max collect times. Collect Time equal to how many request send to DIA to get intelligence.`
  },
  agentIdleTime: {
    id: `${scope}.agentIdleTime`,
    defaultMessage: `Agent Idle Time`
  },
  agentIdleTimePlaceholder: {
    id: `${scope}.agentIdleTimePlaceholder`,
    defaultMessage: `Please enter agent idel time value, like 50`
  },
  agentIdleTimeExample: {
    id: `${scope}.agentIdleTimeExample`,
    defaultMessage: `50`
  },
  agentIdleTimeDescription: {
    id: `${scope}.agentIdleTimeDescription`,
    defaultMessage: `How long time browser need to wait to restart collect intelligences after close browser window. This time is used for browser to release memory.`
  },
  concurrentCollectIntelligences: {
    id: `${scope}.concurrentCollectIntelligences`,
    defaultMessage: `Concurrent Collect Intelligences`
  },
  concurrentCollectIntelligencesPlaceholder: {
    id: `${scope}.concurrentCollectIntelligencesPlaceholder`,
    defaultMessage: `Please enter concurrent collect intelligences, like 1`
  },
  concurrentCollectIntelligencesExample: {
    id: `${scope}.concurrentCollectIntelligencesExample`,
    defaultMessage: `1`
  },
  concurrentCollectIntelligencesDescription: {
    id: `${scope}.concurrentCollectIntelligencesDescription`,
    defaultMessage: `How many intelligences need to be concurrent collected`
  },
  requestTimeout: {
    id: `${scope}.requestTimeout`,
    defaultMessage: `Request Timeout`
  },
  requestTimeoutPlaceholder: {
    id: `${scope}.requestTimeoutPlaceholder`,
    defaultMessage: `Please enter request timeout value, like 90`
  },
  requestTimeoutExample: {
    id: `${scope}.requestTimeoutExample`,
    defaultMessage: `90`
  },
  requestTimeoutDescription: {
    id: `${scope}.requestTimeoutDescription`,
    defaultMessage: `If the request takes longer than <span class="ant-typography"><code>timeout</code></span>, the request will be aborted`
  },
  maxRetryTime: {
    id: `${scope}.maxRetryTime`,
    defaultMessage: `Max Retry Time`
  },
  maxRetryTimePlaceholder: {
    id: `${scope}.maxRetryTimePlaceholder`,
    defaultMessage: `Please enter max retry time value, like 3`
  },
  maxRetryTimeExample: {
    id: `${scope}.maxRetryTimeExample`,
    defaultMessage: `3`
  },
  maxRetryTimeDescription: {
    id: `${scope}.maxRetryTimeDescription`,
    defaultMessage: `Max retry time if send collected intelligences fail, if retried max time, then it will send back to DIA and mark those intelligences fail`
  },
  httpMethod: {
    id: `${scope}.httpMethod`,
    defaultMessage: 'HTTP Method'
  },
  httpMethodPlaceHolder: {
    id: `${scope}.httpMethodPlaceHolder`,
    defaultMessage: 'Please select your HTTP method'
  },
  httpMethodDescription: {
    id: `${scope}.httpMethodDescription`,
    defaultMessage: 'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>'
  },
  urlPath: {
    id: `${scope}.urlPath`,
    defaultMessage: 'URL Path'
  },
  urlPathPlaceHolder: {
    id: `${scope}.urlPathPlaceHolder`,
    defaultMessage: 'Please enter your URL path'
  },
  urlPathDescription: {
    id: `${scope}.urlPathDescription`,
    defaultMessage: 'URL path of your RESTFul API. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>'
  },
  healthTitle: {
    id: `${scope}.healthTitle`,
    defaultMessage: 'Health Check'
  },
  healthDescription: {
    id: `${scope}.healthDescription`,
    defaultMessage: 'Health check API endpoint for your SOI(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your SOI. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>'
  },
  getIntelligences: {
    id: `${scope}.getIntelligences`,
    defaultMessage: 'Get Intelligences'
  },
  getIntelligencesDescription: {
    id: `${scope}.getIntelligencesDescription`,
    defaultMessage: `Configure RESTFul API to get intelligences from DIA. Normally you don't need to change this value, only change this when you re-implement DIA. `
  },
  unregisterAgent: {
    id: `${scope}.unregisterAgent`,
    defaultMessage: 'Unregister Agent'
  },
  unregisterAgentDescription: {
    id: `${scope}.unregisterAgentDescription`,
    defaultMessage: `You need to register this agent before you can use it.  <a href='https://docs.munew.io/how-tos/how-to-register-an-agent' target='_blank'>How to register an Agent</a>`
  },
  checkingDIAHealth: {
    id: `${scope}.checkingDIAHealth`,
    defaultMessage: `Checking DIA health... [ {method} ] {url}`
  },
  activateDescription: {
    id: `${scope}.activateDescription`,
    defaultMessage: "Activate this agent, after activate then this agent will start collect intelligences"
  },
  deactivateDescription: {
    id: `${scope}.deactivateDescription`,
    defaultMessage: "Deactivate this agent, after deactivate then this agent will stop collect intelligences"
  },
  activateAgentSuccess: {
    id: `${scope}.activateAgentSuccess`,
    defaultMessage: "Successfully activate this agent"
  },
  deactivateAgentSuccess: {
    id: `${scope}.deactivateAgentSuccess`,
    defaultMessage: "Successfully deactivate this agent"
  }
// });
};
