const mongoose = require("mongoose");

const TinDungSchema = new mongoose.Schema({
    TenTinDung: String,
    Logo: String,
})

module.exports = mongoose.model('TinDung', TinDungSchema);