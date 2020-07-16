const express = require("express");

const expense = express.Router();

const { Expo } = require("expo-server-sdk");
let expo = new Expo();

expense.get("/list", (req, res) => {
  res.json({
    list: [
      {
        id: 001,
        name: "李思思",
      },
    ],
  });
});

let somePushTokens = ["ExponentPushToken[YO78OpI1KD9VBAaS-QWe-k]"];
expense.get("/pushMessage", (req, res) => {
  let messages = [];
  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      title: "総務部からのメッセージ：",
      sound: "default",
      body: "経費を提出してください",
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  (async () => {
    for (let chunk of chunks) {
      console.log(chunk);
      try {
        await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
  res.json({
    msg: "通知を送りました。",
  });
});

function demo_middleware(err, req, res, next) {
  //1. 异常
  //2. 处理下业务功能，然后转交控制权--next
  //3. 相应请求--结束响应-->当作路由处理函数
}

module.exports = expense;
