const mongoose = require("mongoose");

const ChoNghiSchema = new mongoose.Schema({
    TenChoNghi: String,
    QuanLy: { type: mongoose.Schema.Types.ObjectId, ref: "NguoiDung" },
    TieuDeDatDiem: String,
    MoTaDatDiem: String,
    DiaChi: String,
    ThanhPho: { type: mongoose.Schema.Types.ObjectId, ref: "ThanhPho" },
    LoaiChoNghi: { type: mongoose.Schema.Types.ObjectId, ref: "LoaiChoNghi", default: mongoose.Types.ObjectId("62355779163a837aa7127013") },
    XepHang: Number,
    TienNghi: [{ type: mongoose.Schema.Types.ObjectId, ref: "TienNghi" }],
    HinhAnh: [{ type: String }],
    Phong: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phong' }],
    HuyDatPhong: String,
    BaoHiemNhamLan: Boolean,
    ThoiGianNhanPhong: { type: Object },
    ThoiGianTraPhong: { type: Object },
    TinDung: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TinDung' }]
})

module.exports = mongoose.model('ChoNghi', ChoNghiSchema);