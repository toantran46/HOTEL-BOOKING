const NguoiDungModel = require("../models/NguoiDung.model");
var md5 = require("md5");
const bcrypt = require("bcrypt");

module.exports = {
  getAll: async (req, res) => {
    try {
      const NguoiDungs = await NguoiDungModel.find();
      res.json({ message: "success", NguoiDungs });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  get: async (req, res) => {
    try {
      const { MaNguoiDung } = req.params;
      const NguoiDung = await NguoiDungModel.findOne({ _id: MaNguoiDung });
      if (!NguoiDung)
        return res.status(400).json({ message: "Người dùng không tồn tại !" });
      res.json({ message: "success", NguoiDung });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  // get a user
  getMe: async (req, res) => {
    try {
      const user = await NguoiDungModel.findById(req.user.userId);
      if (!user)
        return res.status(404).json({ message: "User does not exist" });
      const { MatKhau, ...other } = user._doc;
      res.status(200).json({ message: "Fetch me success", user: other });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  post: async (req, res) => {
    // console.log(req.body);
    // return;
    const { email, name, phone, password, Quyen, Avatar } = req.body;
    try {
      // Check email
      const email = await NguoiDungModel.findOne({ email: req.body.email });
      if (email) return res.status(409).json({ message: "email already exist" });
      // Check password
      const phone = await NguoiDungModel.findOne({ phone: req.body.phone });
      if (phone) return res.status(409).json({ message: "phone already exist" });
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newNguoiDungModel = await new NguoiDungModel({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        Quyen,
        Avatar,
      });

      await newNguoiDungModel.save();
      res.status(201).json({ message: "Sign up user successful" });
    } catch (error) {
      res.status(500).json({ message: "Error " + error.message });

    }

    // try {
    //   const { email, name, phone, password, Quyen, Avatar } = req.body;
    //   const newNguoiDung = new NguoiDungModel({
    //     email,
    //     name,
    //     phone,
    //     Quyen,
    //     password: md5(password),
    //     Avatar,
    //   });
    //   await newNguoiDung.save();
    //   res.json({ message: "Thêm người dùng thành công !" });
    // } catch (error) {
    //   res.status(500).json({ message: "error " + error.message });
    // }
  },
  patch: async (req, res) => {
    try {
      const { MaNguoiDung } = req.params;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
      }

      const NguoiDung = await NguoiDungModel.updateOne(
        { _id: MaNguoiDung },
        { ...req.body }
      );
      if (NguoiDung.matchedCount === 0)
        return res.status(400).json({ message: "Người dùng không tồn tại !" });

      res.json({ message: "Sửa người dùng thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { MaNguoiDung } = req.params;
      const NguoiDung = await NguoiDungModel.deleteOne({ _id: MaNguoiDung });
      if (NguoiDung.deletedCount === 0)
        return res.status(400).json({ message: "Người dùng không tồn tại !" });

      res.json({ message: "Xóa người dùng thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
};
