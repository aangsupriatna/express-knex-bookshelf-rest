const bookshelf = require('../bookshelf')
const Book = require('./BookModel')

const Page = bookshelf.model('PageModel', {
    tableName: 'pages',
    hasTimestamps: true,

    book() {
        return this.belongsTo(Book)
    }
})

module.exports = Page