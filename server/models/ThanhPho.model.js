const mongoose = require("mongoose");

const ThanhPhoSchema = new mongoose.Schema({
    TenThanhPho: String,
    HinhAnh: String
})

module.exports = mongoose.model('ThanhPho', ThanhPhoSchema);