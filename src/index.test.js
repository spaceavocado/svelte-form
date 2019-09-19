import {validate} from './index';
import url from './rule/url';
import ignore from './rule/ignoreEmpty';

describe('Break rule', () => {
  const rules = [ignore(), url('invalid')];
  const tests = [
    {cond: undefined, res: true},
    {cond: null, res: true},
    {cond: {}, res: true},
    {cond: '', res: true},
    {cond: 'some', res: 'invalid'},
    {cond: 'http://domain.com', res: true},
  ];

  for (const t of tests) {
    test(`Cond: ${t.cond}`, () => {
      expect(validate(t.cond, rules)).toBe(t.res);
    });
  }
});
