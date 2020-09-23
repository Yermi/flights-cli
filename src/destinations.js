import Table from 'cli-table3';
import {queryDb} from './services/dbService';

export async function destinations() {
    var data = await queryDestintions();

    const table = new Table({
        head: ['number', 'city', 'country'],
        colWidths: [10, 15, 15],
        wordWrap: true
    });

    data.forEach((destination, index) => {
        table.push([index + 1, destination.CityEngName, destination.CountryID])
    });

    console.log(table.toString());
        process.exit()
}


function queryDestintions() {
    return new Promise(async (resolve, reject) => {
        try {        
            var query = `SELECT CityEngName, CountryID FROM cities
                         ORDER BY CityEngName`;
    
            var results = await queryDb(query)
            resolve(results)
        } catch (error) {
            reject(error);
        }
    })
}