var expenseSQL = {
  createExpenseData: `insert into ExpenseDataList (expense_id,expense_type,starting_point,through_point,end_point,bought_time,starting_time,end_time,is_round_trip,image_uri,image_base64,charge,content,created_by,created_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  createReportExpense: `insert into ReportExpenseList (expense_id,employee_id,created_by) values (?,?,?)`,
  queryPhoneTokenByEmployeeId: `select phone_token from Users where employee_id in (?)`,
  getEmployeeReportInfo: `select el.employee_id,el.family_name,el.first_name,edl.expense_id,rel.confirmed,rel.created_at,edl.charge,edl.starting_point,edl.end_point,edl.starting_time,edl.end_time,edll.total,edll.expense_sum from EmployeeList el left join (SELECT * from ReportExpenseList where created_at BETWEEN ? and ?)rel on el.EMPLOYEE_ID = rel.employee_id left join (select * from ExpenseDataList ed where expense_type = 1 and end_time = (SELECT MAX(end_time) from ExpenseDataList edd where edd.expense_id = ed.expense_id) GROUP BY expense_id )edl on edl.expense_id = rel.expense_id LEFT JOIN (select expense_id,SUM(charge) as total,count(*) as expense_sum from ExpenseDataList GROUP BY expense_id)edll on edll.expense_id=rel.expense_id `,
  // getEmployeeReportInfo: `select el.employee_id,el.family_name,el.first_name,el.gender,el.sitestation,el.onsite,el.email,el.phone_number,rel.expense_id,rel.confirmed from EmployeeList el join ReportExpenseList rel on el.EMPLOYEE_ID = rel.employee_id WHERE rel.created_at BETWEEN ? and ? `,
  queryByExpenseId: `select * from ExpenseDataList where expense_id =?`,
  unpdateExpenseToConfirmed: `update ReportExpenseList set confirmed = 1 where expense_id = ?`,
  unpdateExpenseToReturned: `update ReportExpenseList set confirmed = -1 where expense_id = ?`,
  deleteExpenseDataByExpenseId: `delete from ExpenseDataList where expense_id = ?`,
  deleteReportExpenseByExpenseId: `delete from ReportExpenseList where expense_id = ?`,
};

module.exports = expenseSQL;
