const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
  },
  username: {
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
  collegesdate: {
    type: String,
  },
  collegeedate: {
    type: String,
  },
  cname: {
    type: String,
    //required: true,
  },
  experience: {
    type: Array,
    //required: true,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  projects: {
    type: Array,
    //required: true,
  },
  certificates: {
    type: Array,
    //required: true,
  },
  about: {
    type: String,
    //required: true,
  },
  achievement: {
    type: Array,
    //required: true,
  },
  sdate: {
    type: String,
  },
  edate: {
    type: String,
  },
  jtitle: {
    type: String,
  },
  jdesc: {
    type: String,
  },
  ptitle1: {
    type: String,
  },
  pdesc1: {
    type: String,
  },
  plink1: {
    type: String,
  },
  ptitle2: {
    type: String,
  },
  pdesc2: {
    type: String,
  },
  plink2: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
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
