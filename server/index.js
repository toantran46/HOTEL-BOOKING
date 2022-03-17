const express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

const app = express();
const port = 3000;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to db
console.log(process.env.MONGO_CONNECTION);
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connect succesfully")
}, error => {
    console.log("Connection failed ", error);
});


app.get('/', (req, res) => {
    res.render('index');
});

app.use(express.static('public'));



app.listen(port, function () {
    console.log('Listen on port ' + port)
});