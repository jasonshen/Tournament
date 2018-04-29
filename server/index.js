const express = require('express')
const app = express()

const api = require('./routes');

app.get('/', (req, res) => res.send('Gothic City API'))
app.use('/api', api)

app.listen(3001, () => console.log('Server listening on port 3001'))