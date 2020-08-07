const { createUser, getUserByEmail, login, updateUser } = require("./user.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/", createUser)
router.post("/check", checkToken, getUserByEmail)
router.post("/login", login)
router.post("/update", checkToken, updateUser)

module.exports = router