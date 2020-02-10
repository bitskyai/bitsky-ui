export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const AGENT_TYPES = {
  browserExtension: 'BROWSEREXTENSION',
  headlessBrowser: 'HEADLESSBROWSER',
  service: 'SERVICE',
};

// Default Agent Configuration
export const DEFAULT_AGENT_CONFIGURATION = {
  private: true,
  concurrent: 1,
  pollingInterval: 10, // (Unit: Second) How frequently to poll whether need to collect intelligences
  maxWaitingTime: 1, // (Unit: Second)
  maxCollect: 100000, // Max crawl times, when reach this time, close browser to release memory
  idelTime: 1, // (Unit: Second) After close browser, idle system for **IDLE_TIME**
  timeout: 30,
  maxRetry: 3,
};

export const AGENT_STATE = {
  draft: 'DRAFT',
  configured: 'CONFIGURED',
  active: 'ACTIVE',
  deleted: 'DELETED',
};
