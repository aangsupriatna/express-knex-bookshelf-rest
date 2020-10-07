const bookshelf = require('../bookshelf')

const BookUser = bookshelf.model('BookUser', {
    tableName: 'books_users',
    hasTimestamps: true,

    user() {
        return this.belongsTo('User', 'user')
    },

    book() {
        return this.belongsTo('Book', 'book')
    }
})

module.exports = BookUser