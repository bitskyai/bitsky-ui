import http, {getRedirectURL} from '../utils/http';

export async function getSelf() {
  try {
    let res = await http({
      url: '/apis/self',
      method: 'POST',
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

/**
 * Update
 * @param {object} profile
 * @param {string} profile.name
 * @param {email} profile.email
 */
export async function updateProfile(profile) {
  try {
    let data = await http({
      url: '/apis/account/profile',
      method: 'PUT',
      data: profile,
    });
    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Change password
 * @param {object} data
 * @param {string} data.password
 * @param {string} data.currentPassword
 * @param {string} data.confirmPassword
 */
export async function changePassword(data) {
  try {
    let result = await http({
      url: '/apis/account/password',
      method: 'PUT',
      data,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

/**
 * Delete account
 */
export async function deleteThisAccount() {
  console.log(`deleteThisAccount`);
  try {
    let res = await http({
      url: '/apis/account',
      method: 'DELETE',
    });
    return getRedirectURL(res);
  } catch (err) {
    throw err;
  }
}
