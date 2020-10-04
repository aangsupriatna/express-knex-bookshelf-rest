const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

async function get(req, res) {
    try {
        const user = await User.fetchAll({ withRelated: ['profile'] })
        if (user) {
            return res.status(200).json(user)
        }
    } catch (error) {
        return res.status(500).json({ error: 'Fetch users error' })
    }
}

async function store(req, res) {
    try {
        const { username, email, password, password2 } = req.body

        if (password != password2) {
            return res.status(401).json({ error: 'Password not match' })
        }
        const user = await new User({
            username: username,
            email: email,
            password: password,
            role: 'member'
        }).save()
        return res.status(200).json(user)
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'User already exists' })
        } else {
            return res.status(400).json({ error: 'Insert new user error' })
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
            return res.status(200).json(user)
        }
    } catch (error) {
        return res.status(400).json({ error: 'Getting user error' })
    }
}

async function update(req, res) {
    try {
        const id = req.params.id
        const { username, email, password, password2, role } = req.body

        if (password && password != password2) {
            return res.status(400).json({ error: 'Password not match' })
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
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: 'Update user error' })
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id
        await new User({ id: id }).destroy()
        return res.status(200).json({ message: 'User destroyed' })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    get,
    store,
    show,
    update,
    destroy
}