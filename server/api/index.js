const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/matchinfo', require('./matchinfo'));

module.exports = router;