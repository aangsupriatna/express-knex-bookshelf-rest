const bookshelf = require('../bookshelf')

const Summary = bookshelf.model('Summary', {
    tableName: 'summaries',
    hasTimestamps: true,

    book() {
        return this.belongsTo('Book', 'book_id')
    }
})

module.exports = Summary