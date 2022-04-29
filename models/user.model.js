const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema(
  {
    // fistname: String,
    // course: String,
    // username: String,
    // password: String,
    ssid: { type: String, default: "Coti Cafe" },
    course: { type: String, default: "" },
    username: { type: String, default: "" },
    password: { type: String },
    macAddress: { type: String },
    uniqueId: { type: String },

    status: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);
schema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
schema.virtual("image_url").get(function () {
  var fullUrl = req.protocol + "://" + req.get("host");
  return fullUrl + "/uploads/blog_images/" + this.image;
});
const User = mongoose.model("User", schema);

module.exports = User;
