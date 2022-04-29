const { Validator } = require("node-input-validator");
const mongoose = require("mongoose");
const fs = require("fs");

const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  console.log(req.body);
  const v = new Validator(req.body, {
    course: "required",
    username: "required|unique:User,username|minLength:2|maxLength:100",
    macAddress: "required|unique:User,macAddress",
    uniqueId: "required|unique:User,uniqueId",
    password: "required",
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    const newUser = new user({
      course: req.body.course,
      username: req.body.username,
      macAddress: req.body.macAddress,
      uniqueId: req.body.uniqueId,
      password: req.body.password,
    });
    console.log(req.body);
    let userData = await newUser.save();
    return res.status(200).send({
      message: "Registration successfull",
      data: userData,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};
exports.login = async (req, res) => {
  try {
    let userData = await user.findOne({
      username: req.body.username,
      //   status: "admin",
    });
    if (userData) {
      if (bcrypt.compareSync(req.body.password, userData.password)) {
        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        let token = jwt.sign(
          {
            data: userData,
          },
          jwt_secret,
          { expiresIn: "12h" }
        );

        return res.status(200).send({
          message: "Login successfully",
          data: userData,
          token: token,
        });
      } else {
        return res.status(400).send({
          message: "Incorrect credentials",
        });
      }
    } else {
      return res.status(400).send({
        message: "User is not registered",
      });
    }
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};
exports.list = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};
exports.update_pass = async (req, res) => {
  let user_id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).send({
      message: "Invalid user id",
      data: {},
    });
  }
  user.findOne({ _id: user_id }).then(async (idUser) => {
    if (!idUser) {
      return res.status(404).send({
        message: "User not found",
        data: {},
      });
    } else {
      const v = new Validator(req.body, {
        new_password: "required",
        confirm_password: "required|same:new_password",
      });

      const matched = await v.check();
      if (!matched) {
        return res.status(422).send(v.errors);
      }
      try {
        let hashPassword = bcrypt.hashSync(req.body.new_password, 10);
        await user.updateOne(
          { _id: user_id },
          // {
          //   $set: req.body,
          // },
          {
            password: hashPassword,
          }
        );
        let userData = await user.findOne({ _id: user_id });

        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        let token = jwt.sign(
          {
            data: userData,
          },
          jwt_secret,
          { expiresIn: "12h" }
        );
        return res.status(200).send({
          message: "Blog successfully updated",
          data: userData,
          token: token,
        });
      } catch (err) {
        return res.status(400).send({
          message: err.message,
          data: err,
        });
      }
    }
  });
};
exports.update_pass_user = async (req, res) => {
  let user_id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).send({
      message: "Invalid user id",
    });
  }
  user.findOne({ _id: user_id }).then(async (idUser) => {
    if (!idUser) {
      return res.status(404).send({
        message: "User not found",
        data: {},
      });
    } else {
      const inforUser = await user.findOne({ _id: user_id });
      console.log(inforUser);
      const v = new Validator(req.body, {
        old_password: "required",
        new_password: "required",
        confirm_password: "required|same:new_password",
      });

      const matched = await v.check();
      if (!matched) {
        return res.status(422).send(v.errors);
      }
      try {
        if (bcrypt.compareSync(req.body.old_password, inforUser.password)) {
          let hashPassword = bcrypt.hashSync(req.body.new_password, 10);
          await user.updateOne(
            { _id: user_id },
            // {
            //   $set: req.body,
            // },
            {
              password: hashPassword,
            }
          );
          let userData = await user.findOne({ _id: user_id });

          let jwt_secret = process.env.JWT_SECRET || "mysecret";
          let token = jwt.sign(
            {
              data: userData,
            },
            jwt_secret,
            { expiresIn: "12h" }
          );
          return res.status(200).send({
            message: "Blog successfully updated",
            data: userData,
            token: token,
          });
        } else {
          return res.status(400).send({
            message: "Old password does not matched",
          });
        }
      } catch (err) {
        return res.status(400).send({
          message: err.message,
          data: err,
        });
      }
    }
  });
};
exports.deleteUser = async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    return res.status(201).send({
      message: "Delete successfully",
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};
exports.update = async (req, res) => {
  try {
    const updateUserInfor = await user.findById(req.params.id);
    await updateUserInfor.updateOne({ $set: req.body });
    return res.status(201).send({
      status: true,
      message: "Update successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.aUser = async (req, res) => {
  let userid = req.params.id;
  console.log(userid);
  try {
    const a_user = await user.findById(userid);
    res.status(200).send({
      a_user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
