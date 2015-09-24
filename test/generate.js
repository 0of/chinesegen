'use strict';

var should = require("should");

var generate = require('../index');

describe('chinesegen generate API', function () {
    it('should generate empty object', function () {
        var empty = generate();
        should(empty).exactly({
            text: '',
            total: 0,
            sentenceCount: 0
        });
    });

    it('should generate same word count as it returns', function () {
        var expected = rand(50, 200);
        var generated = generate({count: expected});

        var actual = length(generated.text);
        should(actual).exactly(expected);
        should(actual).exactly(generated.total);
    });
});

function rand (includedMin, includedMax) {
    return Math.floor(Math.random() * (includedMax - includedMin + 1)) + includedMin;
}

function isValidChar (index) {
    var code = this.charCodeAt(index);

    // BMP
    if (code < 0xD800 || code > 0xDFFF) {
        return true;
    }

    // high surrogate
    if (code < 0xDC00) {
        // access the low surrogate
        var nextCode = this.charCodeAt(index + 1);
        if (isNaN(nextCode)) return false;
        if (nextCode < 0xDC00 || nextCode > 0xDFFF) return false;

        return true;
    } else {
        // low surrogate
        return false;
    }
}

function length (text) {
    var len = 0;
    for (var i = 0; i < text.length; i++) {
        if (isValidChar.call(text, i) === true) len++;
    }
}