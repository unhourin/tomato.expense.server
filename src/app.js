const express = require("express");

//这是一个express实例
const app = express();

//expo
const { Expo } = require("expo-server-sdk");
let expo = new Expo();
const expressRouter = require("./Expense");
const userRouter = require("./User");

app.use("/expense", expressRouter);
app.use("/user", userRouter);

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

log_middleware = (req, res, next) => {
  console.log("請求が来た");
  next();
};

// //s
// app.post("/phoneToken", (req, res) => {
//   let { token } = req.query();
// });

// let somePushTokens = ["ExponentPushToken[YO78OpI1KD9VBAaS-QWe-k]"];
// app.get("/pushMessage", (req, res) => {
//   let messages = [];
//   for (let pushToken of somePushTokens) {
//     if (!Expo.isExpoPushToken(pushToken)) {
//       console.error(`Push token ${pushToken} is not a valid Expo push token`);
//       continue;
//     }
//     messages.push({
//       to: pushToken,
//       title: "総務部からのメッセージ：",
//       sound: "default",
//       body: "経費を提出してください",
//     });
//   }
//   let chunks = expo.chunkPushNotifications(messages);
//   (async () => {
//     for (let chunk of chunks) {
//       console.log(chunk);
//       try {
//         await expo.sendPushNotificationsAsync(chunk);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   })();
//   res.json({
//     msg: "通知を送りました。",
//   });
// });

// function demo_middleware(err, req, res, next) {
//   //1. 异常
//   //2. 处理下业务功能，然后转交控制权--next
//   //3. 相应请求--结束响应-->当作路由处理函数
// }

error_middleware = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: "测试异常",
    });
  }
};

app.use(error_middleware);

app.listen(3001, () => {});
