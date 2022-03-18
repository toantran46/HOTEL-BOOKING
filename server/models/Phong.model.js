const mongoose = require("mongoose");

const PhongSchema = new mongoose.Schema({
    LoaiPhong: { type: mongoose.Schema.Types.ObjectId, ref: "LoaiPhong" },
    TenPhong: String,
    HutThuoc: Boolean,
    ThongTinGiuong: [
        {
            Giuong: { type: mongoose.Schema.Types.ObjectId, ref: "LoaiGiuong" },
            SoLuong: Number
        }
    ],
    SoLuongKhach: Number,
    KichThuoc: String,
    Gia: Number,
    TrangThai: { type: String, default: 'Trống' },
    TienNghi: [{ type: mongoose.Schema.Types.ObjectId, ref: "TienNghi" }],
    SoLuongPhong: Number
})

module.exports = mongoose.model('Phong', PhongSchema);