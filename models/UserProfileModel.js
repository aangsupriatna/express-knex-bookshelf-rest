const bookshelf = require('../bookshelf')
const User = require('./UserModel')

const UserProfile = bookshelf.model('UserProfile', {
    tableName: 'user_profiles',
    hasTimestamps: true,

    user() {
        return this.belongsTo(User)
    }
})

module.exports = UserProfile