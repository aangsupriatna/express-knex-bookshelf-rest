const bookshelf = require('../bookshelf')
const Project = require('./ProjectModel')

const Company = bookshelf.model('Company', {
    tableName: 'companies',
    hasTimestamps: true,

    projects() {
        return this.hasMany('Project')
    }
})

module.exports = Company