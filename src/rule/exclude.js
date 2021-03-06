/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/exclude
 */

import tc from '@spaceavocado/type-check';

/**
 * Max rule
 * @param {string} msg error message.
 * @param {number[]|string[]} arg exclusion list.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg, arg) => (value) => {
  if (tc.isNullOrUndefined(value)
  || (tc.not.isString(value) && tc.not.isNumber(value))
  || tc.isNullOrUndefined(arg)) {
    return msg;
  }
  if (arg.indexOf(value) > -1) {
    return msg;
  }
  return true;
};
