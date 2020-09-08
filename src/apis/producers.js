import http from '../utils/http';
import { HTTP_HEADERS } from '../utils/constants';

export async function registerAgentAPI(agent) {
  try {
    const result = await http({
      url: '/apis/producers',
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
    const result = await http({
      url: '/apis/producers',
      method: 'GET',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function getAgentAPI(baseURL, gid, serialId, type, skipErrorHandler) {
  try {
    const url = new URL(`/apis/producers/${gid}`, baseURL).toString();
    const headers = {};
    headers[HTTP_HEADERS.X_SERIAL_ID] = serialId;
    const response = await http({
      headers,
      url,
      params: {
        type,
      },
      method: 'GET',
      skipErrorHandler,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function updateAgentAPI(agent) {
  try {
    const result = await http({
      url: `/apis/producers/${agent.globalId}`,
      method: 'PUT',
      data: agent,
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteAgentAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/producers/${globalId}`,
      method: 'DELETE',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function activateAgentAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/producers/${globalId}/activate`,
      method: 'POST',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function disconnectAgentAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/manangement/producers/${globalId}/disconnect`,
      method: 'POST',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deactivateAgentAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/producers/${globalId}/deactivate`,
      method: 'POST',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}
