const db = require('./conn');
const User = require('./User');
const MatchInfo = require('./MatchInfo');

User.hasMany(MatchInfo);

module.exports = {
    db, User, MatchInfo
}