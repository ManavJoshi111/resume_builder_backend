const express = require("express");
const User = require("../Model/userSchema");
const updatedata = require("../Middlewares/updatedata");
const authenticate = require("../Middlewares/middleware");
const router = express.Router();

router.get("/signup", (req, res) => {
  console.log(User);
  res.send("Signup");
});

router.post("/signup", async (req, res) => {
  if (req.body.email == "" || req.body.username == "" || req.body.password == "") {
    res.status(400).json({ error: "Please fill all the fields" });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.json({ error: "Email ID already exists" });
      }
      else {
        const user = new User(req.body);
        console.log(req.body);
        user
          .save()
          .then(() => {
            res
              .status(201)
              .json({ message: "Account created successfully" });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
    })
    .catch((err) => {
      return err;
    });
});

router.get("/makecv", authenticate, (req, res) => {
  console.log("Make CV Router from backend");
  // res.send("Make CV Router from backend");
});

router.post("/update", updatedata, (req, res) => {
  res.send("In update");
});
module.exports = router;
