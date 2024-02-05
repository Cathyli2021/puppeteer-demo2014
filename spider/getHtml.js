const puppeteer = require('puppeteer');  // puppeteer一个自动化测试工具，用于控制浏览器并执行各种操作
const cheerio = require('cheerio'); // cheerio 是一个非常实用的工具，特别适合在 Node.js 环境下对 HTML 文档进行解析和操作。

(async () => {
  const browser = await puppeteer.launch();  // 启动浏览器
  const page = await browser.newPage();  // 创建新的页面实例


  // 导航到目标网页
  await page.goto('https://c12.onepy.top/proof/?enc=b46GoOCK7A3i6XvotpZKKrblTOZ5gxIctavsXULG67uXnFZvYdx5Nrq5u46xfOH13LrPazJKRqTmp7EUU9qUUg==#/index');

  // 等待网页加载完成
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // 获取完整渲染后的 HTML
  const html = await page.content();  

  // 使用 Cheerio 解析 HTML, 创建一个类似于 jQuery 的可操作 DOM 对象 $。
  const $ = cheerio.load(html);

  //  查找所有类名为 .brazil 的元素，并获取其文本内容
  const brazilText = $('.brazil').text();
  console.log(brazilText);

  await browser.close();
})();

// 使用 Puppeteer（一个自动化测试工具，用于控制浏览器并执行各种操作）打开一个网页，并使用 Cheerio 解析该网页的 HTML 内容
// 代码的功能是打开指定页面，等待页面加载完成后，使用 Cheerio 解析页面的HTML内容，并提取出类名为 .brazil 的元素的文本内容，
// 最后将其打印到控制台。这样可以方便地从网页中提取出需要的信息进行进一步处理。