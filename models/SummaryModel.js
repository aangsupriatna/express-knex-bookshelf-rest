const bookshelf = require('../bookshelf')
const Page = require('./PageModel')

const Summary = bookshelf.model('SummaryModel', {
    tableName: 'summaries',
    hasTimestamps: true,

    book() {
        return this.belongsTo(Page)
    }
})

module.exports = Summary