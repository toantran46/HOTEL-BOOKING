const mongoose = require("mongoose");

const NguoiDungSchema = new mongoose.Schema({
    HoTen: String,
    SDT: String,
    Email: String,
    Quyen: String,
    MatKhau: String,
    Avatar: String
})

module.exports = mongoose.model('NguoiDung', NguoiDungSchema);