const Page = require('../models/PageModel')

async function get(req, res) {
    try {
        const pages = await Page.fetchAll({ withRelated: ['book'] })
        return res.ok(pages, { message: 'Fetch pages success' })
    } catch (error) {
        return res.error(500, { message: 'Fetch pages error' })
    }
}

async function store(req, res) {
    return res.ok('pages', { message: 'STORE' })
}

async function show(req, res) {
    return res.ok('pages', { message: 'SHOW' })
}

async function update(req, res) {
    return res.ok('pages', { message: 'UPDATE' })
}

async function destroy(req, res) {
    return res.ok('pages', { message: 'DESTROY' })
}
module.exports = {
    get,
    store,
    show,
    update,
    destroy
}