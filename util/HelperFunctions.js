const puppeteer = require('puppeteer');

function HelperFunctions() {
    // initialization n' stuff
}

HelperFunctions.prototype.formatScrapedData = function (source, headline = "", altHeadline = "", image = "", video = {}, link = "") {
    return {
        source: source,
        headline: headline,
        altHeadline: altHeadline,
        image: image,
        video: video,
        link: link
    }
};

module.exports = HelperFunctions;