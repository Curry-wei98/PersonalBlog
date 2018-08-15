let express = require('express');
let favicon = require('serve-favicon');
let app = express();
app.use(favicon('./favicon.ico'));

let server = app.listen(8707, function() {
	console.log('hi');
});

app.get('/', function (req, res) {
	res.sendfile('index.html');
});
app.get('/resume', function (req, res) {
	res.sendfile('front/resume.html');
});
app.get('/links', function (req, res) {
	res.sendfile('front/links.html');
});

app.get('/pointer.cur', function (req, res) {
	res.sendfile('front/cursor/pointer.cur');
});
app.get('/cursor.cur', function (req, res) {
	res.sendfile('front/cursor/cursor.cur');
});
