const User = require("../models/NguoiDung.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

module.exports.register = async (req, res) => {
  try {
    // Check email
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(409).json({ message: "email already exist" });
    // Check password
    const phone = await User.findOne({ phone: req.body.phone });
    if (phone) return res.status(409).json({ message: "phone already exist" });
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      name: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Sign up user successful" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

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
