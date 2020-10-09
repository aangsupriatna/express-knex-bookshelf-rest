const Page = require('../models/PageModel')

async function get(req, res) {
    await Page.fetchAll({
        withRelated: ['book']
    }).then((pages) => {
        return res.ok(pages, {
            message: 'Fetch pages success'
        })
    }).catch((error) => {
        return res.error(500, {
            message: 'Fetch pages error'
        })
    })
}

async function store(req, res) {
    const { book_id, name } = req.body

    await new Page({
        book_id: book_id,
        name: name
    }).save().then((page) => {
        return res.ok(page, {
            message: 'Add new page success'
        })
    }).catch((error) => {
        return res.error(500, {
            message: 'Add new page error'
        })
    })
}

async function show(req, res) {
    const id = req.params.id

    await Page.where({ id: id })
        .fetch({
            withRelated: ['book']
        }).then((page) => {
            return res.ok(page, {
                message: 'Fetch page success'
            })
        }).catch((error) => {
            return res.error(500, {
                message: 'Fetch page error'
            })
        })
}

async function update(req, res) {
    const id = req.params.id
    const { book_id, name } = req.body


    await new Page({ id: id }).fetch()
        .then(page => {
            page.set({
                name: name,
                book_id: book_id
            })
            page.save()
            return res.ok(page, {
                message: 'Update page success'
            })
        }).catch((error) => {
            return res.error(500, {
                message: 'Update page error'
            })
        })
}

async function destroy(req, res) {
    const id = req.params.id

    await new Page({ id: id }).destroy()
        .then((page) => {
            return res.ok(id, {
                message: 'Destroy page success'
            })
        }).catch((error) => {
            return res.error(500, {
                message: 'Destroy page error'
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