const mongoose = require("mongoose");

const ChoNghiSchema = new mongoose.Schema({
    TenChoNghi: String,
    TenNguoiLienHe: String,
    SoDienThoai: String,
    DiaChi: String,
    ThanhPho: String,
    XepHang: Number,
    TienNghi: [{ type: Object }],
    HinhAnh: [{ type: String }],
    Phong: [{ type: String }],
    HuyDatPhong: String,
    BaoHiemNhamLan: Boolean,
    ThoiGianNhanPhong: { type: Object },
    TinDung: [{ type: String }]
})

module.exports = mongoose.model('ChoNghi', ChoNghiSchema);