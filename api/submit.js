// /api/submit.js
// 表名：住房问题记录
// 字段：问题类型、具体问题、小区名称、经度、纬度、照片、提交时间
const Airtable = require('airtable');

module.exports = async (req, res) => {
  // 1. 设置跨域头，允许前端访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. 处理浏览器预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持 POST 请求' });
  }

  try {
    // 4. 解析前端发送的 JSON 数据（字段名已与 Airtable 列名统一）
    const body = JSON.parse(req.body);
    const { 
      问题类型, 
      具体问题, 
      小区名称, 
      经度, 
      纬度, 
      照片, 
      提交时间 
    } = body;

    // 5. 初始化 Airtable（从 Vercel 环境变量读取密钥）
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_API_KEY 
    }).base(process.env.AIRTABLE_BASE_ID);

    // 6. 向「住房问题记录」表格插入一条新记录
    const records = await base('住房问题记录').create([
      {
        fields: {
          "问题类型": 问题类型,
          "具体问题": 具体问题,
          "小区名称": 小区名称,
          "经度": 经度,
          "纬度": 纬度,
          "照片": 照片,
          "提交时间": 提交时间
        }
      }
    ]);

    // 7. 返回成功响应
    console.log('数据提交成功，记录ID:', records[0].getId());
    res.status(200).json({
      success: true,
      message: '数据已成功保存至「住房问题记录」。'
    });

  } catch (error) {
    // 8. 捕获错误并返回
    console.error('提交数据时出错:', error);
    res.status(500).json({
      success: false,
      message: `服务器处理请求时出错: ${error.message}`
    });
  }
};