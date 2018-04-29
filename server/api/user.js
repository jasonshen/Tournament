const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../db')

router.get('/', (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user)
            .then(user => {
                res.send(user);
            }).catch(err => {
                console.log('session', err)
                res.sendStatus(200)
            })
    } else {
        res.end()
    }

})

router.delete('/', (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
})

router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.send(user)
        })
})

router.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            res.send({ err: 'No user with that username' })
        }
        return user;
    }).then(user => {
        if (!user) {
            //not ending response if there isn't an user.  Not sure why
            return;
        }
        return bcrypt.compare(req.body.password, user.password)
            .then(correctPw => {
                if (correctPw) {
                    req.session.user = user.id
                    return res.send(user)
                } else {
                    return res.send({ err: 'Wrong Password' })
                }
            });
    }).catch(err => {
        console.log('login', err)
        return res.send(err)
    })
})
module.exports = router;