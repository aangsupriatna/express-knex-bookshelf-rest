const bookshelf = require('../bookshelf')
const Project = require('./ProjectModel')

const Company = bookshelf.model('CompanyModel', {
    tableName: 'companies',
    hasTimestamps: true,

    projects() {
        return this.hasMany(Project)
    }
})

module.exports = Company