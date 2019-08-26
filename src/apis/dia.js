import http from '../utils/http';

export async function registerAgentAPI(agent) {
  try {
    let result = await http({
      url: '/apis/agents',
      method: 'POST',
      data: agent,
    });
    return result;
  } catch (err) {
    throw err;
  }
}
