/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/email
 */

import tc from '@spaceavocado/type-check';

/**
 * Email rule
 * @param {string} msg error message.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg) => (value) => {
  if (tc.isNullOrUndefined(value) || tc.not.isString(value)) {
    return msg;
  }
  const rule = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (value.match(rule) == null) {
    return msg;
  }
  return true;
};
