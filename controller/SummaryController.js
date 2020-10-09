const Summary = require('../models/SummaryModel')

async function get(req, res) {
    try {
        const summaries = await Summary.fetchAll({
            withRelated: ['book']
        })
        return res.ok(summaries, {
            message: 'Fetch summaries success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Fetch summaries error'
        })
    }
}

async function store(req, res) {
    try {
        const { book_id, name } = req.body

        const summary = await new Summary({
            book_id: book_id,
            name: name
        }).save()
        return res.ok(summary, {
            message: 'Add new summary success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Add new summary error', error
        })
    }
}

async function show(req, res) {
    try {
        const id = req.params.id

        const summary = await Summary.where({ id: id }).fetch({
            withRelated: ['book']
        })
        return res.ok(summary, {
            message: 'Fetch summary success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Fetch summary error', error
        })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { book_id, name } = req.body

        const page = await Summary.where({ id: id }).fetch()
            .then(page => {
                page.set({ name: name })
                return page.save({ book_id: book_id }, { method: update, patch: true })
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
        await new Summary({ id: id }).destroy()
        return res.ok(id, {
            message: 'Destroy summary success'
        })
    } catch (error) {
        return res.error(500, {
            message: 'Destroy summary error', error
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