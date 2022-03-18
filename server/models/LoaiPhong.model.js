const mongoose = require("mongoose");

const LoaiPhongSchema = new mongoose.Schema({
    TenLoaiPhong: String
})

module.exports = mongoose.model('LoaiPhong', LoaiPhongSchema);