const mysql = require('mysql2/promise');

// 포트는 DB 서버 포트가 자동 지정됨
const pool = mysql.createPool({
    host: 'localhost',
    database: 'blog',
    user: 'root',
    password: 'root'
});

module.exports = pool;