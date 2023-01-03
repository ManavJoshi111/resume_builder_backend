const jwt = require("jsonwebtoken");
const User = require("../Model/userSchema");
const authenticate = async (req, res, next) => {
  try {
    // console.log("ABCD : ", req.headers);
    // console.log("Before line", JSON.parse(JSON.stringify(req.headers.cookie)));
    // console.log("In authenticate", req.headers.origin);
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    // );
    const token = req.cookies.jwToken;
    if (!token) return res.status(401).json({ error: "Please Login First" });
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Verifytoken is :", verifyToken._id);
    console.log(token);
    const crrUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log(verifyToken._id, token);
    console.log("Current user is : ", crrUser);
    if (!crrUser) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }
    req.token = token;
    req.crrUser = crrUser;
    console.log("Current user is :", req.crrUser);
    req.userId = crrUser._id;
    res.status(200).json({ crrUser, message: "Authenticated" });
    next();
  } catch (err) {
    res.status(401).send("Invalid Token Is Found");
    console.log(err);
  }
};

module.exports = authenticate;
