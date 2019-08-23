export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const AGENT_TYPES = {
  browserExtension: 'browserExtension',
  headlessBrowser: 'headlessBrowser',
  service: 'service',
};

// Default Agent Configuration
export const DEFAULT_AGENT_CONFIGURATION = {
  private: true,
  concurrent: 1,
  pollingInterval: 30, // (Unit: Second) How frequently to poll whether need to collect intelligences
  maxWaitingTime: 5, // (Unit: Second)
  maxCollect: 50, // (Unit: Second) Max crawl times, when reach this time, close browser to release memory
  idelTime: 10, // (Unit: Second) After close browser, idle system for **IDLE_TIME**
  timeout: 90,
  maxRetry: 3,
};

export const AGENT_STATE = {
  draft: 'DRAFT',
  configured: 'CONFIGURED',
  active: 'ACTIVE',
  deleted: 'DELETED'
};