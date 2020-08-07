const { create, getUserByEmail, update, updatePhoneToken } = require("./user.service")
const bcrypt = require("bcrypt")
const { sign } = require("jsonwebtoken");
const pool = require("../../config/database");


module.exports = {
  createUser: (req, res) => {
    const body = req.body;

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection failed"
        })
      }
      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  login: (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
    const phoneToken = body.phoneToken
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email or password"
        })
      }
      const result = bcrypt.compareSync(password, results.password)
      var secret = process.env.SECRET_KEY + results.password
      if (result) {
        updatePhoneToken(email, phoneToken, (err, result) => {
          if (err) {
            console.log(err)
          }
        })
        results.password = undefined
        const jsontoken = sign({ result: results }, secret, {
          expiresIn: "50m"
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          token: jsontoken,
          firsuUser: results.firstUser,
          employee_id: results.employee_id,
        })
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password"
        })
      }
    });
  },
  getUserByEmail: (req, res) => {
    const body = req.body
    const email = escape(body.email)
    console.log("请求过来了")
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Not Found"
        })
      }
      return res.json({ success: 1, data: results })
    });
  },
  updateUser: (req, res) => {
    const body = req.body
    // const email = escape(body.email)
    // const password = escape(body.password)
    // const passwordPast = escape(body.passwordPast)
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email or password"
        })
      }
      const result = bcrypt.compareSync(body.passwordPast, results.password)
      if (result) {
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);

        update(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection failed"
            })
          }
          return res.status(200).json({
            success: 1,
            data: results
          })
        })
      } else {
        return res.json({
          success: 0,
          message: "Password Error"
        })
      }

    })







  }
}