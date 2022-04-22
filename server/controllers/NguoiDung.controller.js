const NguoiDungModel = require("../models/NguoiDung.model");
var md5 = require('md5');

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

    try {
      const { email, name, phone, password, Quyen, Avatar } = req.body;
      const newNguoiDung = new NguoiDungModel({
        email,
        name,
        phone,
        Quyen,
        password: md5(password),
        Avatar,
      });
      await newNguoiDung.save();
      res.json({ message: "Thêm người dùng thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error " + error.message });
    }
  },
  patch: async (req, res) => {
    try {
      const { MaNguoiDung } = req.params;

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
