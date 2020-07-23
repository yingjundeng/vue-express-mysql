const mysql = require('mysql');
const dbConfig = require('../db');

const pool = mysql.createPool({
  connectionLimit :20,
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports={
  pool
}