export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const BITSKY_SUPPLIER = '@bitskyai/supplier';

export const PRODUCER_TYPES = {
  browserExtension: 'BROWSEREXTENSION',
  headlessBrowser: 'HEADLESSBROWSER',
  service: 'HTTP',
};

export const HTTP_HEADERS = {
  X_RESPONSED_WITH: 'x-bitsky-responsed-with',
  X_SECURITY_KEY_HEADER: 'x-bitsky-security-key',
  X_REQUESTED_WITH: 'x-bitsky-requested-with', // who send this request
  X_SERIAL_ID: 'x-bitsky-serial-id', // request serial id
  X_JOB_ID: 'x-bitsky-job-id', // each request is a job
};

// Default Producer Configuration
export const DEFAULT_PRODUCER_CONFIGURATION = {
  private: true,
  concurrent: 1,
  // (Unit: Second) How frequently to poll whether need to collect tasks
  pollingInterval: 10,
  maxWaitingTime: 1, // (Unit: Second)
  maxCollect: 100000, // Max crawl times, when reach this time, close browser to release memory
  idelTime: 1, // (Unit: Second) After close browser, idle system for **IDLE_TIME**
  timeout: 30,
  maxRetry: 3,
};

export const STATES = {
  draft: 'DRAFT',
  configured: 'CONFIGURED',
  active: 'ACTIVE',
  running: 'RUNNING',
  finished: 'FINISHED',
  failed: 'FAILED',
  timeout: 'TIMEOUT',
  paused: 'PAUSED',
  deleted: 'DELETED',
  connected: 'CONNECTED',
  connecting: 'CONNECTING',
  noConnection: 'NOCONNECTION',
  lostConnection: 'LOSTCONNECTION',
};

export const STATES_COLOR_MAP = {
  draft: '#fafafa',
  configured: 'blue',
  active: 'green',
  running: 'green',
  finished: 'green',
  failed: 'red',
  timeout: 'orange',
  paused: 'orange',
  deleted: 'red',
  connected: '#87d068',
  connecting: '#2db7f5',
  noConnection: '#91d5ff',
  lostConnection: '#f50',
};

export const LOG_LEVEL = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  debug: 'debug',
};

// health check for Supplier
export const SUPPLIER_HEALTH_PATH = '/health';
export const SUPPLIER_HEALTH_METHOD = 'GET';
