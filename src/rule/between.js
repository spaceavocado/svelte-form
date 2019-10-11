/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/between
 */

import min from './min';
import max from './max';

/**
 * Between numbers rule
 * @param {string} msg error message.
 * @param {number} arg1 min number.
 * @param {number} arg2 max number.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default (msg, arg1, arg2) => (value) => {
  if (min('', arg1)(value) !== true || max('', arg2)(value) !== true) {
    return msg;
  }
  return true;
};

