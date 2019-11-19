import _ from 'lodash';
import http, { getRedirectURL } from '../utils/http';

// export async function registerAgentAPI(agent) {
//   try {
//     let result = await http({
//       url: '/apis/agents',
//       method: 'POST',
//       data: agent,
//     });
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

export async function getIntelligencesForManagementAPI(cursor, url, state, limit) {
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
    const result = await http({
      url: '/apis/manangement/intelligences',
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

export async function deleteIntelligencesForManagementAPI(url, ids) {
  try {
    const params = {};
    if (url) {
      params.url = url;
    }

    const config = {
      url: '/apis/manangement/intelligences',
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

// export async function updateAgentAPI(agent) {
//   try {
//     let result = await http({
//       url: `/apis/agents/${agent.globalId}`,
//       method: 'PUT',
//       data: agent
//     });
//     return result.data;
//   } catch (err) {
//     throw err;
//   }
// }

// export async function deleteAgentAPI(globalId) {
//   try {
//     let result = await http({
//       url: `/apis/agents/${globalId}`,
//       method: 'DELETE',
//     });
//     return result.data;
//   } catch (err) {
//     throw err;
//   }
// }

// export async function activateAgentAPI(globalId) {
//   try {
//     let result = await http({
//       url: `/apis/agents/${globalId}/activate`,
//       method: 'POST',
//     });
//     return result.data;
//   } catch (err) {
//     throw err;
//   }
// }

// export async function deactivateAgentAPI(globalId) {
//   try {
//     let result = await http({
//       url: `/apis/agents/${globalId}/deactivate`,
//       method: 'POST',
//     });
//     return result.data;
//   } catch (err) {
//     throw err;
//   }
// }
