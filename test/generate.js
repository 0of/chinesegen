'use strict';

var should = require("should");

var generate = require('../index');

describe('chinesegen generate API', function () {
    it('should generate empty object', function () {
        var empty = generate();
        should(empty).eql({
            text: '',
            total: 0,
            sentenceCount: 0
        });
    });

    it('should generate same word count as it returns', function () {
        var expected = rand(50, 200);
        var generated = generate({ count: expected });

        var actual = length(generated.text);
        should(actual).exactly(expected);
        should(actual).exactly(generated.total);
    });

    it('should generate correct sentence count', function () {
        var total = rand(50, 200);
        var generated = generate({ count: total });

        should(sentences(/[\u3002\uFF1F\uFF01]/g, generated.text)).exactly(generated.sentenceCount);
    });

    it('should generate correct sentence count when given tolerated periods', function () {
        var total = rand(50, 200);
        var generated = generate({ count: total, toleratedPeriods: '.?!' });

        should(sentences(/[\u3002\uFF1F\uFF01\.\?\!]/g, generated.text)).exactly(generated.sentenceCount);
    });

    it('should generate corrent word count as it returns when format as \\uXXXX', function () {
        var format = '\\uXXXX';
        var total = rand(50, 200);
        var generated = generate({ count: total, format: format });

        var lens = formatLength(generated.text);

        should(lens.len).exactly(generated.total);
        should(lens.matched * format.length).exactly(generated.text.length);
    });
});

function rand (includedMin, includedMax) {
    return Math.floor(Math.random() * (includedMax - includedMin + 1)) + includedMin;
}

function isValidChar (code, next) {
    // BMP
    if (code < 0xD800 || code > 0xDFFF) {
        return true;
    }

    // high surrogate
    if (code < 0xDC00) {
        // access the low surrogate
        var nextCode = next();
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
        if (isValidChar(text.charCodeAt(i), String.prototype.charCodeAt.bind(text, i + 1)) === true) len++;
    }

    return len;
}

function sentences (periods, text) {
    return (text.match(periods) || []).length;
}

function formatLength (text) {
    var len = 0,
        matchedCount = 0;

    var exp = /\\u([0-9A-F]{4})/g;

    function goNext () {
        var matched = exp.exec(text);
        if (matched) {
            ++matchedCount;
            return parseInt(matched[1], 16);
        }

        return NaN;
    }

    var current;
    while (!isNaN(current = goNext())) {
        if (isValidChar(current, goNext) === true) len++;
    }

    return {matched: matchedCount, len: len};
}