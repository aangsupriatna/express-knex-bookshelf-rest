const Company = require('../models/CompanyModel')

async function get(req, res) {
    try {
        const companies = await Company.fetchAll({ withRelated: ['projects'] })
        if (companies) {
            return res.status(200).json(companies)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Get companies error' })
    }
}

async function store(req, res) {
    try {
        const { name } = req.body
        const company = await new Company({
            name: name
        }).save()
        return res.status(200).json(company)
    } catch (error) {
        return res.status(500).json({ error: 'Insert new company error' })
    }
}

async function show(req, res) {
    try {
        const id = req.params.id
        const company = await new Company({ id: id }).fetch({
            withRelated: ['projects']
        })
        if (company) {
            return res.status(200).json(company)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Getting company error', error })
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
        return res.status(200).json(companies)

    } catch (error) {
        return res.status(500).json({ error: 'Update company error' })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new Company({ id: id }).destroy()
        return res.status(200).json({ message: 'Company destroyed' })
    } catch (error) {
        return res.status(500).json({ message: 'Destroy company error' })
    }
}

module.exports = {
    get,
    store,
    show,
    update,
    destroy
}