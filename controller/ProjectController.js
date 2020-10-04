const Project = require('../models/ProjectModel')

async function get(req, res) {
    try {
        const projects = await Project.fetchAll({
            withRelated: ['company']
        })
        if (projects) {
            return res.status(200).json(projects)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Get projects error', error })
    }
}

async function store(req, res) {
    try {
        const { company_id, name } = req.body
        const project = await new Project({
            company_id: company_id,
            name: name
        }).save()
        return res.status(200).json(project)
    } catch (error) {
        return res.status(500).json({ error: 'Insert new project error' })
    }
}

async function show(req, res) {
    try {
        const id = req.params.id
        const project = await new Project({ id: id }).fetch({
            debug: true,
            withRelated: ['company']
        })
        if (project) {
            return res.status(200).json(project)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Getting project error', error })
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
        return res.status(200).json(projects)

    } catch (error) {
        return res.status(500).json({ error: 'Update project error' })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new Project({ id: id }).destroy()
        return res.status(200).json({ message: 'project destroyed' })
    } catch (error) {
        return res.status(500).json({ message: 'Destroy project error' })
    }
}

module.exports = {
    get,
    store,
    show,
    update,
    destroy
}