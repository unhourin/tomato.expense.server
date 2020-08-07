const express = require('express')
const stationRouter = express.Router()
const stationController = require("../Controller/stationController")

stationRouter.post("/getStationAndLine", (req, res, next) => {
    console.log("请求车站信息")
    stationController.getStationAndLine(req, res, next)
})

module.exports = stationRouter