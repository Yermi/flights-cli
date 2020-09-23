import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'remotemysql.com',
    port: 3306,
    user: 'RzxZtlL3hT',
    password: '*********',
    database: 'RzxZtlL3hT',
    timezone: "utc ist"
});

export async function queryDb (query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, val) => {
            if (err) {
                reject(err)
            }
            resolve(val)
        })
    })
}