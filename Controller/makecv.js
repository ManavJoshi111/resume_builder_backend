const express = require("express");
const User = require("../Model/userSchema");
const makecv = express();
const jwt = require("jsonwebtoken");
const middleware = require("../Middlewares/middleware");

router.get("/makecv", authenticate, (req, res) => {
  // console.log("Make CV Router from backend");
  // res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  // );
  res.send(req.rootUser);
});
