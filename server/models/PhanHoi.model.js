const mongoose = require("mongoose");

const PhanHoiSchema = new mongoose.Schema({
    MaKhachSan: mongoose.Types.ObjectId,
    MaKH: { type: mongoose.Types.ObjectId, ref: "NguoiDung" },
    MaPhong: { type: mongoose.Types.ObjectId, ref: "Phong" },
    NgayTao: Date,
    Diem: Number,
    BinhLuan: String,
    TraLoi: String
})

module.exports = mongoose.model('PhanHoi', PhanHoiSchema);