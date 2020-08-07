const service = require('../Service/stationService')
module.exports = {
    getStationAndLine: ((req, res, next) => {
        let { station_name } = req.query
        console.log(station_name)
        service.queryStationName(station_name, (err, results) => {
            if (err) {
                next(err)
            }
            res.json(results)
        })
    }),
}