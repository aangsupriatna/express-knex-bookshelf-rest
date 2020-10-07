const bookshelf = require('../bookshelf')

const Page = bookshelf.model('Page', {
    tableName: 'pages',
    hasTimestamps: true,

    book() {
        return this.belongsTo('Book', 'book_id')
    }
})

module.exports = Page