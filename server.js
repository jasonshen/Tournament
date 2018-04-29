const express = require("express");
const multer = require("multer");
const path = require("path");
const axios = require('axios');
const form = multer();
const bodyParser = require('body-parser');
const fields = form.fields([{name: 'fileName', maxCount: 1}, {name: 'file', maxCount: 1}]);
const headlight_api_path = "https://www.headlightlabs.com/api/gcpd_lookup/";
const api_key = "0dRRxFID0bIrvF-f46x4sA";

const db = require('./firebase.js');
const app = express();

//Send static files
app.use(express.static(__dirname + "/public"));

app.get("/api/test", (req, res) => {
  res.send({ test: "testing" });
});

app.post('/api/images', fields, (req, res) => {
	const imageBuffer = req.files.file[0].buffer;
	const type = req.files.file[0].type;
	const title = req.body.filename;
	let image_contents = `data:${type};base64,` + Buffer.from(imageBuffer).toString('base64');
	let data = {api_key, image_contents};

	axios.post(headlight_api_path, data).then(response => {
		// send results to firebase for persistence
		let entry = {};
		entry[title] = [response.data.location, response.data.closest_match, response.data.percent_match];
		db.ref('/images').update(entry);
		res.send(response.data);
	}).catch(err => {
		res.send('error :(', err);
	})
});

app.use(bodyParser.json());
app.post('/api/report', (req, res) => {
	console.log(req.body);
	axios.get(req.body.url).then(response => {
		axios.post('https://www.headlightlabs.com/api/gcpd_report/', {api_key: api_key, image: response.data}).then(data => {
			console.log('response from api: ', data);
		}).catch(err => {
			console.log('error sending report: ', err);
		})
	})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
