const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: 'Missing ?id= parameter' });

  const url = `https://javanelec.com/product/${id}/`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
      const title = document.querySelector('h1')?.innerText?.trim() || null;
      const price = document.querySelector('.price')?.innerText?.trim() || null;

      return { title, price };
    });

    await browser.close();
    res.json({
      id,
      url,
      ...data
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
