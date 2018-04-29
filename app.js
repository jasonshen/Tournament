const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { db } = require('./server/db')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const myStore = new SequelizeStore({ db: db });
require('dotenv').config()

// configure session storage
app.use(session({
    secret: "test",
    store: new SequelizeStore({
        db: db
    }),
    resave: false,
    saveUninitialized: false
}))

myStore.sync()

//parse request bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// static files
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
}
);

app.use('/api', require('./server/api'));


app.listen(process.env.PORT || 3000, () => {
    db.sync()
        .then(() => {
            console.log('listening and synced')
        }).catch(console.log)
});

module.exports = app;
