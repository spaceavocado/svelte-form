import required from './required';
import email from './email';
import url from './url';
import equal from './equal';
import min from './min';
import max from './max';
import between from './between';
import rx from './rx';

/**
 * Rur rule tests
 * @param {function} rule fn(value)
 * @param {object[]} tests
 */
function runTests(rule, tests) {
  for (const t of tests) {
    test(`Cond: ${t.cond}`, () => {
      expect(rule(t.cond)).toBe(t.res);
    });
  }
}

describe('Required', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '', res: 'invalid'},
    {cond: 'some', res: true},
  ];
  runTests(required('invalid'), tests);
});

describe('Equal', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '5', res: 'invalid'},
    {cond: 5, res: true},
  ];
  runTests(equal('invalid', 5), tests);
  runTests(equal('invalid', (val) => val === 5), tests);
});

describe('Email', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '', res: 'invalid'},
    {cond: 'emaildomain.com', res: 'invalid'},
    {cond: 'email@domaincom', res: 'invalid'},
    {cond: '@domain.com', res: 'invalid'},
    {cond: 'email@domain.com', res: true},
  ];
  runTests(email('invalid'), tests);
});

describe('URL', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '', res: 'invalid'},
    {cond: 'domain.com', res: 'invalid'},
    {cond: 'http://domain.com', res: true},
    {cond: 'https://domain.com', res: true},
  ];
  runTests(url('invalid'), tests);
});

describe('Min', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '', res: 'invalid'},
    {cond: 4, res: 'invalid'},
    {cond: 5, res: true},
    {cond: 10, res: true},
  ];
  runTests(min('invalid', 5), tests);
});

describe('Max', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '', res: 'invalid'},
    {cond: 6, res: 'invalid'},
    {cond: 5, res: true},
    {cond: 1, res: true},
  ];
  runTests(max('invalid', 5), tests);
});

describe('Between', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '', res: 'invalid'},
    {cond: 4, res: 'invalid'},
    {cond: 11, res: 'invalid'},
    {cond: 5, res: true},
    {cond: 7, res: true},
    {cond: 10, res: true},
  ];
  runTests(between('invalid', 5, 10), tests);
});

describe('Rx', () => {
  const tests = [
    {cond: undefined, res: 'invalid'},
    {cond: null, res: 'invalid'},
    {cond: {}, res: 'invalid'},
    {cond: '', res: 'invalid'},
    {cond: 5, res: 'invalid'},
    {cond: '5.', res: 'invalid'},
    {cond: '5.5', res: true},
  ];
  runTests(rx('invalid', /\d+\.\d+/), tests);
});
