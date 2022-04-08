const mongoose = require("mongoose");

const PhanHoiSchema = new mongoose.Schema({
    MaKhachSan: mongoose.Types.ObjectId,
    MaKH: mongoose.Types.ObjectId,
    MaPhong: mongoose.Types.ObjectId,
    NgayTao: Date,
    Diem: Number,
    BinhLuan: String,
    TraLoi: String
})

module.exports = mongoose.model('PhanHoi', PhanHoiSchema);