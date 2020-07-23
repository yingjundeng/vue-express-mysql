var path = require('path')
const express = require('express');
const app = express();
//post解析放在router前面
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//router
const { loginRouter,userRouter } = require('./router.js');
//session and cookie
var session=require("express-session");
var cookieParser = require('cookie-parser');
//log
const pino = require("pino");
const expressPino = require("express-pino-logger");
const logger = pino({ level: process.env.LOG_LEVEL || 'info'});
const expressLogger = expressPino({ logger });
const PORT = process.env.PORT || 3000;
//cor
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//use
app.use(cookieParser('12345'));
app.use(session({
  secret: '12345',
  name: 'nodejs',  //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 60*1000 }, //设置maxAge是60s，即60s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: false,
  /****
   * 强制没有“初始化”的session保存到storage中，没有初始化的session指的是：
  刚被创建没有被修改,如果是要实现登陆的session那么最好设置为false
  而且设置为false还有一个好处，当客户端没有session的情况下并行发送多个请求时。默认是true,但是不建议使用默认值。
   */
}))

app.use(expressLogger)

// 后端api路由
app.use('/', loginRouter);
app.use('/', userRouter);

// 监听端口
app.listen(PORT, () => {
  logger.info('Server running on port %d', PORT);
});
