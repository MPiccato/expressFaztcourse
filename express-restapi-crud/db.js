const mysql = require('mysql2/promise');

async function connectDB() {
    const coneccion = await mysql.createConnection({
        database: 'expressdb',
        username: 'h0zo2cojn0ce7td93fpp',
        host: 'us - east.connect.psdb.cloud',
        password: 'pscale_pw_8KXGk5ImYu1teP6L6pvG9zlxJeukPL67uBkS2cdaiy0',
        ssl:{
            rejectUnauthorized: false
        }
        
    });
const result = await coneccion.query('SELECT 1 + 1 AS Result');
}

module.exports = connectDB;


