const express = require("express");
const expenseRouter = express.Router();
const controller = require("../Controller/enpenseController");

//スマホ
expenseRouter.put("/app/submit/:employeeId", (req, res, next) => {
  console.log("经费を受け取りました。");
  controller.createExpense(req, res, next);
});

expenseRouter.post("/app/history/:employeeId/:year", (req, res, next) => {
  console.log("社員履歴請求");
  controller.getEmployeeHistory(req, res, next);
});

expenseRouter.get("/app/pastCommuterPass/:employeeId", (req, res, next) => {
  console.log("直近の定期券を三件請求した");
  controller.getPastSixMonthCommuterPass(req, res, next);
});

//Web
// expenseRouter.post("/site-pushMessage", (req, res, next) => {
//   console.log("通知を送ります。");
//   controller.pushNotifications(req, res, next);
// });

// expenseRouter.get("/site-submission", (req, res, next) => {
//   console.log("経費提出状況を請求しました。");
//   controller.getEmployeeReportInfo(req, res, next);
// });

// expenseRouter.get("/:expenseId", (req, res, next) => {
//   console.log("経費の詳細を請求しました。");
//   controller.getExpenseData(req, res, next);
// });

// expenseRouter.get("/expenseConfirm/:expenseId", (req, res, next) => {
//   console.log("経費の確認できましたしました。");
//   controller.unpdateExpenseToConfirmed(req, res, next);
// });

// expenseRouter.get("/:employeeId/:month", (req, res, next) => {
//   console.log("社員番号と月にあっている経費履歴を抽出。");
//   controller.getExpenseDataByIdAndMonth(req, res, next);
// });

module.exports = expenseRouter;
