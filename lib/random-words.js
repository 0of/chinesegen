var genNumber = require('./rand').randII;

exports = module.exports = generateRandomWords;

function generateRandomWords (count) {
    var genCount = count >>> 0;

    var charCodes = [];
    for (var i = 0; i < genCount; ++i) {
        charCodes.push(genNumber(0x4E00, 0x9FBF));
    }

    return String.fromCharCode.apply(String, charCodes);
}
