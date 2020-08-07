const pool = require('../../config/database')
const SQL = require('../SQL/stationSQL')

module.exports = {
    queryStationName: (async (stationName, callback) => {
        stationName = "%" + stationName + "%"
        await pool.query(SQL.queryStationName, [stationName], (err, results) => {
            return callback(err, results)
        })
    })
}
