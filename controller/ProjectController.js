const Project = require('../models/ProjectModel')

async function get(req, res) {
    try {
        const projects = await Project.fetchAll({ withRelated: ['company'] })
        if (projects) {
            return res.ok(projects, { message: 'Fetch all projects success' })
        }
    } catch (error) {
        return res.error(500, { message: 'Fetch all projects error' })
    }
}

async function store(req, res) {
    try {
        const { company_id, name } = req.body
        const project = await new Project({
            company_id: company_id,
            name: name
        }).save()
        return res.ok(project, { message: 'Add project success' })
    } catch (error) {
        return res.error(500, { message: 'Add project error' })
    }
}

async function show(req, res) {
    try {
        const id = req.params.id
        const project = await new Project({ id: id }).fetch()
        if (project) {
            return res.ok(project, { message: 'Fetch project success' })
        }
    } catch (error) {
        return res.error(500, { message: 'Fetch project error' })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { name } = req.body

        const projects = await Project.where({ id: id }).fetch().then(project => {
            project.set({ name: name })
            return project.save()
        })
        return res.ok(projects, { message: 'Update project success' })

    } catch (error) {
        return res.error(500, { message: 'Update project error' })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new Project({ id: id }).destroy()
        return res.ok(id, { message: 'Project destroyed success' })
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