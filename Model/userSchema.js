const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
  },
  email: {
    type: String,
    //required: true,
  },
  number: {
    type: Number,
    //required: true,
  },
  password: {
    type: String,
    //required: true,
  },
  address: {
    type: String,
    //required: true,
  },
  portfolio: {
    type: String,
  },
  github: {
    type: String,
  },
  skills: {
    type: Array,
    //required: true,
  },
  certificates: {
    type: Array,
  },
  achievements: {
    type: Array,
  },
  about: {
    type: String,
  },
  collegesdate: {
    type: String,
  },
  collegeedate: {
    type: String,
  },
  cname: {
    type: String,
  },
  cpi: {
    type: String,
  },
  experience: {
    type: Array,
  },
  projects: {
    type: Array,
  },
  tokens: [
    {
      token: {
        type: String,
        //required: true,
      },
    },
  ]
});

// Hasing technique of the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//Genertate Auth Token Using JWT
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    console.log("Generated Token is :", token);
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("userdata", userSchema);
module.exports = User;
