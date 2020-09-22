import mysql from 'mysql';
import moment from 'moment';
import chalk from 'chalk';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'flights',
    timezone: "utc ist"
});

export async function airlines() {
    var data = await queryAirlines();
    data.forEach((airline, index) => {        
        console.log(chalk.yellowBright(index + 1  + ") " + airline.AirLineEngName))
    });
}


function queryAirlines() {
    return new Promise((resolve, reject) => {
        var query = `SELECT AirLineEngName FROM airlines
                     ORDER BY AirLineEngName`;
        connection.query(query, (err, val) => {
            if (err) {
                reject(err)
            }
            resolve(val)
        })
    })
}