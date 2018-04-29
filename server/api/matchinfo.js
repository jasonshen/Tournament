const router = require('express').Router();
const { MatchInfo } = require('../db')


router.post('/:userId', (req, res, next) => {
    MatchInfo.create(req.body)
        .then(info => {
            console.log(info);
        })
    res.send(200);
})

router.get('/:userId', (req, res, next) => {
    console.log('getttting')
    MatchInfo.findAll({
        where: {
            userId: req.params.userId
        }
    })
        .then(data => {
            res.send(data);
        })
})

module.exports = router;