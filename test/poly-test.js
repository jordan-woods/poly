const assert = require('assert');
const {derivative, evaluate} = require('../polynomial')

describe('The differentiator', () => {
  it('detects malformed polynomials', done => {
    assert.throws(() => derivative('2y'))
    assert.throws(() => derivative('blah'))
    assert.throws(() => derivative('2x*6'))
    done();
  });
  it('correctly differentiates single-term polynomials', done => {
    assert.strictEqual(derivative('4'), '0');
    assert.strictEqual(derivative('2238'), '0');
    assert.strictEqual(derivative('x'), '1');
    assert.strictEqual(derivative('4x'), '4');
    assert.strictEqual(derivative('x^5'), '5x^4');
    assert.strictEqual(derivative('2x^-4'), '-8x^-5');
    done();
  });
  it('correctly differentiates multi-term polynomials', done => {
    assert.strictEqual(derivative('-4'), '-0');
    assert.strictEqual(derivative('-2238'), '-0');
    assert.strictEqual(derivative('-x'), '-1');
    assert.strictEqual(derivative('-x^5'), '-5x^4');
    assert.strictEqual(derivative('-x^-5'), '+5x^-6');
    assert.strictEqual(derivative('2x^-4    + 7x^2'), '-8x^-5+14x^1');
    assert.strictEqual(derivative('   2x^-4- 7x^20'), '-8x^-5-140x^19');
    assert.strictEqual(derivative('2x^-4       +7x^-2'), '-8x^-5-14x^-3');
    done();
  });
});

describe('The evaluator', () => {
  it('detects malformed polynomials', done => {
    assert.throws(() => evaluate('2y'))
    assert.throws(() => evaluate('blah'))
    assert.throws(() => evaluate('2x*6'))
    done();
  });
  it('correctly evaluates single-term polynomials', done => {
    assert.strictEqual(evaluate('4', 5), 4);
    assert.strictEqual(evaluate('2238', 19), 2238);
    assert.strictEqual(evaluate('x', 3), 3);
    assert.strictEqual(evaluate('4x', 10), 40);
    assert.strictEqual(evaluate('x^5', 2), 32);
    assert.strictEqual(evaluate('32x^-4', 2), 2);
    done();
  });
  it('correctly evaluates complex polynomials', done => {
    assert.strictEqual(evaluate('-4', 8), -4);
    assert.strictEqual(evaluate('-2238', 11), -2238);
    assert.strictEqual(evaluate('-x', 5), -5);
    assert.strictEqual(evaluate('-x^5', 3), -243);
    assert.strictEqual(evaluate('-x^-3', 2), -0.125);
    assert.strictEqual(evaluate('2x^8    + 7x^2', 2), 540);
    assert.strictEqual(evaluate('   2x^3- 7x^1', 4), 100);
    assert.strictEqual(evaluate('2x^3       +7x^1', 4), 156);
    done();
  });
});
