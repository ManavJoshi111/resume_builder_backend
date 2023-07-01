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
  const { name, email, number, password, image } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const numberRegex = /^\d{10}$/;
  if (number && !numberRegex.test(number)) {
    return res.status(400).json({ error: "Invalid number format" });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "Invalid password format" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "This email id is already associated with some other account" });
    }

    const newUser = new User({
      name,
      email,
      number,
      password,
      image,
    });

    await newUser.save();
    return res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});


router.get("/makecv", authenticate, (req, res) => {
  console.log("Make CV Router from backend");
  // res.send("Make CV Router from backend");
});

router.post("/update", updatedata, (req, res) => {
  res.send("In update");
});
module.exports = router;
