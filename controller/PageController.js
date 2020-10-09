const Page = require('../models/PageModel')

async function get(req, res) {
    try {
        const pages = await Page.fetchAll({
            withRelated: ['book']
        })
        return res.ok(pages, {
            message: 'Fetch pages success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Fetch pages error'
        })
    }
}

async function store(req, res) {
    try {
        const { book_id, name } = req.body

        const page = await new Page({
            book_id: book_id,
            name: name
        }).save()
        return res.ok(page, {
            message: 'Add new page success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Add new page error', error
        })
    }
}

async function show(req, res) {
    try {
        const id = req.params.id

        const page = await Page.where({ id: id }).fetch({
            withRelated: ['book']
        })
        return res.ok(page, {
            message: 'Fetch page success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Fetch page error', error
        })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { book_id, name } = req.body

        // const page = await Page.where({ id: id }).save({
        //     book_id: book_id,
        //     name: name
        // }, { method: 'update', patch: true }).then(page=>{

        // })
        const page = await Page.where({ id: id }).fetch()
            .then(page => {
                page.set({ name: name })
                return page.save({ book_id: book_id }, { method: 'update', patch: true })
            })
        return res.ok(page, {
            message: 'Update page success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Update page error', error
        })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new Page({ id: id }).destroy()
        return res.ok(id, {
            message: 'Destroy page success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Destroy page error', error
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