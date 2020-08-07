const pool = require("../../config/database")


const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")



router.post('/', (req, res) => {
  let employee_id = req.body.employee_id;
  pool.query(`SELECT ExpenseDataList.created_at,ExpenseDataList.bought_time,ExpenseDataList.starting_point,ExpenseDataList.through_point,ExpenseDataList.end_point,ExpenseDataList.starting_time,ExpenseDataList.end_time,ExpenseDataList.is_round_trip,ExpenseDataList.charge,ExpenseDataList.content,ExpenseDataList.expense_type FROM ReportExpenseList,ExpenseDataList WHERE ReportExpenseList.expense_id = ExpenseDataList.expense_id AND ReportExpenseList.employee_id = ${employee_id} ORDER BY ExpenseDataList.created_at DESC;`, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    if (results[0].create_at !== "") {
      res.json(
        results
      )
    } else {
      res.json({
        code: 114,
      })
    }
  });
});

module.exports = router