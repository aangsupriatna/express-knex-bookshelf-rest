const Book = require('../models/BookModel')

async function get(req, res) {
    await Book.fetchAll({
        withRelated: [
            'user',
            'pages',
            'summary'
        ]
    }).then((books) => {
        return res.ok(books, {
            message: 'Fetch books success'
        })
    }).catch((error) => {
        return res.error(500, {
            message: 'Fetch books error', error
        })
    })
}

async function store(req, res) {
    const { user_id, name } = req.body

    await new Book({ name })
        .save()
        .then((book) => {
            book.user()
                .attach(user_id)
            return res.ok(book, {
                message: 'Insert new book success'
            })
        }).catch((error) => {
            return res.error(500, {
                message: 'Add new book error', error
            })
        })
}

async function show(req, res) {
    const id = req.params.id

    await Book.where({ id: id }).fetch({
        withRelated: [
            'user',
            'pages',
            'summary'
        ]
    }).then((book) => {
        return res.ok(book, {
            message: 'Fetch book success'
        })
    }).catch((error) => {
        return res.error(500, {
            message: 'Fetch book error', error
        })
    })
}

async function update(req, res) {
    const id = req.params.id

    const { user_id, name } = req.body
    const book = await new Book({ id: id })
        .fetch()
        .then((book) => {
            book.set({
                name: name
            })
            book.user()
                .attach(user_id)
            book.save()
            return res.ok(book, {
                message: 'Update book success'
            })
        }).catch((error) => {
            return res.error(500, {
                message: 'Update book error', error
            })
        })
}

async function destroy(req, res) {
    const id = req.params.id
    await new Book({ id: id })
        .destroy()
        .then((book) => {
            return res.ok(id, {
                message: 'Book destroyed'
            })
        }).catch((error) => {
            return res.error(400, {
                message: error.message
            })
        })
}
module.exports = {
    get,
    store,
    show,
    update,
    destroy
}