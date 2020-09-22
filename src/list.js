import Table from 'cli-table3';
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

export async function list(args) {
    try {

        var dateArg = args._[1];
        if (!dateArg) {
            dateArg = moment().format();
        }
        var date = moment(dateArg);
        if (!date.isValid()) {
            throw new Error("Invalid date argument");
        }
        const data = await queryFlightsByDate(moment(dateArg).format('YYYY-MM-DD'));

        const table = new Table({
            head: ['number', 'Flight', 'City', 'Country', 'Departure Time', 'Airline'],
            colWidths: [10, 12, 15, 18, 22, 20],
            wordWrap: true
        });
        data.forEach((flight, index) => {

            table.push([
                index + 1,  
                flight.FlightID,
                flight.Destination,
                flight.CountryEngName,
                flight.DepartureTime,
                flight.AirLineEngName
            ]);
        });
        console.log(table.toString());
        process.exit()
    } catch (error) {
        console.log(`${chalk.redBright("Error: " + error.message)}`)
    }
}

function queryFlightsByDate(date) {
    return new Promise((resolve, reject) => {
        var query = `SELECT *
        FROM flights_dashboard f
        WHERE  DATE(f.DepartureTime) = DATE('${date}')`;
        connection.query(query, (err, val) => {
            if (err) {
                reject(err)
            }
            resolve(val)
        })
    })
}