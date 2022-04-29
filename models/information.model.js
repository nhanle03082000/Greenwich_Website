const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    uniqueId: String,
    ipAddress: String,
    macAddress: String,
    deviceName: String,
    brand: String,
    buildId: String,
    deviceType: String,
    ssid: String,
    status: String,
    systemversion: String,
    date: String,
    time: String,
    longitude: String,
    latitude: String,
    userId: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
schema.virtual("image_url").get(function () {
  var fullUrl = req.protocol + "://" + req.get("host");
  return fullUrl + "/uploads/blog_images/" + this.image;
});
const informationUser = mongoose.model("informationUser", schema);

module.exports = informationUser;
