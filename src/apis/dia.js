import http from '../utils/http';

export async function registerAgentAPI(agent) {
  try {
    const result = await http({
      url: '/apis/agents',
      method: 'POST',
      data: agent,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * check DIA health status
 * @param {string} method - HTTP request method
 * @param {string} url - HTTP request url
 * @return {boolean} - true: active, false: inactive
 */
export async function checkEngineHealthAPI(method, url) {
  try {
    const result = await http({
      url,
      method,
    });
    console.log('checkEngineHealthAPI->result: ', result);
    if (result.status >= 200 && result.status < 300) {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}
