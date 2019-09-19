/**
 * Svelte Form validation rules module.
 * @module svelte-form/rule/ignore
 */

import required from './required';

// Break validation symbol
export const BREAK_FLAG = Symbol('Break Validation');

/**
 * Ignore empty rule
 * This rule causes to break the validation chain for empty values.
 * @return {boolean|string} true when valid, error message otherwise.
 */
export default () => {
  const req = required('');
  return (value) => {
    if (req(value) !== true) {
      return BREAK_FLAG;
    }
    return true;
  };
};
