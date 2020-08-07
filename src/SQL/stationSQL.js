var stationSQL = {
    queryStationName: `select s.station_cd,s.station_name,l.line_name from StationData s join LineData l on s.line_cd=l.line_cd where station_name like ?`
}

module.exports = stationSQL