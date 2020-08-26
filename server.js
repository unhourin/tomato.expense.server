require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const userRouter = require("./api/users/user.router");
const expenseRouter = require("./src/Router/expenseRouter");
const stationRouter = require("./src/Router/stationRouter");
const pool = require("./config/database");

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/expense", expenseRouter);
app.use("/station", stationRouter);
app.use("/api/users", userRouter);

error_middleware = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: "测试异常",
    });
  }
};

app.use(error_middleware);

app.listen(process.env.APP_PORT, () => {
  console.log("server start ", process.env.APP_PORT);
});
