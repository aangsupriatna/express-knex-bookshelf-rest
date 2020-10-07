const bookshelf = require('../bookshelf')

const UserProfile = bookshelf.model('UserProfile', {
    tableName: 'users_profile',
    hasTimestamps: true,

    user() {
        return this.belongsTo('User', 'user_id')
    }
})

module.exports = UserProfile