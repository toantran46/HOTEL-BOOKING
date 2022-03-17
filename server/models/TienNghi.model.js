const mongoose = require("mongoose");

const TienNghiSchema = new mongoose.Schema({
    TenTienNghi: String,
    Icon: String,
})

module.exports = mongoose.model('TienNghi', TienNghiSchema);