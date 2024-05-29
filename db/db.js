// db/db.js
const sql = require('mssql');

// SQL Server connection configuration
const config = {
    user: 'vipul',
    password: 'Vipul@1999',
    server: 'localhost', // Replace with your server name or IP
    database: 'customer_db',
    port:1433,
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: true // For local development
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise
};
