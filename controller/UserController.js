const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

async function get(req, res) {
    try {
        const user = await User.fetchAll({ debug: true, withRelated: ['profile'] })
        if (user) {
            return res.ok(user, { message: 'Fetch all users success' })
        }
    } catch (error) {
        return res.error(500, { message: 'Fetch all users error' })
    }
}

async function store(req, res) {
    try {
        const { username, email, password, password2 } = req.body

        if (password != password2) {
            return res.error(401, { message: 'Password not match' })
        }
        const user = await new User({
            username: username,
            email: email,
            password: password,
            role: 'member'
        }).save()
        return res.ok(user, { message: 'Add user success' })
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            return res.error(401, { message: 'User already exists' })
        } else {
            return res.error(401, { message: 'Add user error' })
        }
    }
}

async function show(req, res) {
    try {
        const id = req.params.id
        const user = await new User({ id: id }).fetch({
            withRelated: ['profile']
        })
        if (user) {
            return res.ok(user, { message: 'Fetch user success' })
        }
    } catch (error) {
        return res.error(400, { message: 'Fetch user error' })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { username, email, password, password2, role } = req.body

        if (password && password != password2) {
            return res.error(400, { message: 'Password not match' })
        }
        const user = await User.where({ id: id }).fetch().then(user => {
            user.set({
                username: username,
                email: email,
                password: password,
                role: role
            })
            return user.save()
        })
        return res.ok(user, { message: 'Update user success' })
    } catch (error) {
        return res.error(400, { message: 'Update user error' })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new User({ id: id }).destroy()
        return res.ok(id, { message: 'User destroyed' })
    } catch (error) {
        return res.error(400, { message: error.message })
    }
}

module.exports = {
    get,
    store,
    show,
    update,
    destroy
}