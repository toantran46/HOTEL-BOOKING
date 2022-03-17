const mongoose = require("mongoose");

const PhongSchema = new mongoose.Schema({
    MaLoaiPhong: String,
    TenPhong: String,
    HutThuoc: Boolean,
    Giuong: [{ type: Object }],
    SoLuongKhach: Number,
    KichThuoc: String,
    Gia: Number,
    TrangThai: Boolean,
    TienNghi: [{ type: String }],
    SoLuongPhong: Number
})

module.exports = mongoose.model('Phong', PhongSchema);