const express = require("express");
const cors = require('cors');
const User = require("../Model/userSchema");
const login = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
login.post("/login", async (req, res) => {
  try {
    console.log("In login : ", req.headers.origin);
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "Please Enter All The Fields" });

    const userLogin = await User.findOne({ username: username });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const Token = await userLogin.generateAuthToken();
      console.log("Token in login.js is ", Token);
      // store the cookie into users browser and set samesite attrubute to none
      res.cookie("jwToken", Token, { sameSite: 'none', secure: false });
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "Invalid Credentials or You don't have any account" });
      } else {
        console.log("Login Successfull");
        return res.status(200).json({ message: "Login Successful" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Invalid Credentials or You don't have any account" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = login;
