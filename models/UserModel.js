const bookshelf = require('../bookshelf')
const bcrypt = require('bcrypt')

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: true,
    hidden: ['password'],

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
        const correct = bcrypt.compareSync(password, this.get('password'))
        return correct
    }
})

module.exports = User