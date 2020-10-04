const bookshelf = require('../bookshelf')
const Company = require('./CompanyModel')

const Project = bookshelf.model('Project', {
    tableName: 'projects',
    hasTimestamps: true,

    company() {
        return this.belongsTo(Company)
    }
})

module.exports = Project