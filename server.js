require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const formidableMiddleware = require("express-formidable");

const userRouter = require("./api/users/user.router");
const historyRouter = require("./api/history/historyRouter");
const expenseRouter = require("./src/Router/expenseRouter");
const stationRouter = require("./src/Router/stationRouter");
const { addListener } = require("nodemon");
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
app.use("/api/history", historyRouter);

app.post("/expenseiddd", (req, res) => {
  console.log("ユーザーID：" + req.body.employee_id);
  //ユーザーIDをポストする
  let employee_id = req.body.employee_id;
  //sql文でポストされたユーザーIDを利用し、作成順でDBから支払いIDを特定し、支払いテーブルから情報を取り出す
  pool.query(
    `SELECT ExpenseDataList.starting_point, ExpenseDataList.end_point, ExpenseDataList.charge FROM ReportExpenseList  INNER JOIN ExpenseDataList
    ON ReportExpenseList.expense_id = ExpenseDataList.expense_id WHERE expense_type = 1 AND employee_id=${employee_id}
    ORDER BY ReportExpenseList.created_at DESC LIMIT 1`,
    function (error, results, fields) {
      console.log(results);
      if (error) {
        //問い合わせが出来なかった場合114のエラーコードを送信する
        console.log("DBからデータを取り出せなかった。");
        res.json({
          code: 114,
          data: null,
        });
      } else {
        //問い合わせが出来た場合115コードともらった情報を送信する
        console.log("データを取り出した。");
        res.json({
          code: 115,
          data: results,
        });
      }
    }
  );
});

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
