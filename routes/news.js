const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const SourceConfig = require('../config/SourceConfig');

async function scrapePage(source, url, parser) {
  const page = await getHtmlFromUrl(url);
  const parsedData = parser(source, page) || {};
  if (parsedData) {
    return parsedData;
  } else {
    console.log("Error encountered, unable to retrieve parsed data.")
  }
}

async function getHtmlFromUrl(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url);
  const html = await page.content();
  browser.close();
  return html;
}

router.get('/v1/news', async function(req, res, next) {
  const promises = [];
  for (const config of SourceConfig) {
    const {source, url, parser} = config;
    const data = scrapePage(source, url, parser);
    promises.push(data);
  }
  const result = await Promise.all(promises);
  console.log("API Returns: ", result);
  res.json(result);
});

module.exports = router;
