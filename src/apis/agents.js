import http, { getRedirectURL } from '../utils/http';

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

export async function getAgentsAPI() {
  try {
    let result = await http({
      url: '/apis/agents',
      method: 'GET'
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function updateAgentAPI(agent) {
  try {
    let result = await http({
      url: `/apis/agents/${agent.globalId}`,
      method: 'PUT',
      data: agent
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteAgentAPI(globalId) {
  try {
    let result = await http({
      url: `/apis/agents/${globalId}`,
      method: 'DELETE',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function activateAgentAPI(globalId) {
  try {
    let result = await http({
      url: `/apis/agents/${globalId}/activate`,
      method: 'POST',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deactivateAgentAPI(globalId) {
  try {
    let result = await http({
      url: `/apis/agents/${globalId}/deactivate`,
      method: 'POST',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}