const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

async function scrapeCnn(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="homepage1-zone-1"]/div[2]/div/div[1]/ul/li[1]/article/a/h2');
  const txt = await el.getProperty('textContent');
  const rawTxt = await txt.jsonValue();

  const [el2] = await page.$x('//*[@id="homepage1-zone-1"]/div[2]/div/div[1]/ul/li[1]/article/div/div[1]/a/img');
  const src = await el2.getProperty('src');
  const srcTxt = await src.jsonValue();

  const [el3] = await page.$x('//*[@id="homepage1-zone-1"]/div[2]/div/div[1]/ul/li[1]/article/a');
  const link = await el3.getProperty('href');
  const linkTxt = await link.jsonValue();

  browser.close();

  return ({outlet: 'cnn', headline: rawTxt, img: srcTxt, link: linkTxt});
}

async function scrapeFox(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div[1]/main/div/div/div[1]/div/article/div[2]/header/h2/a');
  const txt = await el.getProperty('textContent');
  const rawTxt = await txt.jsonValue();

  const [el3] = await page.$x('//*[@id="wrapper"]/div[2]/div[2]/div[1]/main/div/div/div[1]/div/article/div[2]/header/h2/a');
  const link = await el3.getProperty('href');
  const linkTxt = await link.jsonValue();

  browser.close();

  return ({outlet: 'fox', headline: rawTxt, link: linkTxt});
}

router.get('/v1/news', async function(req, res, next) {

  const fox = await scrapeFox('https://www.foxnews.com');
  const cnn = await scrapeCnn('https://www.cnn.com');

  res.json([fox, cnn]);
});

module.exports = router;
