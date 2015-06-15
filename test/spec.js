/**
 * turtle.js
 *
 *    Library test
 */

'use strict'

var assert = require('assert'),
lib        = require('../lib/turtle.js');

describe('Basic library test', function() {
  it('should answer all questions with YO!', function() {
    var answer = lib.turtle('Should I tickle this unicorn?');
    assert.equal(answer,'YO!');
  })
})
