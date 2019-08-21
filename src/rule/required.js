/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/required
 */

import tc from '@spaceavocado/type-check';

/**
 * Required rule
 * @param {string} msg error message.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg) => (value) => {
  if (tc.isNullOrUndefined(value)
  || tc.isObject(value)
  || tc.isFunction(value)) {
    return msg;
  }
  if (tc.isString(value)) {
    value = value.trim();
    if (value.length == 0) {
      return msg;
    }
  }
  return true;
};
