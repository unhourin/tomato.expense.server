const { getUserByEmail } = require("../../api/users/user.service");
const service = require("../Service/expenseService");
var multer = require("multer");

module.exports = {
  createExpense: (req, res, next) => {
    const tempList = req.body;
    const email = req.get("email");
    getUserByEmail(email, (err, results) => {
      if (err) {
        next(err);
      }
      service.createExpense(results.employee_id, tempList, (err, results) => {
        if (err) {
          next(err);
        }
        res.json(results);
      });
    });
  },

  pushNotifications: (req, res, next) => {
    const { employeeIdList, message, pushBy, expense_id } = req.body;
    console.log(expense_id);
    let tmpA = employeeIdList.split(",");
    let tmpB = [];
    tmpA.forEach((element) => {
      tmpB.push(parseInt(element, 10));
    });

    service.queryPhoneTokenByEmployeeId(tmpB, (err, results) => {
      if (err) {
        next(err);
      }
      checkIsReturn(results);
    });

    checkIsReturn = (tokenList) => {
      service.getExpenseData(expense_id, (err, results) => {
        if (err) {
          next(err);
        }
        getTokenList(tokenList, results);
      });
    };

    getTokenList = (tokenList, expenseData) => {
      service.pushNotifications(
        tokenList,
        expenseData,
        message,
        pushBy,
        (err, results) => {
          if (err) {
            next(err);
          }
          // return;
          unpdateExpenseToReturned();
        }
      );
    };

    unpdateExpenseToReturned = () => {
      service.unpdateExpenseToReturned(expense_id, (err, results) => {
        if (err) {
          next(err);
        }
        res.json({
          success: 1,
        });
      });
    };
  },

  getEmployeeReportInfo: (req, res, next) => {
    service.getEmployeeReportInfo((err, results) => {
      if (err) next(err);
      res.json(results);
    });
  },

  getExpenseData: (req, res, next) => {
    let { expenseId } = req.params;
    service.getExpenseData(expenseId, (err, results) => {
      if (err) next(err);
      res.json(results);
    });
  },

  unpdateExpenseToConfirmed: (req, res, next) => {
    let { expenseId } = req.params;
    service.unpdateExpenseToConfirmed(expenseId, (err, results) => {
      if (err) {
        next(err);
      }
      res.json({
        message: "この請求を承認しました",
      });
    });
  },

  getExpenseDataByIdAndMonth: (req, res, next) => {
    let { expenseId, month } = req.params;
    service.getExpenseDataByIdAndMonth(expenseId, month, (err, results) => {
      if (err) {
        next(err);
      }
      res.json(results);
    });
  },
};
