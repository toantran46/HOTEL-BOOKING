const mongoose = require("mongoose");

const DatPhongSchema = new mongoose.Schema({
  ThongTinhPhong: [
    {
      Phong: { type: mongoose.Schema.Types.ObjectId, ref: "Phong" },
      TenNguoiNhanPhong: { type: String },
      SoLuong: { type: Number },
    },
  ],
  HoTenNguoiDat: String,
  Email: String,
  MaKhachSan: String,
  NgayDatPhong: { type: Date, default: new Date() },
  NgayNhanPhong: Date,
  NgayTraPhong: Date,
  TongTien: Number,
  SoDienThoai: String,
  YeuCau: String,
  TinDung: {
    TenChuThe: String,
    LoaiThe: { type: mongoose.Types.ObjectId, ref: "TinDung" },
    SoThe: String,
    NgayHetHan: String
  },
  ThoiGianDenDuKien: Number,
  TrangThai: { type: String, default: "Chờ nhận phòng" },
  DaThanhToan: { type: Boolean, default: false }
});

module.exports = mongoose.model("DatPhong", DatPhongSchema);
