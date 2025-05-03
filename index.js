const puppeteer = require('puppeteer');

async function scrapePrice() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium',  // مسیر نصب Chromium در Render
  });
  const page = await browser.newPage();
  await page.goto('https://www.javanelec.com/shops/productdetail/7470', { waitUntil: 'domcontentloaded' });

  // فرض بر این است که قیمت در یک عنصر خاص موجود است. شما باید این بخش را با انتخاب درست مطابق سایت خود اصلاح کنید
  const price = await page.$eval('.price-class', element => element.textContent); // کلاس مناسب برای قیمت را قرار دهید

  console.log('Price:', price);

  await browser.close();
}

scrapePrice().catch(console.error);
