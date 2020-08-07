const { verify } = require("jsonwebtoken")
const { getUserByEmail } = require("../api/users/user.service")
module.exports = {
  checkToken: (req, res, next) => {
    console.log("检查token")
    let token = req.get("authorization")
    if (token) {
      token = token.slice(7)
      getUserByEmail(req.get("email"), (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Invalid email"
          })
        } else {
          var secret = process.env.SECRET_KEY + results.password
          verify(token, secret, (err, decoded) => {
            if (err) {
              res.json({
                success: 0,
                message: "Invalid token"
              })
            } else {
              next()
            }
          })
        }

      })
    } else {
      res.json({
        success: 0,
        message: "Access denied! Token failed"
      })
    }
  }
}
