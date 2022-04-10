const express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

var cors = require("cors");

const app = express();
const port = 5000;

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to db
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect successfully")
    }, error => {
        console.log("Connection failed ", error);
    });

//API
const LoaiPhongRouter = require("./routes/LoaiPhong.route");
const LoaiGiuongRouter = require("./routes/LoaiGiuong.route");
const TienNghiRouter = require("./routes/TienNghi.route");
const PhongRouter = require("./routes/Phong.route");
const ChoNghiRouter = require("./routes/ChoNghi.route");
const TinDungRouter = require("./routes/TinDung.route");
const LoaiChoNghiRouter = require("./routes/LoaiChoNghi.route");
const ThanhPhoRouter = require("./routes/ThanhPho.route");
const NguoiDungRouter = require("./routes/NguoiDung.route");
const PhanHoiRouter = require("./routes/PhanHoi.route");
const DatPhongRouter = require("./routes/DatPhong.route");


app.use(express.static('public'));
app.use('/api/LoaiPhong', LoaiPhongRouter);
app.use('/api/LoaiGiuong', LoaiGiuongRouter);
app.use('/api/TienNghi', TienNghiRouter);
app.use('/api/Phong', PhongRouter);
app.use('/api/ChoNghi', ChoNghiRouter);
app.use('/api/TinDung', TinDungRouter);
app.use('/api/LoaiChoNghi', LoaiChoNghiRouter);
app.use('/api/ThanhPho', ThanhPhoRouter);
app.use('/api/NguoiDung', NguoiDungRouter);
app.use('/api/PhanHoi', PhanHoiRouter);
app.use('/api/DatPhong', DatPhongRouter);




//Open port
app.listen(port, function () {
    console.log('Listen on port ' + port)
});