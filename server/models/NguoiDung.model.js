const mongoose = require("mongoose");

const NguoiDungSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  Quyen: { type: String, default: "USER" },
  password: String,
  Avatar: { type: String, default: "" },
});

module.exports = mongoose.model("NguoiDung", NguoiDungSchema);
