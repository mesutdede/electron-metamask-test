const path = require('path');
const express = require("express");
const app = express();

let server = app.listen(3000);

app.use(express.static(__dirname + '/dist'))

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '/dist/index.html'));

});