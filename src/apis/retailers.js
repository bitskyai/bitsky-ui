import http from '../utils/http';

export async function registerARetailer(retailer) {
  try {
    const result = await http({
      url: '/apis/retailers',
      method: 'POST',
      data: retailer,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getRetailers() {
  try {
    const result = await http({
      url: '/apis/retailers',
      method: 'GET',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function updateRetailer(retailer) {
  try {
    const result = await http({
      url: `/apis/retailers/${retailer.globalId}`,
      method: 'PUT',
      data: retailer,
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteARetailerAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/retailers/${globalId}`,
      method: 'DELETE',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function pingRetailerAPI(globalId) {
  try {
    const result = await http({
      url: `/apis/retailers/${globalId}/status`,
      method: 'PUT',
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}
