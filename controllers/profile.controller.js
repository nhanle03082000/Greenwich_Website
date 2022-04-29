const { Vadilator } = require("node-input-validator");
const bcrypt = require("bcrypt");
const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");
exports.change_password = async (req, res) => {
  try {
    const v = new Validator(req.body, {
      old_password: "required",
      new_password: "required",
      confirm_password: "required",
    });
    const matched = await v.check();
    if (!matched) {
      return res.status(422).send(v.errors);
    }
    let id_user = req.user;
    if (bcrypt.compareSync(req.body.old_password, req.body.userId.password)) {
      let hashPassword = bcrypt.hashSync(req.body.new_password, 10);
      await User.updateOne({ _id: id_user.id }, { password: hashPassword });
      let userData = await User.findOne({ _id: id_user.id });
      let token = jwt.sign(
        {
          data: userData,
        },
        jwt_secret,
        { expiresIn: "12h" }
      );
      return res.status(200).send({
        message: "Password successfully updated",
        data: userData,
        token: token,
      });
    } else {
      return res.status(400).send({
        message: "Old password does not matched",
        data: {},
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message, data: error });
  }
};
