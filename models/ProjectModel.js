const bookshelf = require('../bookshelf')

const Project = bookshelf.model('Project', {
    tableName: 'projects',
    hasTimestamps: true,

    company() {
        return this.belongsTo('Company', 'company_id')
    }
})

module.exports = Project