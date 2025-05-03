const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.javanelec.com/shops/productdetail/7470", {
    waitUntil: "networkidle2",
  });
  const content = await page.content();
  console.log(content);
  await browser.close();
})();
