// Some required declarations
const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(require("./Controller/signup"));
app.use(require("./Controller/login"));
app.use(require("./Controller/logout"));
app.use(express.static('./Public'));
const options = {
  origin: '*',
  optionSuccessStatus: 200,
  credentials: true
};
app.use(cors(options));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', options.origin);
  res.header('Access-Control-Allow-Headers', options.allowedHeaders);
  res.header('Access-Control-Allow-Methods', options.methods);
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
// Connection To Mongodb Using Mongoose
// mongoose
//   .connect("mongodb://localhost:27017/resume_builder", {
//     useNewUrlParser: true,
//   })
mongoose.connect("mongodb+srv://manavjoshi:3RvcXXPw8WTFvAxu@cluster0.w5kq0.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connection is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

// Declaring Routes

// app.get("/makecv", (req, res) => {
//   console.log("Make CV Router from backend");
//   res.send("Make CV Router from backend");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static('Frontend/build'));
}

// Listening to port 3001
app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port 8000");
});
