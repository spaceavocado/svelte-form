/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/min
 */

import tc from '@spaceavocado/type-check';

/**
 * Min rule
 * @param {string} msg error message.
 * @param {number} arg min number.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg, arg) => (value) => {
  if (tc.isNullOrUndefined(value) || tc.not.isNumber(value)
  || tc.isNullOrUndefined(arg)) {
    return msg;
  }
  if (value < arg) {
    return msg;
  }
  return true;
};
