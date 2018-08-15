let express = require('express');
let app = express();


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