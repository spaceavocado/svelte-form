/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/equal
 */

import tc from '@spaceavocado/type-check';

/**
 * Equal rule.
 * @param {string} msg error message.
 * @param {mixed|function} arg a matcher object or
 * matcher function = fn(val) returning true|false.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg, arg) => {
  const customMatcher = tc.isFunction(arg);
  return (value) => {
    if (customMatcher === false && tc.isNullOrUndefined(value)) {
      return msg;
    }
    if (customMatcher) {
      if (arg(value) === false) {
        return msg;
      }
    } else if (value !== arg) {
      return msg;
    }
    return true;
  };
};
