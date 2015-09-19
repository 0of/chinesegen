exports = module.exports = {
    randII: function (includedMin, includedMax) {
        return Math.floor(Math.random() * (includedMax - includedMin + 1)) + includedMin;
    },
    randIE: function (includedMin, excludedMax) {
        return Math.floor(Math.random() * (excludedMax - includedMin)) + includedMin;
    }
};