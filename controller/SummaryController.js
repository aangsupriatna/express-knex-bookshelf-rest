const Summary = require('../models/SummaryModel')

async function get(req, res) {
    try {
        const summaries = await Summary.fetchAll({ withRelated: ['book'] })
        return res.ok(summaries, { message: 'Fetch summaries success' })
    } catch (error) {
        return res.error(500, { message: 'Fetch summaries error' })
    }
}

async function store(req, res) {
    return res.ok('summaries', { message: 'STORE' })
}

async function show(req, res) {
    return res.ok('summaries', { message: 'SHOW' })
}

async function update(req, res) {
    return res.ok('summaries', { message: 'UPDATE' })
}

async function destroy(req, res) {
    return res.ok('summaries', { message: 'DESTROY' })
}
module.exports = {
    get,
    store,
    show,
    update,
    destroy
}