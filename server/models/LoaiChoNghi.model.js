const mongoose = require("mongoose");

const LoaiChoNghiSchema = new mongoose.Schema({
    TenLoaiChoNghi: String,
    HinhAnh: String
})

module.exports = mongoose.model('LoaiChoNghi', LoaiChoNghiSchema);