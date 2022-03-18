const mongoose = require("mongoose");

const ChoNghiSchema = new mongoose.Schema({
    TenChoNghi: String,
    TenNguoiLienHe: String,
    SoDienThoai: String,
    DiaChi: String,
    ThanhPho: String,
    XepHang: Number,
    TienNghi: [{ type: mongoose.Schema.Types.ObjectId, ref: "TienNghi" }],
    HinhAnh: [{ type: String }],
    Phong: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phong' }],
    HuyDatPhong: String,
    BaoHiemNhamLan: Boolean,
    ThoiGianNhanPhong: { type: Date },
    ThoiGianTraPhong: { type: Date },
    TinDung: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TinDung' }]
})

module.exports = mongoose.model('ChoNghi', ChoNghiSchema);