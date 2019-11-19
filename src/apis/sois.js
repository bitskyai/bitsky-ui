import http, { getRedirectURL } from '../utils/http';

export async function registerASOI(soi) {
  try {
    const result = await http({
      url: '/apis/sois',
      method: 'POST',
      data: soi,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getSOIs() {
  try {
    const result = await http({
      url: '/apis/sois',
      method: 'GET',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function updateSOI(soi) {
  try {
    const result = await http({
      url: `/apis/sois/${soi.globalId}`,
      method: 'PUT',
      data: soi,
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteASOIAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/sois/${globalId}`,
      method: 'DELETE',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function pingSOIAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/sois/${globalId}/status`,
      method: 'PUT',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}
