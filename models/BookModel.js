const bookshelf = require('../bookshelf')
const Page = require('./PageModel')
const Summary = require('./SummaryModel')

const Book = bookshelf.model('BookModel', {
    tableName: 'books',
    hasTimestamps: true,

    pages() {
        return this.hasMany(Page)
    },

    summary() {
        return this.hasOne(Summary)
    }
})

module.exports = Book