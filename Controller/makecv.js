const express = require("express");
const User = require("../Model/userSchema");
const makecv = express();
const jwt = require("jsonwebtoken");
const middleware = require("../Middlewares/middleware");

router.get("/makecv", authenticate, (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.send(req.rootUser);
});
