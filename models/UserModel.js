const bookshelf = require('../bookshelf')
const bcrypt = require('bcrypt')
const UserProfile = require('./UserProfileModel')

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: true,
    hidden: ['password'],

    profile() {
        return this.hasOne('UserProfile')
    },

    book() {
        return this.belongsToMany('Book', 'books_users')
    },

    initialize() {
        this.on('saving', model => {
            if (model.get('password')) {
                model.set({ password: bcrypt.hashSync(model.get('password'), 10) })
            }
        })

        this.on('updating', (model) => {
            if (model.get('password')) {
                model.set({ password: bcrypt.hashSync(model.get('password'), 10) })
            }
        })
    },

    checkPassword: function (password) {
        return bcrypt.compareSync(password, this.get('password'))
    }
})

module.exports = User