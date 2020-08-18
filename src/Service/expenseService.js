const pool = require("../../config/database");
const SQL = require("../SQL/expenseSQL");
const moment = require("moment");

const { Expo } = require("expo-server-sdk");
let expo = new Expo();

prefixInteger = (num, length) => {
  return (Array(length).join("0") + num).slice(-length);
};

module.exports = {
  createExpense: (employeeId, tempList, callback) => {
    let expenseId = "E";
    let expenseIdTime = moment().format("YYYYMMDDHHmmss");
    expenseId += employeeId;
    expenseId += expenseIdTime;

    // //提出した記録を　ReportExpenseList　に登録する
    pool.query(
      SQL.createReportExpense,
      [expenseId, employeeId, employeeId],
      (err) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
      }
    );

    //提出したデータを　ExpenseDataList　に登録する
    tempList.map((i) => {
      pool.query(
        SQL.createExpenseData,
        [
          expenseId,
          i.expenseType,
          i.startPoint,
          i.route,
          i.endPoint,
          i.boughtTime,
          i.startDate === "" ? null : i.startDate,
          i.endDate === "" ? null : i.endDate,
          i.isRoundTrip,
          i.pictureUri,
          i.pictureBase64,
          i.price,
          i.content,
          employeeId,
          new Date(),
        ],
        (err) => {
          if (err) {
            console.log(err);
            callback(err);
          }
        }
      );
    });
  },

  queryPhoneTokenByEmployeeId: (employeeIdList, callback) => {
    console.log(employeeIdList);
    pool.query(
      SQL.queryPhoneTokenByEmployeeId,
      [employeeIdList],
      (err, results) => {
        return callback(err, results);
      }
    );
  },

  pushNotifications: (tokenList, expenseData, message, pushBy, callback) => {
    if (tokenList === null || tokenList === undefined) return;
    if (message == "" || message == undefined) {
      message = "経費を提出してください！";
    }
    if (pushBy == "" || pushBy == undefined) {
      pushBy = "総務部";
    }

    // expenseData.delect(image_base64);
    expenseData.map((item) => {
      delete item.image_base64;
    });
    let messages = [];
    for (let pushToken of tokenList) {
      console.log("pushToken", pushToken.phone_token);
      if (!Expo.isExpoPushToken(pushToken.phone_token)) {
        console.error(
          `Push token ${pushToken.phone_token} is not a valid Expo push token`
        );
        continue;
      }
      messages.push({
        to: pushToken.phone_token,
        title: pushBy + "からの通知：",
        sound: "default",
        body: message,
        data: {
          msg: message,
          pushBy: pushBy,
          returnExpenseData: expenseData,
        },
      });
    }
    let chunks = expo.chunkPushNotifications(messages);
    (async () => {
      for (let chunk of chunks) {
        console.log(chunk);
        try {
          await expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
          return callback(error, null);
        }
      }
    })();
    callback(null, 1);
  },

  deleteExpenseDataByExpenseId: (expenseId, callback) => {
    pool.query(
      SQL.deleteExpenseDataByExpenseId,
      [expenseId],
      (err, results) => {
        if (err) {
          callback(err);
        }
        deleteReportExpenseByExpenseId();
      }
    );

    deleteReportExpenseByExpenseId = async () => {
      await pool.query(
        SQL.deleteReportExpenseByExpenseId,
        [expenseId],
        (err, results) => {
          callback(err, results);
        }
      );
    };
  },

  getEmployeeReportInfo: (callback) => {
    let year = moment().format("YYYY");
    let month = moment().month();
    let startTime = moment([year, month, 1]).format("YYYY-MM-DD");
    let endTime = moment([year, month, 10]).format("YYYY-MM-DD");
    console.log(startTime, "から", endTime, "まで", "の情報を請求した");
    pool.query(
      SQL.getEmployeeReportInfo,
      [startTime, endTime],
      (err, results) => {
        return callback(err, results);
      }
    );
  },

  getExpenseData: (expenseId, callback) => {
    pool.query(SQL.queryByExpenseId, [expenseId], (err, results) => {
      return callback(err, results);
    });
  },

  unpdateExpenseToConfirmed: (expenseId, callback) => {
    pool.query(SQL.unpdateExpenseToConfirmed, [expenseId], (err, results) => {
      return callback(err, results);
    });
  },

  unpdateExpenseToReturned: (expenseId, callback) => {
    pool.query(SQL.unpdateExpenseToReturned, [expenseId], (err, results) => {
      return callback(err, results);
    });
  },

  getExpenseDataByIdAndMonth: (expenseId, month, callback) => {
    pool.query(
      SQL.getExpenseDataByIdAndMonth,
      [expenseId, startTime, endTime],
      (err, results) => {
        return callback(err, results);
      }
    );
  },
};
