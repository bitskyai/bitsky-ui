import _ from 'lodash';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

const isDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return false;
};

/**
 * Traverse an object
 * @param {*} obj
 * @param {function} fun - Traverse function, will pass two parameters(obj, key),
 *                         if key is undefined, then means this is a root node
 */
function traverse(obj, fun) {
  // traverse children
  if (_.isObject(obj) || _.isArray(obj)) {
    // first traverse all the leaf, then traverse obj
    // Get all leafs
    const keys = _.keys(obj);
    // traverse all leafs
    for (let i = 0; i < keys.length; i += 1) {
      const leaf = obj[keys[i]];
      // traverse children
      if ((_.isObject(leaf) || _.isArray(leaf)) && _.keys(leaf).length) {
        traverse(leaf, fun);
      }

      // traverse current node
      fun(obj, keys[i]);
    }
  }

  // root node
  obj = fun(obj);
  return obj;
}

function filterOutEmptyValue(value) {
  value = traverse(value, (obj, key) => {
    // console.log('Before ', 'key: ', key, "obj: ", obj);
    if (key) {
      // remove empty object
      if (_.isObject(obj[key]) && !_.keys(obj[key]).length) {
        delete obj[key];
      } else if (_.isArray(obj[key])) {
        const arr = [];
        for (let i = 0; i < obj[key].length; i += 1) {
          if (obj[key][i]) {
            arr.push(obj[key][i]);
          }
        }
        obj[key] = arr;
        if (!obj[key].length) {
          // remove empty array
          delete obj[key];
        }
      } else if (!obj[key]) {
        // remove empty value
        delete obj[key];
      }
    } else {
      // remove empty object
      // eslint-disable-next-line no-lonely-if
      if (_.isObject(obj) && !_.keys(obj).length) {
        obj = undefined;
      } else if (_.isArray(obj)) {
        const arr = [];
        for (let i = 0; i < obj.length; i += 1) {
          if (obj[i]) {
            arr.push(obj[i]);
          }
        }
        obj = arr;
        // remove empty array
        if (!obj.length) {
          obj = undefined;
        }
      } else if (!obj) {
        // remove empty value
        obj = undefined;
      }
    }
    //   console.log("After ", "key: ", key, "obj: ", obj);
    return obj;
  });

  return value;
}

/**
 * Send message to electron to get, update information or do some operations.
 * @param {string} subject - message subject. [ 'getHeadlessConfig',
 *                                              'updateHeadlessConfig',
 *                                              'startHeadless',
 *                                              'stopHeadless',
 *                                              'getServiceConfig',
 *                                              'updateServiceConfig',
 *                                              'startService',
 *                                              'stopService' ]
 * @param {object} [data] - data want to send to electron
 */
async function sendToElectron(subject, data) {
  return new Promise((resolve, reject) => {
    try {
      const event = new CustomEvent('syncSupplierUIToMain', {
        detail: {
          subject,
          data,
          callback: cbData => {
            resolve(cbData);
          },
        },
      });
      window.dispatchEvent(event);
    } catch (err) {
      reject(err);
    }
  });
}

export { isDev, isUrl, filterOutEmptyValue, traverse, sendToElectron };
