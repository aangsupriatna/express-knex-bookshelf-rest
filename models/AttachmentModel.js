const bookshelf = require('../bookshelf')

const Attachment = bookshelf.model('Attachment', {
    tableName: 'attachments',
    hasTimestamps: true,

    attachable() {
        return this.morphTo('attachable', 'User')
    }
})

module.exports = Attachment