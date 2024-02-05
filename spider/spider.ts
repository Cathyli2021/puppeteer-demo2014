const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://tools.hopetrip.com.hk/web/swiftcode/country-42-zh-CN-3.html';

axios.get(url)
  .then(response => {
    const html = response.data;
    console.log('html', html)
    const $ = cheerio.load(html);  // 将 HTML 文本加载到 cheerio 中，创建一个类似于 jQuery 的可操作 DOM 对象 $。
    const bankNames = [];
    // 遍历 HTML 中的表格行（<tr> 元素）
    $('table tbody tr').each(function() {
      const name = $(this).find('td').eq(1).text().trim();
      bankNames.push(name);
    });
    console.log(bankNames);
    
  })
  .catch(error => {
    console.log(error);
  });



  // 发送一个 HTTP GET 请求到指定的 URL，然后使用 cheerio 库解析响应的 HTML 内容，提取出指定表格中的银行名称，并打印输出