const bookshelf = require('../bookshelf')
const Company = require('./CompanyModel')

const Project = bookshelf.model('ProjectModel', {
    tableName: 'projects',
    hasTimestamps: true,

    companies() {
        return this.belongsTo(Company)
    }
})

module.exports = Project