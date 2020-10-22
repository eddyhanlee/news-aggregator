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
    },
    {
        source: "usatoday",
        url: "https://usatoday.com",
        parser: new Parsers().usatoday
    }
];
module.exports = SourceConfig;