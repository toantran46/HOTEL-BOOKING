const mongoose = require("mongoose");

const ChoNghiSchema = new mongoose.Schema({
    TenChoNghi: String,
    TenNguoiLienHe: String,
    SoDienThoai: String,
    DiaChi: String,
    ThanhPho: { type: mongoose.Schema.Types.ObjectId, ref: "ThanhPho" },
    LoaiChoNghi: { type: mongoose.Schema.Types.ObjectId, ref: "LoaiChoNghi" },
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