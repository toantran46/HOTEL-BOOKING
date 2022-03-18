const mongoose = require("mongoose");

const DatPhongSchema = new mongoose.Schema({
    ThongTinhPhong: [{ type: Object }],
    HoTenNguoiDat: String,
    Email: String,
    DiaChi: String,
    MaKhachSan: String,
    NgayDatPhong: Date,
    NgayNhanPhong: Date,
    NgayTraPhong: Date,
    TinhTrang: String,
    TongTien: String
})

module.exports = mongoose.model('DatPhong', DatPhongSchema);