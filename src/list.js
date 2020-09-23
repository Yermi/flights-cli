import Table from 'cli-table3';
import moment from 'moment';
import chalk from 'chalk';
import {queryDb} from './services/dbService';

export async function list(args) {
    try {

        var dateArg = args.date;
        if (!dateArg) {
            dateArg = moment().format();
        }
        var date = moment(dateArg);
        if (!date.isValid()) {
            throw new Error("Invalid date argument");
        }
        var parsedDate = moment(dateArg).format('YYYY-MM-DD');
        const data = await queryFlightsByDate(parsedDate, args.airline, args.dest);

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

function queryFlightsByDate(date, airline, destination) {
    return new Promise(async (resolve, reject) => {
        var q = `
        SELECT f.FlightID, f.Source, f.Destination, co.CountryEngName, f.DepartureTime, f.DayOfWeek, a.AirLineEngName FROM flights f
        INNER JOIN airlines a ON a.AirLineCompanyID = f.IataAirline
        INNER JOIN cities c ON f.Destination = c.CityID
        INNER JOIN countries co ON c.CountryID = co.CountryID
        WHERE  DATE(f.DepartureTime) = DATE('${date}')
        `
        if (airline) {
            q += `AND a.AirLineEngName LIKE '%${airline}%'`
        }

        if (destination) {
            q += `AND (f.Destination LIKE '%${destination}%' OR co.CountryEngName LIKE '%${destination}%')`
        }

        var query = `SELECT *
        FROM flights_dashboard f
        WHERE  DATE(f.DepartureTime) = DATE('${date}')`;
        try {
         var results = await queryDb(q);
         resolve(results)
        } catch (error) {
            reject(error);
        }
    })
}