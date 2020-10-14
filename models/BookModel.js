const bookshelf = require('../bookshelf')

const Book = bookshelf.model('Book', {
    tableName: 'books',
    hasTimestamps: true,

    user() {
        return this.belongsToMany('User', 'books_users')
    },

    pages() {
        return this.hasMany('Page', 'book_id')
    },

    summary() {
        return this.hasOne('Summary', 'book_id')
    },

    attachments() {
        return this.morphMany('Attachment', 'imageable')
    }
})

module.exports = Book