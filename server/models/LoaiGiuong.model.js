const mongoose = require("mongoose");

const LoaiGiuongSchema = new mongoose.Schema({
    TenLoaiGiuong: String
})

module.exports = mongoose.model('LoaiGiuong', LoaiGiuongSchema);