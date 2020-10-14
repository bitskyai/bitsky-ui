import http from '../utils/http';
import { HTTP_HEADERS } from '../utils/constants';

export async function registerProducerAPI(producer) {
  try {
    const result = await http({
      url: '/apis/producers',
      method: 'POST',
      data: producer,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getProducersAPI() {
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

export async function getProducerAPI(baseURL, gid, serialId, type, skipErrorHandler) {
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

export async function updateProducerAPI(producer) {
  try {
    const result = await http({
      url: `/apis/producers/${producer.globalId}`,
      method: 'PUT',
      data: producer,
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteProducerAPI(globalId) {
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

export async function activateProducerAPI(globalId) {
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

export async function disconnectProducerAPI(globalId) {
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

export async function deactivateProducerAPI(globalId) {
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
