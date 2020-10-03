const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

module.exports = {
    // display all users
    get: async (req, res) => {
        await User.fetchAll()
            .then(user => {
                return res.status(200).json(user)
            }).catch(error => {
                return res.status(500).json({ error: 'Fetch users error' })
            })
    },
    // store new user
    store: async (req, res) => {
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
                return res.status(400).json({ error: 'Added user error' })
            }
        }
    },
    // display one user
    show: async (req, res) => {
        const id = req.params.id

        await new User({ id: id }).fetch({ withRelated: ['profile'] })
            .then(user => {
                return res.status(200).json(user)
            }).catch(error => {
                return res.status(400).json({ error: 'Getting user error' })
            })
    },
    // update user
    update: async (req, res) => {
        try {
            const { username, email, password, password2, role } = req.body
            const id = req.params.id

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
    },
    // delete user
    destroy: async (req, res) => {
        try {
            const id = req.params.id
            await new User({ id: id }).destroy()
            return res.status(200).json({ message: 'User destroyed' })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}