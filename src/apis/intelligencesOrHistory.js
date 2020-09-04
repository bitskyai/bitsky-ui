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
        const firstUrl = url[0];
        params.url = firstUrl;
      } else {
        params.url = url;
      }
    }
    if (state && state.length) {
      params.state = state.join(',');
    }
    let targetUrl = '/apis/manangement/tasks';
    if (history) {
      targetUrl = '/apis/manangement/taskshistory';
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

export async function rerunIntelligencesForManagementAPI(url, ids, state) {
  try {
    const params = {};
    if (url) {
      if (_.isArray(url)) {
        const firstUrl = url[0];
        params.url = firstUrl;
      } else {
        params.url = url;
      }
    }
    if (state && state.length) {
      params.state = state.join(',');
    }

    const config = {
      url: '/apis/manangement/taskshistory/rerun',
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

export async function pauseIntelligencesForManagementAPI(url, ids, state) {
  try {
    const params = {};
    if (url) {
      params.url = url;
    }

    if (state && state.length) {
      params.state = state.join(',');
    }

    const config = {
      url: '/apis/manangement/tasks/pause',
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

export async function resumeIntelligencesForManagementAPI(url, ids, state) {
  try {
    const params = {};
    if (url) {
      params.url = url;
    }

    if (state && state.length) {
      params.state = state.join(',');
    }

    const config = {
      url: '/apis/manangement/tasks/resume',
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

export async function deleteIntelligencesOrHistoryForManagementAPI(url, ids, state, history) {
  try {
    const params = {};
    if (url) {
      params.url = url;
    }

    if (state && state.length) {
      params.state = state.join(',');
    }

    let targetUrl = '/apis/manangement/tasks';
    if (history) {
      targetUrl = '/apis/manangement/taskshistory';
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
