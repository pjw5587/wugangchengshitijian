// 文件路径：/api/submit.js
// 作用：接收前端数据，安全地存入Airtable数据库
const Airtable = require('airtable');

module.exports = async (req, res) => {
  // 1. 设置响应头，允许前端跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. 处理浏览器的预检（OPTIONS）请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持 POST 请求' });
  }

  try {
    // 4. 解析前端发送的 JSON 数据
    const body = JSON.parse(req.body);
    const { 维度, 问题, 位置, 经度, 纬度, 照片, 提交时间 } = body;

    // 5. 初始化 Airtable（从Vercel环境变量读取密钥，安全！）
    // 关键：请确保你在Vercel中已配置 AIRTABLE_API_KEY 和 AIRTABLE_BASE_ID
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_API_KEY 
    }).base(process.env.AIRTABLE_BASE_ID);

    // 6. 向 Airtable 的“Table 1”插入记录（请确保Airtable表名和字段名一致）
    const records = await base('Table 1').create([
      {
        fields: {
          "维度": 维度,
          "问题": 问题,
          "位置": 位置,
          "经度": 经度,
          "纬度": 纬度,
          "照片": 照片, // 存储Base64字符串
          "提交时间": 提交时间
        }
      }
    ]);

    // 7. 返回成功响应
    console.log('数据提交成功，记录ID:', records[0].getId());
    res.status(200).json({
      success: true,
      message: '数据已成功保存至数据库。'
    });

  } catch (error) {
    // 8. 捕获并返回任何错误
    console.error('提交数据时出错:', error);
    res.status(500).json({
      success: false,
      message: `服务器处理请求时出错: ${error.message}`
    });
  }
};