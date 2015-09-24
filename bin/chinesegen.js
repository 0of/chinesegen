var rand = require('../lib/rand').randII,
    gen = require('../index');

/**
 * [-c] the total word count of the generated paragraph
 *  if not given, the value will be ranging from 50 to 200 randomly
 * [-p] tolerated periods
 * [-f] output format. support '\uXXXX'
 * [--freq] use frequently used words
 * [--text-only]
 */
var args = require('minimist')(process.argv.slice(2));

var opts = {};
opts.count = args.c || rand(50, 200);

if (args.p) {
    opts.toleratedPeriods = args.p;
}

if (args.f) {
    opts.format = args.f;
}

if (args['freq']) {
    opts.freq = true;
}

var generated = gen(opts);

if (args['text-only']) {
    process.stdout.write(generated.text);
} else {
    process.stdout.write(JSON.stringify(generated));
}