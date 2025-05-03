import express from 'express';
import puppeteer from 'puppeteer-core';

const app = express();
const port = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing ?url= parameter');

  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',  // مسیر نصب کرومیوم
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    const content = await page.content();

    await browser.close();
    res.json({ title, html: content });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

app.get('/', (req, res) => {
  res.send('Scraper service is running. Use /scrape?url=https://example.com');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
