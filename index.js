const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();

    await browser.close();
    res.send(`Title is: ${title}`);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
