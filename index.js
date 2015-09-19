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
        maxCount = Math.abs(options.maxCount) || 20;

    var periods = ['\u3002', '\uFF1F', '\uFF01'];

    var avail = 0;
    var genFn = opts.freq === true ? freqUsedWordsGen : wordsGen,
        wordCountFn = function () {
            var count = rand(minCount, maxCount);
            return count > avail ? avail - 1 : count;
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

        gen.text += genFn(currentWordCount);
        gen.text += periods[rand(0, periods.length)];

        return currentWordCount + 1;
    });
}
