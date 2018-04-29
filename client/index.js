const express = require('express')
const app = express()
var path    = require("path");

const api = require('./routes');

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'public/index.html')))
app.use('/api', api)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
