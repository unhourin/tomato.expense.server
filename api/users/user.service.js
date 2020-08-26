const pool = require("../../config/database")

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into Users(email,password,firstUser)
              values(?,?,?)`,
      [
        data.email,
        data.password,
        data.firstUser
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }
        return callback(null, results)
      }
    )
  },
  getUsers: (email, callback) => {
    pool.query(`select * from users where email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callback(error)
        }
        return callback(null, results[0])
      }
    )
  },
  getUserByEmail: (email, callback) => {
    pool.query(`SELECT EmployeeList.employee_id,EmployeeList.family_name,EmployeeList.first_name,EmployeeList.id_photo,Users.employee_id,Users.email,Users.firstUser,Users.password
    FROM EmployeeList, Users
    WHERE EmployeeList.employee_id = Users.employee_id AND Users.email = ?`, [email], (error, results, fields) => {
      if (error) {
        return callback(error)
      }
      return callback(null, results[0])
    })
  },
  update: (data, callback) => {
    pool.query(
      `update Users set password = ?, firstUser = 0 where email = ?`,
      [
        data.password,
        data.email
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }
        return callback(null, results)
      }
    )
  },

  updatePhoneToken: (email, phoneToken, callback) => {
    console.log(email, phoneToken)
    pool.query(
      `update Users set phone_token=? where email =?`,
      [phoneToken, email], (err, result) => {
        callback(err, result)
      }
    )
  }
}