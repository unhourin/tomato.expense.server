const express = require("express");
const expenseRouter = express.Router();
const controller = require("../Controller/enpenseController");

expenseRouter.put("/", (req, res, next) => {
  console.log("经费を受け取りました。");
  controller.createExpense(req, res, next);
});

expenseRouter.post("/pushMessage", (req, res, next) => {
  console.log("通知を送ります。");
  controller.pushNotifications(req, res, next);
});

expenseRouter.get("/", (req, res, next) => {
  console.log("経費提出状況を請求しました。");
  controller.getEmployeeReportInfo(req, res, next);
});

expenseRouter.get("/:expenseId", (req, res, next) => {
  console.log("経費の詳細を請求しました。");
  controller.getExpenseData(req, res, next);
});

expenseRouter.get("/expenseConfirm/:expenseId", (req, res, next) => {
  console.log("経費の確認できましたしました。");
  controller.unpdateExpenseConfirm(req, res, next);
});

expenseRouter.get("/:employeeId/:month", (req, res, next) => {
  console.log("社員番号と月にあっている経費履歴を抽出。");
  controller.getExpenseDataByIdAndMonth(req, res, next);
});

module.exports = expenseRouter;
