/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/rx
 */

import tc from '@spaceavocado/type-check';

/**
 * Custom regex rule.
 * @param {string} msg error message.
 * @param {number} arg Regular expression.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg, arg) => (value) => {
  if (tc.isNullOrUndefined(value) || tc.not.isString(value)) {
    return msg;
  }
  if (value.match(arg) == null) {
    return msg;
  }
  return true;
};
