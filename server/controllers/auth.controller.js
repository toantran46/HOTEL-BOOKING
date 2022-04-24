const User = require("../models/NguoiDung.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    //Check email of user
    if (!user) return res.status(401).json({ message: "Email does not exist" });
    // console.log(req.body);
    // console.log(user.password);
    // compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).json({ message: "wrong password" });
    // if (md5(req.body.password) !== user.password)
    //   return res.status(401).json({ message: "wrong password" });

    const accessToken = jwt.sign(
      { email: user.email, userId: user._id, Quyen: user.Quyen },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { email: user.email, userId: user._id, Quyen: user.Quyen },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .json({ message: "Welcome back!", accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
