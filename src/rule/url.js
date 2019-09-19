/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/url
 */

import tc from '@spaceavocado/type-check';

/**
 * URL rule
 * @param {string} msg error message.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg) => (value) => {
  if (tc.isNullOrUndefined(value) || tc.not.isString(value)) {
    return msg;
  }
  if (value.match(/^https?:\/\/[^\s]*/i) == null) {
    return msg;
  }
  return true;
};
