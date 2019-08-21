# Svelte Form
Simple [Svelte](#https://svelte.dev) Form model handler and form fields validation library. It is designed to give maximum freedom in the actual input component construction, i.e. there are not actual build-in input components, rather examples how to build one.

To see the details code documentation, please read the [Code Documentation](https://spaceavocado.github.io/svelte-form/).

**Quick Links**
* [Webpack Setup](#webpack-setup)
* [Rollup Setup](#rollup-setup)

**Table of Content**
- [Svelte Form](#svelte-form)
  - [Installation via NPM or Yarn](#installation-via-npm-or-yarn)
  - [Webpack Setup](#webpack-setup)
  - [Rollup Setup](#rollup-setup)
  - [Essentials](#essentials)
    - [Create the Form](#create-the-form)
    - [Input Binding](#input-binding)
    - [Form State](#form-state)
    - [Form Data](#form-data)
    - [Form Field Validation](#form-field-validation)
    - [Builtin Validation Rules](#builtin-validation-rules)
      - [Required](#required)
      - [Equal](#equal)
      - [Email](#email)
      - [URL](#url)
      - [Min](#min)
      - [Max](#max)
      - [Between](#between)
      - [Regular Expression](#regular-expression)
    - [Custom Validation Rule](#custom-validation-rule)
  - [API](#api)
    - [Create Form](#create-form)
      - [Form Options](#form-options)
    - [Form Object](#form-object)
    - [Form Field Object](#form-field-object)
  - [Changes](#changes)
  - [About](#about)
  - [Contributing](#contributing)
    - [Pull Request Process](#pull-request-process)
  - [License](#license)

## Installation via NPM or Yarn
```sh
npm install -D @spaceavocado/svelte-form
```
```sh
yarn add @spaceavocado/svelte-form -D
```

## Webpack Setup
Please see the [Svelte Webpack Template](https://github.com/sveltejs/template-webpack).
Important setup in the **webpack.config.js**:
```javascript
resolve: {
  // This alias is important to prevent svelte mismatch
  // between your code, and the 3rd party components.
  alias: {
    svelte: path.resolve('node_modules', 'svelte')
  },
  extensions: ['.mjs', '.js', '.svelte'],
  mainFields: ['svelte', 'browser', 'module', 'main']
},

module: {
  rules: [
    {
      test: /\.svelte$/,
      // Do not exclude: /(node_modules)/ since the router 
      // components are located in the node_modules
      use: {
        loader: 'svelte-loader',
        options: {
          emitCss: true,
          hotReload: true
        }
      }
    }
  ]
}
```

## Rollup Setup
rollup.config.js:
```javascript
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';

export default {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    svelte(),
    babel({
      exclude: 'node_modules/**',
    }),
  ]
}
```

## Essentials
Note: All code below uses ES2015+.

### Create the Form
form.svelte:
```javascript
import createForm from '@spaceavocado/form';

// An example of a form without validation
const form = createForm({
  username: '',
  password: '',
});
```
> To get more details about the createForm method, please see [Create Form](#create-form).

### Input Binding
form.svelte:
```html
<script>
import createForm from '@spaceavocado/form';
import TextInput from './input/text.svelte';

// An example of a form without validation
const form = createForm({
  username: '',
  password: '',
});
</script>

<TextInput form={form} name='username' />
```
text.svelte:
```html
<script>
  // Props
  export let form;
  export let name;

  // Get the form field
  $: field = form.field(name);
  // Value svelte store
  $: value = field.value;
  // State svelte store, {valid: boolean, error: string}
  $: state = field.state;
</script>

<div class="input" class:error="{$state.valid === false}">
  <input type="text" bind:value="{value}" />
  <p class="validation">{$state.error}</p>
</div>

<style lang="scss">
.input {
  .validation {
    display: none;
  }
  &.error {
    .validation {
      display: block;
    }
  }
}
</style>
```
* The state store is a derived store based on the value store, performing the input validation each time the value changes.
* The **form.field(name)** method gets the field stores, for more details see [Form Field Object](#form-field-object).

### Form State
The form state is a svelte store holding the form validation state.

form.svelte:
```javascript
import createForm from '@spaceavocado/form';

// An example of a form without validation
const form = createForm({
  username: '',
  password: '',
});

// You can directly subscribe to form state change
form.subscribe((f) => console.log(f.valid));
// or shorthand access.
console.log($form.valid)
```

> To get more details about the form, please see [Form Object](#form-object).

### Form Data
You can get the current form date anytime by calling:
```javascript
import createForm from '@spaceavocado/form';

// An example of a form without validation
const form = createForm({
  username: '',
  password: '',
});

// Get the form current data
const data = form.data();
```

### Form Field Validation
Validation functions could be passed for individual form fields:

```javascript
import createForm from '@spaceavocado/form';
import {required, email} from '@spaceavocado/form';

// An example of a form without validation
const form = createForm(
  // Form fields
  {
    username: '',
    password: '',
  },
  // Form validation - optional
  // Collection of validation rules or single rule.
  {
    username: [
      required('This field is required'),
      email('Invalid email format')
    ],
    password: required('This field is required'),
  }
);
```

**More information:**
* [Builtin Validation Rules](#builtin-validation-rules).
* [Custom Validation Rule](#custom-validation-rule).

### Builtin Validation Rules

#### Required
```javascript
import {required} from '@spaceavocado/form';

// Create new rule
const rule = required('Error message');
```

#### Equal
```javascript
import {equal} from '@spaceavocado/form';

// The value must be equal to 5
const rule = equal('Error message', 5);

// Equal can accept fn(val)->boolean as an argument for a custom
// equality matching.
const customMatcherRule = equal('Error message', (val) => {
  return val === 5;
});
```

#### Email
```javascript
import {email} from '@spaceavocado/form';

// Create new rule
const rule = email('Error message');
```

#### URL
```javascript
import {url} from '@spaceavocado/form';

// Create new rule
const rule = url('Error message');
```

#### Min
```javascript
import {min} from '@spaceavocado/form';

// The value must be 5 and more.
const rule = min('Error message', 5);
```

#### Max
```javascript
import {max} from '@spaceavocado/form';

// The value must be 5 and less.
const rule = max('Error message', 5);
```

#### Between
```javascript
import {between} from '@spaceavocado/form';

// The value must be between 5 and 10 inclusively.
const rule = between('Error message', 5, 10);
```

#### Regular Expression
```javascript
import {rx} from '@spaceavocado/form';

// The value must match custom regular expression.
const rule = rx('Error message', /\d+\.\d+/);
```

### Custom Validation Rule
Custom validation rule must be a function accepting a tested value, and expected to return true when valid, or error message string in not valid, e.g.:
```javascript
const invoice = (msg) => (value) => {
  if (value.match(/inv-\d+/) === null) {
    return msg;
  }
  return true;
}

// The actual rule expected by the form field, e.g. fn(val)->true|string
const rule = invoice('Invalid invoice number');
```

## API
To see the details code documentation, please read the [Code Documentation](https://spaceavocado.github.io/svelte-form/)

### Create Form
```javascript
import createForm from '@spaceavocado/form';

// Please see the opts below.
const formOpts = {};

// Please see the Form object for details on returned object
const form = createForm(
  // Form fields
  {
    username: '',
    password: '',
  },
  // Form validation - optional
  // Collection of validation rules or single rule.
  {
    username: [
      required('This field is required'),
      email('Invalid email format')
    ],
    password: required('This field is required'),
  },
  // Form options - optional
  formOpts,
);
```

#### Form Options
| Property           | Description                                                       | Type    |
| :----------------- | :---------------------------------------------------------------- | :------ |
| onCreateValidation | Validate form fields when the form is created. Defaults to false. | boolean |


### Form Object
| Property  | Description                                                                                                    | Type     |
| :-------- | :------------------------------------------------------------------------------------------------------------- | :------- |
| subscribe | Svelte store, context {valid: boolean}.                                                                        | function |
| field     | Get form field observable value and state. Signature fn(key), returns [Form Field Object](#form-field-object). | function |
| data      | Get all form fields data. Signature fn().                                                                      | function |

### Form Field Object
| Property | Description                                             | Type     |
| :------- | :------------------------------------------------------ | :------- |
| value    | Svelte store, context: mixed value.                     | function |
| state    | Svelte store, context: {valid: boolean, error: string}. | function |

## Changes
To see the changes that were made in a given release, please lookup the tag on the releases page. The full changelog could be seen here [changelog.md](https://github.com/spaceavocado/svelte-form/blob/master/changelog.md)

## About
This project is mainly to explore and test [Svelte](#https://svelte.dev) in SPA realm. Any feedback, contribution to this project is welcomed.

The project is in a beta phase, therefore there might be major changes in near future, the annotation should stay the same, though.

## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

### Pull Request Process
1. Fork it
2. Create your feature branch (git checkout -b ft/new-feature-name)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin ft/new-feature-name)
5. Create new Pull Request
> Please make an issue first if the change is likely to increase.

## License
Svelte Router is released under the MIT license. See [LICENSE.txt](https://github.com/spaceavocado/svelte-router/blob/master/LICENSE.txt).