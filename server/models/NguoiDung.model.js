const mongoose = require("mongoose");

const NguoiDungSchema = new mongoose.Schema({
  HoTen: String,
  SDT: String,
  Email: String,
  Quyen: { type: String, default: "USER" },
  MatKhau: String,
  Avatar: { type: String, default: "" },
});

module.exports = mongoose.model("NguoiDung", NguoiDungSchema);
