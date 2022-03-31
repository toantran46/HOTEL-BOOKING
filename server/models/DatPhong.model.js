const mongoose = require("mongoose");

const DatPhongSchema = new mongoose.Schema({
    ThongTinhPhong: [{ Phong: { type: mongoose.Schema.Types.ObjectId, ref: "Phong" }, TenNguoiDat: { type: String } }],
    HoTenNguoiDat: String,
    Email: String,
    DiaChi: String,
    MaKhachSan: String,
    NgayDatPhong: Date,
    NgayNhanPhong: Date,
    NgayTraPhong: Date,
    TinhTrang: { type: String, default: 'Đã đặt' },
    TongTien: String
})

module.exports = mongoose.model('DatPhong', DatPhongSchema);