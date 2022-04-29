// require("./database/db");
// const app = require("express")();
// const port = 3000;

// const UserRouter = require("./router/User");
// const informationRouter = require("./router/informationUser");

// // For accepting post form data
// const bodyParser = require("express").json;
// app.use(bodyParser());

// app.use("/user", UserRouter);
// app.use("/user", informationRouter);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
// parse application/json
app.use(bodyParser.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

require("dotenv").config();
const cors = require("cors");
app.use(cors());
global.publicPath = __dirname + "/public";

app.use(function (req, res, next) {
  global.req = req;
  next();
});

app.use(express.static(__dirname + "/public"));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Scussefully");
  })
  .catch((err) => console.log(err));

require("./helpers/extend-node-input-validator");
require("./router/index")(app);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client", "build", "index.html"));
  });
}
app.use(express.static(__dirname + "/public"));

const http = require("http");
const server = http.Server(app);
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`server is running on port localhost:${port}`);
});
