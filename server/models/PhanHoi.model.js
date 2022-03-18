const mongoose = require("mongoose");

const PhanHoiSchema = new mongoose.Schema({
    MaKhachSan: String,
    MaKH: String,
    MaPhong: String,
    NgayTao: Date,
    Diem: Number,
    BinhLuan: String,
    TraLoi: String
})

module.exports = mongoose.model('PhanHoi', PhanHoiSchema);