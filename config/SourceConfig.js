const Parsers = require('../util/SourceParsers');

const SourceConfig = [{
        source: "cnn",
        url: "https://cnn.com",
        parser: new Parsers().cnn
    },
    {
        source: "foxnews",
        url: "https://foxnews.com",
        parser: new Parsers().foxnews
}];
module.exports = SourceConfig;