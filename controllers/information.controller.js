const { Validator } = require("node-input-validator");
const utils = require("../utils/test");
const mongoose = require("mongoose");

const userInfor = require("../models/user.model");
const infor = require("../models/information.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.create = async (req, res) => {
  const v = new Validator(req.body, {
    uniqueId: "required",
    ipAddress: "required",
    macAddress: "required",
    deviceName: "required",
    brand: "required",
    buildId: "required",
    deviceType: "required",
    ssid: "required",
    status: "required",
    systemversion: "required",
    date: "required",
    time: "required",
    longitude: "required",
    latitude: "required",
    userId: "required",
  });
  console.log(req.body);
  const matched = await v.check();
  if (!matched) {
    // return console.log("hello nhan le ");
    return res.status(422).send({
      status: false,
      notification:
        "Your connection is unstable. Please exit the app and try again later.",
    });
    // return res.status(422).send(v.errors);
  }
  console.log(" user ", req.body);
  let long = req.body.longitude;
  let lati = req.body.latitude;

  try {
    const idusser = req.body.userId.match(/^[0-9a-fA-F]{24}$/);
    console.log("iduser", idusser);
    if (idusser) {
      const user = await userInfor.findOne({ _id: req.body.userId });
      // console.log(" user logiffffn:", user);

      const uniID = user.uniqueId;
      const ssid = user.ssid;
      console.log("ssid", ssid);
      const maccAdd = user.macAddress;

      console.log(" uniqueId login:", uniID);
      console.log(" macAddress login:", maccAdd);

      const idUser = user._id.toString();
      console.log(" _id login:", idUser);
      // console.log("user nhập xuống:", userId);
      // const idDevices = await userInfor.findOne({ uniqueId: req.body.uniqueId });
      // console.log("id ở đăng ký", idDevices.uniqueId);
      // const testid = idDevices.uniqueId
      if (ssid === req.body.ssid) {
        if (
          idUser === req.body.userId &&
          uniID === req.body.uniqueId &&
          req.body.macAddress === maccAdd
        ) {
          const locationData = { long, lati };
          const distance = utils.getDistanceFromLatLonInKm(locationData);
          console.log("vị trí", distance);
          if (distance <= 50) {
            //Nếu khoảng cách bé hơn hoặc bằng 500 -> chèn thông tin vào mongo
            //Tạo ra thông tin cần đưa vào mongo
            const newInfor = new infor({
              uniqueId: req.body.uniqueId,
              ipAddress: req.body.ipAddress,
              macAddress: req.body.macAddress,
              deviceName: req.body.deviceName,
              brand: req.body.brand,
              buildId: req.body.buildId,
              deviceType: req.body.deviceType,
              ssid: req.body.ssid,
              status: req.body.status,
              systemversion: req.body.systemversion,
              date: req.body.date,
              time: req.body.time,
              longitude: req.body.unilongitudequeId,
              latitude: req.body.latitude,
              userId: req.body.userId,
              created_by: req.body.userId,
            });
            // const created = req.user._id;

            // console.log("created", created);
            let saveData = await newInfor.save();
            // console.log("hafkjashdfasdfasdf", saveData._id);

            // let query = [
            //   {
            //     $lookup: {
            //       from: "users",
            //       localField: "created_by",
            //       foreignField: "_id",
            //       as: "creator",
            //     },
            //   },
            //   { $unwind: "$creator" },

            //   {
            //     $match: {
            //       _id: mongoose.Types.ObjectId(saveData._id),
            //     },
            //   },
            //   {
            //     $project: {
            //       _id: 1,
            //       uniqueId: 1,
            //       ipAddress: 1,
            //       macAddress: 1,
            //       deviceName: 1,
            //       brand: 1,
            //       buildId: 1,
            //       deviceType: 1,
            //       ssid: 1,
            //       status: 1,
            //       systemversion: 1,
            //       date: 1,
            //       time: 1,
            //       longitude: 1,
            //       latitude: 1,
            //       userId: 1,
            //       "creator.course": 1,
            //       "creator.username": 1,
            //       "creator.macAddress": 1,
            //       "creator.macAddress": 1,
            //       //   comments_count: { $size: { $ifNull: ["$blog_comments", []] } },
            //       //   likes_count: { $size: { $ifNull: ["$blog_likes", []] } },
            //     },
            //   },
            // ];
            // let infomationUser = await userInfor.aggregate(query);
            // console.log("infor", infomationUser);
            //Nếu save data có giá trị -> insert thành công
            if (saveData) {
              return res.json({
                status: true,
                // notification: "Thao Tác Thành Cfasdfasdông",
                data: saveData,
              });
            }
            // console.log("lưu thành công", saveData);
            // //Thành công
            // res.status(201).send({
            //   message: "Blog created successfully",
            //   data: userInfor.hydrate(infomationUser[0]),
            // });
          } else {
            return res.json({
              status: false,
              notifica: "You Are Outside the Timekeeping Zone",
            });
          }
        } else {
          res.json({
            status: false,
            notifica: "You are using the wrong device",
          });
        }
      } else {
        res.json({
          status: false,
          notifica:
            "The WI-FI you are using is not valid. Please connect again",
        });
      }
    } else {
      res.json({
        status: false,
        notifica: "You are using the wrong account for this device",
      });
    }

    // let blogData = await newInfor.save();
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};

exports.checkout = async (req, res) => {
  const v = new Validator(req.body, {
    userId: "required",
    date: "required",
  });
  console.log(req.body);
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  const { userId, date } = req.body;
  console.log("body checkoout", req.body);
  console.log("userid check out:", userId);
  console.log("date check out:", date);

  const user = await infor
    .findOne({ userId, date, status: "1" })
    .then((respnse) => {
      console.log("check out", respnse);
      if (respnse) {
        return res.json({
          status: 1,
          mess: "Success",
          data: {
            checkOut: true,
          },
        });
      }
      if (respnse === null) {
        return res.json({
          status: 1,
          mess: "fail",
          data: {
            checkOut: false,
          },
        });
      }
    });
};
exports.checkin = async (req, res) => {
  const { userId, date } = req.body;
  console.log("userid check in:", userId);
  console.log("date check in:", date);
  const checkin = await infor
    .findOne({ userId, date, status: "0" })
    .then((respnse) => {
      console.log("check in", respnse);

      if (respnse) {
        return res.json({
          status: 1,
          mess: "Success",
          data: {
            check: true,
          },
        });
      }
      if (respnse === null) {
        return res.json({
          status: 1,
          mess: "Fail",
          data: {
            check: false,
          },
        });
      }
    });
};
exports.getTime = async (req, res) => {
  const v = new Validator(req.body, {
    userId: "required",
  });
  console.log(req.body);
  const matched = await v.check();
  if (!matched) {
    // return console.log("hello nhan le ");
    return res.status(422).send(v.errors);
  }
  try {
    console.log(req.body.userId);
    const timeCheck = await infor.find({
      userId: req.body.userId,
    });
    console.log(timeCheck);
    let obj = {};
    timeCheck.map((item) => {
      obj = {
        ...obj,
        [item.date]: [...(obj[item.date] || []), item],
      };
    });
    if (obj)
      return res.json({
        message: "hello",
        data: obj,
      });
  } catch (error) {
    console.log(error);
  }
};

exports.getAlltime = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const timeCheck = await infor.find({
      userId: id,
    });
    let obj = {};
    timeCheck.map((item) => {
      obj = {
        ...obj,
        [item.date]: [...(obj[item.date] || []), item],
      };
    });
    if (obj)
      return res.json({
        message: "hello",
        data: obj,
      });
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};
exports.list = async (req, res) => {
  try {
    let query = [
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
    ];

    query.push({
      $project: {
        deviceType: 1,
        deviceName: 1,
        ssid: 1,
        _id: 1,
        deviceName: 1,
        status: 1,
        date: 1,
        time: 1,
        "creator._id": 1,
        "creator.course": 1,
        "creator.username": 1,
        "creator.macAddress": 1,
        "creator.uniqueId": 1,
      },
    });
    let all_users = await infor.aggregate(query);
    console.log(all_users);
    return res.send({
      message: "Blog successfully fetched",
      data: {
        all_users: all_users.map((doc) => infor.hydrate(doc)),
      },
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};
