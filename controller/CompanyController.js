const Company = require('../models/CompanyModel')

async function get(req, res) {
    try {
        const companies = await Company.fetchAll({ withRelated: ['projects'] })
        if (companies) {
            return res.ok(companies, { message: 'Fetch all companies success' })
        }
    } catch (error) {
        return res.error(500, { message: 'Get companies error' })
    }
}

async function store(req, res) {
    try {
        const { name } = req.body
        const company = await new Company({
            name: name
        }).save()
        return res.ok(company, { message: 'Insert company success' })
    } catch (error) {
        return res.error(500, { message: 'Insert new company error' })
    }
}

async function show(req, res) {
    try {
        const id = req.params.id
        const company = await new Company({ id: id }).fetch({
            withRelated: ['projects']
        })
        if (company) {
            return res.ok(company, { message: 'Getting company success' })
        }
    } catch (error) {
        return res.error(500, { message: 'Getting company error' })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { name } = req.body

        const companies = await Company.where({ id: id }).fetch().then(company => {
            company.set({ name: name })
            return company.save()
        })
        return res.ok(companies, { message: 'Update success' })
    } catch (error) {
        return res.error(500, { message: 'Update company error' })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new Company({ id: id }).destroy()
        return res.ok(id, { message: 'Company destroyed' })
    } catch (error) {
        return res.error(500, { message: error.message })
    }
}

module.exports = {
    get,
    store,
    show,
    update,
    destroy
}