const express = require("express");
const user = express.Router();
const bodyParser = require("body-parser");

user.use(express.json());
user.use(express.urlencoded());
user.use(bodyParser.urlencoded({ extended: true }));

const userModels = require("../models");

user.post("/login", async (req, res) => {
  let { username, password, verification_token } = req.body;
  let isSuccess = await userModels.User.count({
    where: {
      username: username,
      password: password,
    },
  });
  if (isSuccess == 1) {
    await userModels.User.update(
      { verification_token: verification_token },
      {
        where: { username: username, password: password },
      }
    );
    res.json({
      code: 101,
      message: "ログインできました！",
    });
  } else {
    res.json({
      code: 102,
      message: "ユーザ情報と一致していません！",
    });
  }
});

user.put("/register", async (req, res) => {
  let {
    username,
    password,
    e_mail,
    birth,
    employee_id,
    verification_token,
    createdBy,
  } = req.body;
  await userModels.User.create({
    username,
    password,
    e_mail,
    birth,
    employee_id,
    verification_token,
    createdBy,
  });
  res.json({
    message: "登録できました！",
  });
});

module.exports = user;
