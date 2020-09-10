/*
 * Producers Messages
 *
 * This contains all the text for the Producers container.
 */

// import { defineMessages } from 'react-intl';

// export default defineMessages({
export default {
  'app.containers.Producers.second': 'second',
  'app.containers.Producers.header': 'Producers',
  'app.containers.Producers.emptyProducers':
    'You don\'t have any <a href="https://docs.bitsky.ai/overview#producer" target="_blank">Producers</a>. <a href="https://docs.bitsky.ai/overview#producer" target="_blank">How to register a Producer Configuration</a> will show you step by step to regiter a Producer',
  'app.containers.Producers.registerNow': 'Register',
  'app.containers.Producers.drawerTitleCreate': 'Register a Producer',
  'app.containers.Producers.drawerTitleUpdate': 'Modify this Producer',
  'app.containers.Producers.activeProducerTip':
    'This producer is in Active status, you need to Deactivate it before you can modify',
  'app.containers.Producers.registerProducerDescription':
    'Producer is the client that collect the tasks your Retailer Services created. It has several types: <a href="#" target="_blank">Headless</a>, <a href="#" target="_blank">Service</a>, you also can develop a producer by yourself',
  'app.containers.Producers.deleteProducerDescription': 'Are you sure delete this Producer?',
  'app.containers.Producers.deleteProducerSuccessful': 'Delete Producer Successful',
  'app.containers.Producers.producerName': 'Name',
  'app.containers.Producers.producerNamePlaceholder': "Please enter your Producer's name",
  'app.containers.Producers.producerNameInvalid':
    'Producer Name is invalid, please enter 1 to 100 characters',
  'app.containers.Producers.producerNameExample': 'Hello World',
  'app.containers.Producers.producerNameDescription':
    'Give a meaningful name to your Producer, between 1 to 100 characters',
  'app.containers.Producers.producerDescription': 'Description',
  'app.containers.Producers.producerDescriptionPlaceholder': 'Type some words to describe your producer',
  'app.containers.Producers.producerDescriptionInvalid':
    'Producer description is too long, please enter 1 to 200 characters',
  'app.containers.Producers.producerDescriptionExample': 'My First Producer',
  'app.containers.Producers.producerDescriptionDescription':
    'Give a meaningful description to your Producer, between 1 to 200 characters',
  'app.containers.Producers.baseURL': 'Base URL',
  'app.containers.Producers.baseURLEmptyError': 'Please enter a valid base URL',
  'app.containers.Producers.baseURLExample': 'http://localhost:3000',
  'app.containers.Producers.baseURLDescription':
    'Base url of your service producer, make sure DIA Producer can access your service producer',
  'app.containers.Producers.registerProducerSuccessful': 'Register Retailer Service Successful',
  'app.containers.Producers.healthDescription':
    'Health check API endpoint for your Retailer Service(e.g. HTTP <span class="ant-typography"><code>/health</code></span>) that returns the health of your Retailer Service. HTTP status is <span class="ant-typography"><code>2xx</code></span> means health, otherwise means unhealth. <a href="https://microservices.io/patterns/observability/health-check-api.html" target="_blank">Learn More.</a>',
  'app.containers.Producers.producerType': 'Producer Type',
  'app.containers.Producers.producerTypePlaceHolder': 'Please select your Producer Type',
  'app.containers.Producers.producerTypeDescription':
    'Please select your Producer Type. <a href="https://docs.bitsky.ai/overview#producer" target="_blank">Learn More.</a>',
  'app.containers.Producers.browserExtensionProducer': 'Browser Extension Producer',
  'app.containers.Producers.headlessProducer': 'Headless Producer',
  'app.containers.Producers.serviceProducer': 'Serivce Producer',
  'app.containers.Producers.producerConfiguration': 'Configuration',
  'app.containers.Producers.producerConfigurationDescription':
    'Configure your producer based on your need, otherwise you can keep it as default.',
  'app.containers.Producers.activeProducer': 'Active',
  'app.containers.Producers.watchingNewJobDescription':
    'After you configure correctly, then you can active this producer, it will check whether has new tasks need to collect every {pollingInterval} second. You can change this value in <a href="#pollingInterval">Polling Interval</a>',
  'app.containers.Producers.privateMode': 'Private Mode',
  'app.containers.Producers.privateModeDescription':
    'Private mode means your producer will only collect tasks that created by yourself',
  'app.containers.Producers.switchOn': 'ON',
  'app.containers.Producers.switchOff': 'OFF',
  'app.containers.Producers.diaBaseURL': 'DIA Base URL',
  'app.containers.Producers.diaBaseURLPlaceholder': 'Please enter a valid URL',
  'app.containers.Producers.diaBaseURLExample': 'https://bitsky.ai',
  'app.containers.Producers.diaBaseURLDescription':
    'Base url of your DIA. For example: <span class="ant-typography"><code>https://bitsky.ai</code></span>',
  'app.containers.Producers.invalidURL':
    'The url you enter is invalid, please enter valid url. For example: https://bitsky.ai',
  'app.containers.Producers.invalidInteger': 'Please enter valid integer',
  'app.containers.Producers.advanced': 'Advanced',
  'app.containers.Producers.advancedDescription':
    'Most of time you can use default setting, only change it when you know',
  'app.containers.Producers.pollingInterval': 'Polling Interval',
  'app.containers.Producers.pollingIntervalPlaceholder':
    'Please enter polling interval value, like 30',
  'app.containers.Producers.pollingIntervalExample': '30',
  'app.containers.Producers.pollingIntervalDescription':
    'How frequently to check whether need to collect new tasks',
  'app.containers.Producers.maxWaitingTime': 'Max Waiting Time',
  'app.containers.Producers.maxWaitingTimePlaceholder': 'Please enter waiting time, like 5',
  'app.containers.Producers.maxWaitingTimeExample': '5',
  'app.containers.Producers.maxWaitingTimeDescription':
    'Max waiting time between two collecting jobs. Value Range: <span class="ant-typography"><code>[(Max\n      Waiting Time/2), Max Waiting Time]</code></span>',
  'app.containers.Producers.maxCollectTime': 'Max Collect Time',
  'app.containers.Producers.maxCollectTimePlaceholder': 'Please enter max collect time, like 10000',
  'app.containers.Producers.maxCollectTimeExample': '10000',
  'app.containers.Producers.maxCollectTimeDescription':
    'Browser has memory leak issue if continue to open urls. To avoid this, need to close window when reach max collect times. Collect Time equal to how many request send to DIA to get intelligence.',
  'app.containers.Producers.producerIdleTime': 'Producer Idle Time',
  'app.containers.Producers.producerIdleTimePlaceholder':
    'Please enter producer idel time value, like 50',
  'app.containers.Producers.producerIdleTimeExample': '50',
  'app.containers.Producers.producerIdleTimeDescription':
    'How long time browser need to wait to restart collect tasks after close browser window. This time is used for browser to release memory.',
  'app.containers.Producers.concurrentCollectIntelligences': 'Concurrent Collect Tasks',
  'app.containers.Producers.concurrentCollectIntelligencesPlaceholder':
    'Please enter concurrent collect tasks, like 1',
  'app.containers.Producers.concurrentCollectIntelligencesExample': '1',
  'app.containers.Producers.concurrentCollectIntelligencesDescription':
    'How many tasks need to be concurrent collected',
  'app.containers.Producers.requestTimeout': 'Request Timeout',
  'app.containers.Producers.requestTimeoutPlaceholder': 'Please enter request timeout value, like 90',
  'app.containers.Producers.requestTimeoutExample': '90',
  'app.containers.Producers.requestTimeoutDescription':
    'If the request takes longer than <span class="ant-typography"><code>timeout</code></span>, the request will be aborted',
  'app.containers.Producers.maxRetryTime': 'Max Retry Time',
  'app.containers.Producers.maxRetryTimePlaceholder': 'Please enter max retry time value, like 3',
  'app.containers.Producers.maxRetryTimeExample': '3',
  'app.containers.Producers.maxRetryTimeDescription':
    'Max retry time if send collected tasks fail, if retried max time, then it will send back to DIA and mark those tasks fail',
  'app.containers.Producers.httpMethod': 'HTTP Method',
  'app.containers.Producers.httpMethodPlaceHolder': 'Please select your HTTP method',
  'app.containers.Producers.httpMethodDescription':
    'Please select your HTTP method. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank">Learn More.</a>',
  'app.containers.Producers.urlPath': 'URL Path',
  'app.containers.Producers.urlPathPlaceHolder': 'Please enter your URL path',
  'app.containers.Producers.urlPathDescription':
    'URL path of your RESTFul API. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#Path" target="_blank">Learn More.</a>',
  'app.containers.Producers.healthTitle': 'Health Check',
  'app.containers.Producers.getIntelligences': 'Get Tasks',
  'app.containers.Producers.getIntelligencesDescription':
    "Configure RESTFul API to get tasks from DIA. Normally you don't need to change this value, only change this when you re-implement DIA. ",
  'app.containers.Producers.unregisterProducer': 'Unregister Producer',
  'app.containers.Producers.unregisterProducerDescription':
    "You need to register this producer before you can use it.  <a href='https://docs.bitsky.ai/how-tos/how-to-register-an-producer' target='_blank'>How to register a Producer</a>",
  'app.containers.Producers.checkingDIAHealth': 'Checking DIA health... [ {method} ] {url}',
  'app.containers.Producers.activateDescription':
    'Activate this producer, after activate then this producer will start collect tasks',
  'app.containers.Producers.deactivateDescription':
    'Deactivate this producer, after deactivate then this producer will stop collect tasks',
  'app.containers.Producers.disconnectDescription':
    'Disconnect all the producer currently connect to this producer, after disconnect successful will generate new globalId',
  'app.containers.Producers.activateProducerSuccess': 'Successfully activate this producer',
  'app.containers.Producers.deactivateProducerSuccess': 'Successfully deactivate this producer',
  'app.containers.Producers.disconnectProducerSuccess': 'Successfully disconnect this producer',
};
