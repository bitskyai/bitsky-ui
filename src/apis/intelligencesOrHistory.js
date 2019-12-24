import _ from 'lodash';
import http from '../utils/http';

export async function getIntelligencesOrHistoryForManagementAPI(
  cursor,
  url,
  state,
  limit,
  history,
) {
  try {
    const params = {
      limit: limit || 50,
    };
    if (cursor) {
      params.cursor = cursor;
    }
    if (url) {
      if (_.isArray(url)) {
        url = url[0];
      }
      params.url = url;
    }
    if (state && state.length) {
      params.state = state.join(',');
    }
    let targetUrl = '/apis/manangement/intelligences';
    if (history) {
      targetUrl = '/apis/manangement/intelligenceshistory';
    }
    const result = await http({
      url: targetUrl,
      method: 'GET',
      params,
    });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function pauseIntelligencesForManagementAPI(url, ids) {
  try {
    const params = {};
    if (url) {
      params.url = url;
    }

    const config = {
      url: '/apis/manangement/intelligences/pause',
      method: 'POST',
      params,
    };
    if (ids) {
      config.data = ids;
    }

    const res = await http(config);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function resumeIntelligencesForManagementAPI(url, ids) {
  try {
    const params = {};
    if (url) {
      params.url = url;
    }

    const config = {
      url: '/apis/manangement/intelligences/resume',
      method: 'POST',
      params,
    };
    if (ids) {
      config.data = ids;
    }

    const res = await http(config);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteIntelligencesOrHistoryForManagementAPI(url, ids, history) {
  try {
    const params = {};
    if (url) {
      params.url = url;
    }

    let targetUrl = '/apis/manangement/intelligences';
    if (history) {
      targetUrl = '/apis/manangement/intelligenceshistory';
    }

    const config = {
      url: targetUrl,
      method: 'DELETE',
      params,
    };
    if (ids) {
      config.data = ids;
    }

    const res = await http(config);
    return res.data;
  } catch (err) {
    throw err;
  }
}
