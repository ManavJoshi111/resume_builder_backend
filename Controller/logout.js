const express = require("express");
const logout = express();
const User = require("../Model/userSchema");

logout.get("/logout", (req, res) => {
  console.log("Logout");
  res.clearCookie("jwToken", { path: "/" });
  res.status(200).send("Userlogout");
});

module.exports = logout;
