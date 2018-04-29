const db = require('./conn');
const Sequelize = db.Sequelize;
const bcrypt = require('bcrypt');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

const encrypt = (user) => {
    const saltRounds = 8;
    bcrypt.hash(user.password, saltRounds)
        .then(hash => {
            user.password = hash;
            return user.save()
        }).catch(err => {
            console.log('encrypt', err)
        })
}

User.beforeCreate(encrypt)

module.exports = User;