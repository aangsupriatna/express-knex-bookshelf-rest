const bookshelf = require('../bookshelf')

const Attachment = bookshelf.model('Attachment', {
    tableName: 'attachments',
    hasTimestamps: true,

    imageable() {
        return this.morphto('imageable', 'User', 'Book')
    }
})

module.exports = Attachment