import puppeteer from "puppeteer"
import path from 'path';

async function captureScreenshot(url, outputFilePath) {
  // .launch 方法启动一个浏览器实例，然后打开一个新的页面
  const browser = await puppeteer.launch({ headless: true });
  printColor("开始启动.......", 32);

  const page = await browser.newPage();
  printColor("等待页面加载完毕.......", 32);


  await page.goto(url, { waitUntil: 'networkidle0' }); // 等待页面加载完成  // 确保页面加载完成后再进行下一步操作。

  printColor("获取网站完整页面中.......", 32);


  // 获取页面的整个高度和宽度
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  // const bodyWidth = await page.evaluate(() => document.body.scrollWidth);

  // 设置视口大小和截图尺寸
  await page.setViewport({ width: 1366, height: bodyHeight });

  // import.meta.url 是 ES 模块中的一个特殊变量，用于获取当前模块的 URL。puppeteer-explore/puppeteer-app/short/index.mjs
  const currentFilePath = new URL(import.meta.url).pathname;
  // path.join() 方法用于拼接路径片段，并返回标准化后的路径。
  // path.dirname(currentFilePath) 的结果是：// puppeteer-explore/puppeteer-app/short
  // outputFilePath的结果是：screenshot/baidu.com.png
  const outPath = path.join(path.dirname(currentFilePath), outputFilePath);
  //  outPath的结果就是// puppeteer-explore/puppeteer-app/short/screenshot/baidu.com.png
  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close(); // 关闭浏览器
}
// const url = 'https://isux.tencent.com';
const url = 'https://baidu.com';


const outPath = 'screenshot/' + getMainDomain(url) + '.png'; // 不包含short目录

// const outPath = path.join(path.dirname(new URL(import.meta.url).pathname), outputFilePath);

captureScreenshot(url, outPath)
  .then(() => console.log('Screenshot captured', outPath))
  .catch(error => console.error(error));



function getMainDomain(url) {

  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname;
  // 'isux.tencent.com'
  return hostname;
}


function printColor(text, color) {
  const colorCode = `\u001b[${color}m`;
  const textCode = `${text}\u001b[0m`;
  process.stdout.write(`${colorCode}${textCode}\n`);
}