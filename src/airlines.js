import { queryDb } from './services/dbService';
import chalk from 'chalk';
import Table from 'cli-table3';


export async function airlines() {
    var data = await queryAirlines();

    const table = new Table({
        head: ['number', 'airline'],
        colWidths: [10, 20],
        wordWrap: true
    });

    data.forEach((airline, index) => {
        table.push([index + 1, airline.AirLineEngName])
    });

    console.log(table.toString());
    process.exit()
}


function queryAirlines() {
    return new Promise(async (resolve, reject) => {
        try {
            var query = `SELECT AirLineEngName FROM airlines
            ORDER BY AirLineEngName`;
            var results = await queryDb(query);
            resolve(results)
        } catch (error) {
            reject(error)
        }
    })
}