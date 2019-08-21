/**
 * Svelte Form module.
 * @module svelte-form
 */

import tc from '@spaceavocado/type-check';
import {writable, derived, get} from 'svelte/store';

// Rules
import required from './rule/required';
import email from './rule/email';
import url from './rule/url';
import equal from './rule/equal';
import min from './rule/min';
import max from './rule/max';
import between from './rule/between';
import rx from './rule/rx';

export {
  required,
  email,
  url,
  equal,
  min,
  max,
  between,
  rx,
};

/**
 * Get input validation rules
 * @private
 * @param {string} key input key.
 * @param {object} validation rules.
 * @return {function[]} validation rules.
 */
function validationRules(key, validation) {
  validation = validation || {};
  if (tc.isNullOrUndefined(validation[key])) {
    return [];
  }
  if (tc.isArray(validation[key])) {
    return validation[key];
  }
  return [validation[key]];
}

/**
 * Validate field
 * @private
 * @param {mixed} value field value.
 * @param {function[]} rules filed validation rules.
 * @return {boolean|string} true = no error, string = error message.
 */
function validate(value, rules) {
  for (let i = 0; i < rules.length; i++) {
    const err = rules[i](value);
    if (err !== true) {
      return err;
    }
  }
  return true;
}

/**
 * Form object
 * @typedef Form
 * @property {function} subscribe Svelte store, context {valid: boolean}.
 * @property {function} field Get form field observable value and state.
 * Signature fn(key), returns {module:svelte-form~FormField}.
 * @property {function} data Get all form fields data. Signature fn().
 */

/**
 * FormField object
 * @typedef FormField
 * @property {function} value Svelte store, context: mixed value.
 * @property {function} state Svelte store,
 * context: {valid: boolean, error: string}.
 */

/**
 * Create a new form store
 * @param {object} fields Form fields.
 * @param {object} validation Validation rules mapping.
 * Where each key is a fn(val)->boolean validation function or
 * an array of fn(val)->boolean validation functions.
 * @param {object} opts Form options.
 * @param {boolean} opts.onCreateValidation Validate form fields
 * when the form is created. Defaults to false.
 * @return {module:svelte-form~Form}
 */
export default function(fields, validation, opts) {
  opts = opts || {};
  opts.onCreateValidation = opts.onCreateValidation || false;
  const _fields = {};

  // Field wrapper structure
  const field = (key, rules) => {
    let firstPass = true;
    const value = writable(fields[key]);
    const state = derived(
        value,
        ($value) => {
          if (firstPass) {
            firstPass = false;
            if (opts.onCreateValidation === false) {
              return {
                valid: true,
                error: '',
              };
            }
          }
          const res = validate($value, rules);
          return {
            valid: res === true,
            error: res === true ? '' : res,
          };
        }
    );
    return {
      value,
      state,
    };
  };

  // Convert all inputs into field wrappers
  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      _fields[key] = field(key, validationRules(key, validation));
    }
  }

  // Overall valid state
  const {subscribe} = derived(
      Object.values(_fields).map((f) => f.state),
      ($states) => {
        return {
          valid: $states.every((s) => s.valid === true),
        };
      }
  );

  return {
    subscribe,
    field: (key) => {
      if (tc.isNullOrUndefined(_fields[key])) {
        return undefined;
      }
      return {
        value: _fields[key].value,
        state: _fields[key].state,
      };
    },
    data: () => {
      const data = {};
      for (const key in _fields) {
        if (_fields.hasOwnProperty(key)) {
          data[key] = get(_fields[key].value);
        }
      }
      return data;
    },
  };
}
