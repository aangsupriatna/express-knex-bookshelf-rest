const Book = require('../models/BookModel')

async function get(req, res) {
    try {
        const books = await Book.fetchAll({ withRelated: ['user', 'pages', 'summary'] })
        return res.ok(books, { message: 'Fetch books success' })
    } catch (error) {
        return res.error(500, { message: 'Fetch books error', error })
    }
}

async function store(req, res) {
    return res.ok('books', { message: 'GET' })
}

async function show(req, res) {
    return res.ok('books', { message: 'GET' })
}

async function update(req, res) {
    return res.ok('books', { message: 'GET' })
}

async function destroy(req, res) {
    return res.ok('books', { message: 'GET' })
}
module.exports = {
    get,
    store,
    show,
    update,
    destroy
}