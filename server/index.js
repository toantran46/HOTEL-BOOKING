const express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

const app = express();
const port = 5000;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to db
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connect succesfully")
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


app.use(express.static('public'));
app.use('/api/LoaiPhong', LoaiPhongRouter);
app.use('/api/LoaiGiuong', LoaiGiuongRouter);
app.use('/api/TienNghi', TienNghiRouter);
app.use('/api/Phong', PhongRouter);
app.use('/api/ChoNghi', ChoNghiRouter);
app.use('/api/TinDung', TinDungRouter);




//Open port
app.listen(port, function () {
    console.log('Listen on port ' + port)
});