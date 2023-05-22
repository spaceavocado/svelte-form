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
  const rule = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
  if (value.match(rule) == null) {
    return msg;
  }
  return true;
};
