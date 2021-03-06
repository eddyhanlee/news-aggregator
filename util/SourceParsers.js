const cheerio = require('cheerio');
const HelperFunctions = require('./HelperFunctions');

function Parsers() {
    // TODO: initialize helperFunctions to prevent repeat
}

/*
  __ _ _  _ _
 / _| ' \| ' \
 \__|_||_|_||_|

*/
Parsers.prototype.cnn = function(source, page) {
    const helperFunctions = new HelperFunctions();
    const $ = cheerio.load(page);
    const headline = $('.screaming-banner-text').text();
    const altHeadline = $('.cd--has-banner .cd__headline-text').first().text();
    const image = $('.media__image').attr('src');
    const poster = $('.cd--has-banner .mp4-animations').attr('poster');
    const video = $('.cd--has-banner video source').attr('src');
    const link = $('.media').find('a').attr('href');
    return helperFunctions.formatScrapedData(source, headline, altHeadline, image, {
        poster: poster,
        video: video
    }, link);
};

/*
   __
  / _|_____ ___ _  _____ __ _____
 |  _/ _ \ \ / ' \/ -_) V  V (_-<
 |_| \___/_\_\_||_\___|\_/\_//__/

*/
Parsers.prototype.foxnews = function(source, page) {
    const helperFunctions = new HelperFunctions();
    const $ = cheerio.load(page);
    const headline = $('.collection-spotlight').first().find('h2.title a').text();
    const altHeadline = $('.kicker-text').first().text();
    const image = $('article.story-1 picture').find('img').first().attr('src');
    const link = $('article.story-1').find('a').attr('href');
    return helperFunctions.formatScrapedData(source, headline, altHeadline, image, {
        poster: null,
        video: null
    }, link);
};

/*
                _           _
  _  _ ___ __ _| |_ ___  __| |__ _ _  _
 | || (_-</ _` |  _/ _ \/ _` / _` | || |
  \_,_/__/\__,_|\__\___/\__,_\__,_|\_, |
                                   |__/
*/
Parsers.prototype.usatoday = function(source, page) {
    const helperFunctions = new HelperFunctions();
    const $ = cheerio.load(page);
    const headline = $('.gnt_m_he span').text();
    const altHeadline = $('.gtn_m_he').attr('data-c-br') || "";
    const image = $('.gnt_m_he_i').attr('src');
    const link = $('.gnt_m_he').attr('href');

    return helperFunctions.formatScrapedData(source, headline, altHeadline, image, {
        poster: null,
        video: null
    }, link);
};

module.exports = Parsers;