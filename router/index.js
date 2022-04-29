const authRoute = require("./user.route.");
const inforRoute = require("./infomation.route");
const profile_user = require("./profile.route");

module.exports = (app) => {
  app.use("/auth", authRoute);
  app.use("/information", inforRoute);
  app.use("/profile", profile_user);
};
