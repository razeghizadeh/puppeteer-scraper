const puppeteer = require('puppeteer');

async function scrapePrice() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // URL صفحه‌ای که می‌خواهید از آن اطلاعات بگیرید
    const url = 'https://www.javanelec.com/shops/productdetail/7470';
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // استفاده از selector برای استخراج قیمت
    const price = await page.$eval('.product-price', el => el.textContent);
    
    console.log('Price:', price);
    
    await browser.close();
}

scrapePrice();
