var wordsGen = require('./lib/random-words'),
    freqUsedWordsGen = require('./lib/random-freqwords'),
    rand = require('./lib/rand').randIE;

exports = module.exports = generate;

/**
 * generate random paragraph in Chinese
 *
 * @param {Object} [opts]
 * @param {Number} [opts.count] the total word count of the generated paragraph
 * @param {Boolean} [opts.freq] use frequently used words
 * @param {String} [opts.format] support '\uXXXX'
 * @param {String} [opts.toleratedPeriods]
 * @return {Object}
 *  {String} [text] random text
 *  {Number} [total] text total length
 *  {Number} [sentenceCount] sentence count
 * @public
 */
function generate (opts) {
    var options = opts || {},
        genCount = Math.abs(options.count) >>> 0,
        // min/max word count in a sentence
        minCount = Math.abs(options.minCount) || 5,
        maxCount = Math.abs(options.maxCount) || 20,
        periods = extendPeriod(options.toleratedPeriods || '');

    var avail = 0;
    var genWords = opts.freq === true ? freqUsedWordsGen : wordsGen,
        wordCountFn = function () {
            var count = rand(minCount, maxCount);
            return count > avail ? avail - 1 : count;
        },
        genPeriod = function () {
            return periods[rand(0, periods.length)];
        },
        genSentences = function (genEachSentenceFn) {
            var gen = {
                text: '',
                total: 0,
                sentenceCount: 0
            };

            while ((avail = genCount - gen.total) > 0) {
                gen.total += genEachSentenceFn(gen);
                gen.sentenceCount++;
            }

            return gen;
        };

    return genSentences(function (gen) {
        var currentWordCount = wordCountFn();

        gen.text += genWords(currentWordCount);
        gen.text += genPeriod();

        return currentWordCount + 1;
    });
}

function extendPeriod (extendString) {
    var periods = ['\u3002', '\uFF1F', '\uFF01'],
        lastIndexOf = Array.prototype.lastIndexOf;

    for (var i = 0, eachChar; i < extendString.length; i++) {
        eachChar = getCharAt.call(extendString, i);
        if (eachChar === false) continue;
        // make sure uniqueness
        if (lastIndexOf.call(periods, eachChar) !== -1) continue;

        periods.push(eachChar);
    }

    return periods;
}

// no bound checking
// return false when unknown character or iterating at the low surrogate
function getCharAt (index) {
    var code = this.charCodeAt(index);

    // BMP
    if (code < 0xD800 || code > 0xDFFF) {
        return String.fromCharCode(code);
    }

    // high surrogate
    if (code < 0xDC00) {
        // access the low surrogate
        var nextCode = this.charCodeAt(index + 1);
        if (isNaN(nextCode)) return false;
        if (nextCode < 0xDC00 || nextCode > 0xDFFF) return false;

        return String.fromCharCode(code, nextCode);
    } else {
        // low surrogate
        return false;
    }
}
