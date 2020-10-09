const Book = require('../models/BookModel')
const Company = require('../models/CompanyModel')

async function get(req, res) {
    try {
        const books = await Book.fetchAll({
            withRelated: ['user', 'pages', 'summary']
        })
        return res.ok(books, {
            message: 'Fetch books success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Fetch books error', error
        })
    }
}

async function store(req, res) {
    try {
        const { user_id, name } = req.body

        const book = await new Book({ name: name }).save()
        book.user().attach(user_id)
        return res.ok(book, {
            message: 'Add new book success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Add new book error', error
        })
    }
}

async function show(req, res) {
    try {
        const id = req.params.id

        const book = await Book.where({ id: id }).fetch({
            withRelated: ['user', 'pages', 'summary']
        })
        return res.ok(book, {
            message: 'Fetch book success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Fetch book error', error
        })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { user_id, name } = req.body
        const book = await Book.where({ id: id }).fetch()
        book.attach(user_id)
        return res.ok(book, {
            message: 'Update book success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Update book error', error
        })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new Book({ id: id }).destroy()
        return res.ok(id, {
            message: 'Destroy book success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Destroy book error', error
        })
    }
}
module.exports = {
    get,
    store,
    show,
    update,
    destroy
}